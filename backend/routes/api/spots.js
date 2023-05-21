const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Op } = require('sequelize');
const { Spot, Review, SpotImage, User, Booking, sequelize, ReviewImage } = require('../../db/models')

// Get all Spots owned by the Current User 
router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  const allSpots = await Spot.findAll({
  where : {ownerId : user.id},
  include: [
      { model: Review },
      { model: SpotImage }
  ]
  });

  let Spots = [];
        let sum = 0;

  allSpots.forEach(spot =>{
      Spots.push(spot.toJSON());
  });

  Spots.forEach(spot => {
      spot.Reviews.forEach(e =>{
          sum += e.stars;
      });
      spot.avgRating = sum / spot.Reviews.length;
      delete spot.Reviews;
  });



  Spots.forEach(spot =>{
      spot.SpotImages.forEach(e =>{
          if(e.preview === true){
              spot.previewImage = e.url;
          }
      });
      if(!spot.previewImage){
          spot.previewImage = 'No preview image found';
      }
      delete spot.SpotImages;
      spot.price = parseFloat(spot.price);
      spot.lng = parseFloat(spot.lng);
      spot.lat = parseFloat(spot.lat);
  });

  return res.status(200).json({Spots});
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spotId = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                // as: 'previewImage', // Specify the alias for the association
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Review
            }
        ]
    })
    if (!spotId) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }

    const spotJson = spotId.toJSON()
    const total = await Review.count({
        where: { spotId: req.params.spotId }
    })
    
    const stars = await Review.sum('stars', {
        where: {
            spotId: req.params.spotId
        }
    })

    spotJson.numReviews = total
    spotJson.avgStarRating = stars / total
    delete spotJson.Reviews
    
    return res.status(200).json(spotJson)
})

// CREATE A SPOT 
router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const comment = { message: 'Bad Request', errors: {} };

    if(!address) {
        comment.errors.address = 'Street address is required'
    }
    if(!city) {
        comment.errors.city = 'City is required'
    }
    if(!state) {
        comment.errors.state = 'State is required'
    }
    if(!country) {
        comment.errors.country = 'Country is required'
    }
    if(!lat || typeof lat !== 'number') {
        comment.errors.lat = 'LAT is required'
    }
    if(!lng || typeof lng !== 'number') {
        comment.errors.lng = 'LNG is required'
    }
    if(!name || name.length > 50) {
        comment.errors.name = 'Name is required'
    }
    if(!description) {
        comment.errors.description = 'Description is required'
    }
    if(!price) {
        comment.errors.price = 'Price is required'
    }

    if (Object.keys(comment.errors).length) {
        return res.status(400).json({ message: comment.message, errors: comment.errors})
    }
    const newSpot = await Spot.create({ 
        ownerId: req.user.id,
        address,
        city, 
        state, 
        country, 
        lat, 
        lng, 
        name, 
        description, 
        price
    })

    return res.status(201).json(newSpot)
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;
    const { user } = req;
    const spotId = await Spot.findByPk(req.params.spotId); 

    if(!spotId || spotId.ownerId !== user.id) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    };

    const newImage = await SpotImage.create({
        spotId: spotId.id, url, preview
    });

    const obj = newImage.toJSON();
    delete obj.spotId;
    delete obj.createdAt;
    delete obj.updatedAt;
    return res.status(200).json(obj);
})

// EDIT A SPOT 
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spotId = await Spot.findByPk(req.params.spotId)

    const { user } = req

    if (spotId) {
        if (spotId.ownerId !== user.id) {
            return res.status(403).json({ message: 'Only the owner can edit this spot'})
        }

        const comment = {
            message: 'Bad Request',
            errors: {}
        }

        if(!address) {
            comment.errors.address = 'Address is required'
        }
        if(!city) {
            comment.errors.city = 'City is required'
        }
        if(!state) {
            comment.errors.state = 'State is required'
        }
        if(!country) {
            comment.errors.country = 'Country is required'
        }
        if(!lat || typeof lat !== 'number') {
            comment.errors.lat = 'LAT is required'
        }
        if(!lng || typeof lng !== 'number') {
            comment.errors.lng = 'LNG is required'
        }
        if(!name) {
            comment.errors.name = 'Name is required'
        }
        if(!description) {
            comment.errors.description = 'Description is required'
        }
        if(!price) {
            comment.errors.price = 'Price is required'
        }
        if (Object.keys(comment.errors).length) {
            return res.status(400).json({ message: comment.message, errors: comment.errors})
        }
    } else {
        res.status(404).json({ message: 'Invalid Spot'});

    }

    await spotId.update({ 
        ownerId: req.user.id,
        address,
        city, 
        state, 
        country, 
        lat, 
        lng, 
        name, 
        description, 
        price
    })

    await spotId.save();

    return res.status(200).json(spotId)
    // return res.send('hi')
})

// DELETE A SPOT 
router.delete('/:spotId', requireAuth, async (req, res, next) => { 
    const { user } = req;

    const spotId = await Spot.findByPk(req.params.spotId)

    if (!spotId || spotId.ownerId !== user.id) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }

    spotId.destroy()

    return res.json({ message: "Successfully deleted" })
})

// Get All Reviews by a Spot's ID
router.get('/:spotId/reviews', async (req, res, next) => {
    const spotId = await Spot.findByPk(req.params.spotId)
    const reviews = await Review.findAll({ 
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    if(!spotId) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    return res.json({ Reviews: reviews});
})

// Create a Review for a Spot based on the Spot's id 
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const { user } = req
    const spotId = await Spot.findByPk(req.params.spotId);
    const comment = { message: 'Bad Request', errors: {} }

    if (!review) { comment.errors = 'Review text is required' };
    if (!stars || parseInt(stars) < 1 || parseInt(stars) > 5 ) {
        comment.errors = "Stars must be an integer from 1 to 5"
    }

    if (Object.keys(comment.errors).length ) {
        return res.status(400).json({ message: comment.message, errors: comment.errors})
    }

    if (!spotId) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }

    const existedReview = await Review.findOne({ 
        where: { 
            userId: user.id,
            spotId: req.params.spotId
        }
    })

    if(existedReview) {
        return res.status(500).json({ message: "User already has a review for this spot" })
    }

    const createdReview = await Review.create({
        userId: user.id,
        spotId: spotId.id,
        review: review, 
        stars: stars
    })

    return res.status(201).json(createdReview);
})

// Get all Bookings for a Spot based on the Spot's id

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const { user } = req
  const spotId = await Spot.findByPk(req.params.spotId)

  if (!spotId) {
      return res.status(404).json({ message: "Spot couldn't be found" })
  }

  if (user.id !== spotId.ownerId) {
      const bookings = await Booking.findAll({
          where: {
              spotId: req.params.spotId
          },
          attributes: ['spotId', 'startDate', 'endDate']
      })
      return res.status(200).json({ Bookings: bookings })
  } else {
      const bookings = await Booking.findAll({
          where: {
              spotId: req.params.spotId
          },
          include: [{
              model: User,
              attributes: ['id', 'firstName', 'lastName']
          }]
      })
      return res.status(200).json({ Bookings: bookings })
  }
})


// IN PROGRESS ******************************
// Create a Booking from a Spot based on the Spot's id
// IN PROGRESS ******************************
// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req;
    const { startDate, endDate } = req.body;
    const spotId = req.params.spotId;
    const startDay = new Date(startDate);
    const lastDay = new Date(endDate);

    // Find the spot
    const spot = await Spot.findByPk(spotId);

    // Error response: Couldn't find a Spot with the specified id
    if (!spot || spot.ownerId === user.id) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Check if the spot is already booked for the specified dates
    const existingBooking = await Booking.findOne({
        where: {
            spotId: spotId,
            [Op.or]: [
                {
                    startDate: {
                        [Op.between]: [startDay, lastDay]
                    }
                },
                {
                    endDate: {
                        [Op.between]: [startDay, lastDay]
                    }
                }
            ]
        }
    });

    // Error response: Booking conflict
    if (existingBooking) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        });
    }

    // Error response: Body validation errors
    if (startDay >= lastDay) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        });
    }

    // Create a new booking
    const booking = await Booking.create({
        spotId: spotId,
        userId: user.id,
        startDate: startDay,
        endDate: lastDay
    });

    // Successful Response
    return res.status(200).json(booking);
});

// GET ALL SPOTS
router.get('/', async (req, res) => {
    const errors = {};
    let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  
    page = parseInt(page);
    size = parseInt(size);
  
    if (isNaN(page) || page < 1 || page > 10) {
      errors.page = 'Page must be between 1 and 10';
    }
  
    if (isNaN(size) || size < 1 || size > 20) {
      errors.size = 'Size must be between 1 and 20';
    }
  
    if (maxLat !== undefined && isNaN(maxLat)) {
      errors.maxLat = 'Maximum latitude is invalid';
    }
  
    if (minLat !== undefined && isNaN(minLat)) {
      errors.minLat = 'Minimum latitude is invalid';
    }
  
    if (minLng !== undefined && isNaN(minLng)) {
      errors.minLng = 'Minimum longitude is invalid';
    }
  
    if (maxLng !== undefined && isNaN(maxLng)) {
      errors.maxLng = 'Maximum longitude is invalid';
    }
  
    if (minPrice !== undefined && (isNaN(minPrice) || minPrice < 0)) {
      errors.minPrice = 'Minimum price must be greater than or equal to 0';
    }
  
    if (maxPrice !== undefined && (isNaN(maxPrice) || maxPrice < 0)) {
      errors.maxPrice = 'Maximum price must be greater than or equal to 0';
    }
  
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: errors
      });
    }
  
    const where = {};
  
    if (maxLat !== undefined) {
      where.lat = {
        [Op.lte]: parseFloat(maxLat)
      };
    }
  
    if (minLat !== undefined) {
      where.lat = {
        [Op.gte]: parseFloat(minLat)
      };
    }
  
    if (minLng !== undefined) {
      where.lng = {
        [Op.gte]: parseFloat(minLng)
      };
    }
  
    if (maxLng !== undefined) {
      where.lng = {
        [Op.lte]: parseFloat(maxLng)
      };
    }
  
    if (minPrice !== undefined) {
      where.price = {
        [Op.gte]: parseFloat(minPrice)
      };
    }
  
    if (maxPrice !== undefined) {
      where.price = {
        [Op.lte]: parseFloat(maxPrice)
      };
    }
  
    const pagination = {
      limit: size,
      offset: size * (page - 1)
    };
  
    try {
      const allSpots = await Spot.findAll({
        include: [
          { model: Review },
          { model: SpotImage, as: 'previewImage' }
        ],
        where: where,
        ...pagination
      });
  
      const spots = allSpots.map(spot => {
        const avgRating = spot.Reviews.reduce((sum, review) => sum + review.stars, 0) / spot.Reviews.length;
        const previewImage = spot.SpotImages.find(image => image.preview === true);
  
        return {
          id: spot.id,
          ownerId: spot.ownerId,
          address: spot.address,
          city: spot.city,
          state: spot.state,
          country: spot.country,
          lat: parseFloat(spot.lat),
          lng: parseFloat(spot.lng),
          name: spot.name,
          description: spot.description,
          price: parseFloat(spot.price),
          createdAt: spot.createdAt,
          updatedAt: spot.updatedAt,
          avgRating: isNaN(avgRating) ? 0 : avgRating,
          previewImage: previewImage ? previewImage.url : 'No preview image found'
        };
      });
  
      return res.status(200).json({
        Spots: spots,
        page: page,
        size: size
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }
  });
  

module.exports = router
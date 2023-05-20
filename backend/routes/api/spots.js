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
    allSpots.forEach(spot =>{
        Spots.push(spot.toJSON());
    });

    Spots.forEach(spot => {
        let sum = 0;
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
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req;
    const spotId = await Spot.findByPk(req.params.spotId);

    if (!spotId) { return res.status(404).json({ message: "Spot couldn't be found" })}
 
    if (spotId.ownerId !== user.id) { 
        const notOwner = await Booking.findAll({ 
            where: {
                spotId: req.params.spotId
            },
            attributes: [ 'spotId', 'startDate', 'endDate' ]
        })
        return res.status(200).json({ Bookings: notOwner})
    }
    else {
        const theOwner = await Booking.findAll ({
            where: {
                spotId: req.params.spotId
            }, 
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })
        return res.status(200).json({ Bookings: theOwner})
    }
})

// IN PROGRESS ******************************
// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req;
    const { id, startDate, endDate, createdAt, updatedAt } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    const startDay = new Date(startDate);
    const lastDay = new Date(endDate);
    const comment = { message: "Sorry, this spot is already booked for the specified dates", errors: {} };
   

    // Error response: Couldn't find a Spot with the specified id
    if (!spot     || spot.ownerId === user.id ) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const allBookings = await Booking.findAll({
        where: { spotId: spot.ownerId }
    });

    // Error response: Body validation errors
    if(startDay >= lastDay){
        return res.status(400).json(
            {
                 message: "Bad Request", // (or "Validation error" if generated by Sequelize),
                errors: {
                    endDate: "endDate cannot come before startDate"
                }
            }
        );
    }

    // Error response: Booking conflict
    allBookings.forEach( e => {
        if(e.startDate.getTime() <= startDay.getTime() && e.endDate.getTime() >= startDay.getTime()){
            comment.errors.startDate = "Start date conflicts with an existing booking";
        }
        if(e.endDate.getTime() >= lastDay.getTime() && e.startDate.getTime() <= lastDay.getTime()){
            comment.errors.endDate = "End date conflicts with an existing booking";
        }
    });

    if (Object.keys(comment.errors).length){
        return res.status(403).json({ message: comment.message, errors: comment.errors });
    } else {

        // Successful Response
        // schedule a new booking 
        const booking = await Booking.create({
         id: id,
         spotId: spot.id,
         userId: user.id,
         startDate: new Date(startDate),
         endDate: new Date(endDate),
         createdAt,
         updatedAt
        });

        // assign to coresponding properties 
        const scheduleDates = {
            id: booking.id,
            spotId: spot.id,
            userId: user.id,
            startDate: startDate,
            endDate: endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        };
        return res.status(200).json(scheduleDates);
    }
});

// GET ALL SPOTS
router.get('/', async (req, res) => {
    const errors = {};
    let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query

    if(Object.entries(errors).length){
        return res.status(400).json({ message: 'Bad Request', errors : errors
        });
    }

    page = parseInt(page) 
    size = parseInt(size)


    if (page < 1) {
        res.status(400)
        return res.json({
            message: 'Bad Request',
            errors: {
                page: 'Page must be greater than or equal to 1',
            }
        })
    }

    if (size < 1) {
        res.status(400)
        return res.json({
            message: 'Bad Request',
            errors: {
                size: 'Size must be greater than or equal to 1',
            }
        })
    }

    if (!page || page > 10) {
        page = 1
    }

    if (!size || size > 20) {
        size = 20
    }

    let pagination = {}

    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    const where = {}
    if (maxLat !== undefined) {
        if (Number(maxLat) % 1 === 0) {
            res.status(400)
            return res.json({
                message: 'Bad Request',
                errors: 'Maximum latitude is invalid'
            })
        } else {
            where.lat = {
                [Op.lte]: Number(maxLat)
            }
        }
    }

    if (minLat !== undefined) {
        if (Number(minLat) % 1 === 0) {
            res.status(400)
            return res.json({
                message: 'Bad Request',
                errors: 'Minimum latitude is invalid'
            })
        } else {
            where.lat = {
                [Op.gte]: Number(minLat)
            }
        }
    }

    if (minLng !== undefined) {
        if (Number(minLng) % 1 === 0) {
            res.status(400)
            return res.json({
                message: 'Bad Request',
                errors: 'Minimum latitude is invalid'
            })
        } else {
            where.lng = {
                [Op.gte]: Number(minLng)
            }
        }
    }

    if (maxLng !== undefined) {
        if (Number(maxLng) % 1 === 0) {
            res.status(400)
            return res.json({
                message: 'Bad Request',
                errors: 'Minimum latitude is invalid'
            })
        } else {
            where.lng = {
                [Op.lte]: Number(maxLng)
            }
        }
    }

    if (minPrice !== undefined) {
        if (Number(minPrice) < 0) {
            return res.json({
                message: 'Bad Request',
                errors: 'Minimum price must be greater than or equal to 0'
            })
        } else {
            where.price = {
                [Op.gte]: Number(minPrice)
            }
        }
    }

    if (maxPrice !== undefined) {
        if (Number(maxPrice) < 0) {
            return res.json({
                message: 'Bad Request',
                errors: 'Maximum price must be greater than or equal to 0'
            })
        } else {
            where.price = {
                [Op.lte]: Number(maxPrice)
            }
        }
    }

    const allSpots = await Spot.findAll({
        include: [
            {model: Review},
            {model: SpotImage, as: 'previewImage'}
        ],
        ...pagination
    });

    let Spots = [];
    allSpots.forEach(spot =>{
        Spots.push(spot.toJSON());
    });

    Spots.forEach(spot => {
        let sum = 0;
        spot.Reviews.forEach(e =>{
            sum += e.stars;
        });
        spot.avgRating = sum / spot.Reviews.length;
        delete spot.Reviews;
    });

    Spots.forEach(spot =>{
        if (spot.SpotImages) {
            spot.SpotImages.forEach(e =>{
                if(e.preview === true){
                    spot.previewImage = e.url;
                }
            
        });
        }
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


module.exports = router
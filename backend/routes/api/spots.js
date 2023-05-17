const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Op } = require('sequelize');
const { Spot, Review, SpotImage, User } = require('../../db/models')

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

// GET ALL SPOTS
router.get('/', async (req, res) => {
    const errors = {};
 
    if(Object.entries(errors).length){
        return res.status(400).json({ message: "Bad Request", errors : errors
        });
    }

    const allSpots = await Spot.findAll({
        include: [
            {model: Review},
            {model: SpotImage}
        ],
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


module.exports = router
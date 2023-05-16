const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Op } = require('sequelize');
const { Spot, Review, SpotImage } = require('../../db/models')

// Get all Spots owned by the Current User 

router.get('/current', requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [{
            model: SpotImage
        },
        {
            model: Review
        }]
    })


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
const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Op } = require('sequelize');
const { Spot, Review, SpotImage, User, Booking, sequelize, ReviewImage } = require('../../db/models');

//Check if we need an error message for spotImages **************************
// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const allBookings = await Booking.findAll({
        where: {
            userId: user.id
        }, 
        include : {
            model: Spot,
            attributs: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            include: [ 
                { 
                    model: SpotImage, 
                    where: {
                        preview: true 
                    }
                }
            ]
        }
    })

    const arra = [];
    allBookings.forEach( e => {
        arra.push(e.toJSON())
    })

    const newArra = [];
    arra.forEach( b => {
        b.Spot.SpotImages.forEach( bo => {
            b.Spot.previewImage = bo.url
        })
        delete b.Spot.SpotImages;
        newArra.push(b);
    })

    return res.status(200).json({ Bookings: newArra });
})


module.exports = router;
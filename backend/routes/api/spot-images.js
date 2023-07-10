const express = require('express')
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { Spot, Review, SpotImage, User, Booking, sequelize, ReviewImage } = require('../../db/models');

//DELETE AN IMAGE FOR A SPOT
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { user } = req
    const spotImageId = await SpotImage.findByPk(req.params.imageId, {
        include: {
            model: Spot
        }
    })

    if (!spotImageId) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
    }
    if (spotImageId.Spot.ownerId !== user.id) {
        return res.status(403).json({ message: "Authenticated user does not have the correct role(s) or permission(s)" });
    } 
    else {
        spotImageId.destroy()
        return res.status(200).json({ message: "Successfully deleted" });
    }
})

module.exports = router
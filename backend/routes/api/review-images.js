const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Op } = require('sequelize');
const { Spot, Review, SpotImage, User, Booking, sequelize, ReviewImage } = require('../../db/models');

// Delete a Review Image 
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { user } = req;
    const reviewImageId = await ReviewImage.findByPk(req.params.imageId, {
        include: {
            model: Review
        }
    })

    if (!reviewImageId || reviewImageId.Review.userId !== user.id) {
        return res.status(404).json({ message: "Review Image couldn't be found" })
    }
    else {
        reviewImageId.destroy()
        return res.status(200).json({ message: 'Successfully deleted' })
    }
})

module.exports = router;
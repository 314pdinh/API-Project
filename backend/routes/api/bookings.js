const express = require('express');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const { Op } = require('sequelize');
const { Spot, Review, SpotImage, User, Booking, sequelize, ReviewImage } = require('../../db/models');

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;

  const allBookings = await Booking.findAll({
      where: {
          userId: user.id
      }, 
      include : [{
          model: Spot,
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
          include: [ 
              { 
                model: SpotImage,
                where: { preview: true },
              }
          ]
      }]
  })


  const arra = []

  allBookings.forEach(ele => {
      arra.push(ele.toJSON())
  })

  const newArra = []
  arra.forEach(booking => {

      booking.Spot.SpotImages.forEach(ele => {
          booking.Spot.previewImage = ele.url
      })

      delete booking.Spot.SpotImages
      newArra.push(booking)
  })
  
  return res.status(200).json({ Bookings: newArra });
})

  
// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  const { user } = req;
  const { startDate, endDate } = req.body;
  const bookingId = req.params.bookingId;
  const startDay = new Date(startDate);
  const lastDay = new Date(endDate);

  // Find the booking
  const booking = await Booking.findByPk(bookingId);

  // Error response: Couldn't find a Booking with the specified id
  if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
  }

  // Require proper authorization: Booking must belong to the current user
  if (booking.userId !== user.id) {
      return res.status(403).json({ message: "Authenticated user does not have the correct role(s) or permission(s)" });
  }

  // Error response: Can't edit a booking that's past the end date
  const now = new Date();
  if (startDay.getTime() < now.getTime() || lastDay.getTime() < now.getTime()) {
      return res.status(403).json({ message: "Past bookings can't be modified" });
  }

  // Error response: Body validation errors
  if (lastDay < startDay) {
      return res.status(400).json({
          message: "Bad Request",
          errors: {
              endDate: "endDate cannot come before startDate"
          }
      });
  }

  // Check for booking conflicts
  const existingBooking = await Booking.findOne({
      where: {
          spotId: booking.spotId,
          id: { [Op.not]: bookingId },
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

  // Update the booking
  booking.startDate = startDay;
  booking.endDate = lastDay;
  await booking.save();

  // Successful Response
  return res.status(200).json(booking);
});

module.exports = router;

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req;
    const bookingId = await Booking.findByPk(req.params.bookingId, {
      include: {
        model: Spot,
      }
    });

    if (!bookingId) { 
        return res.status(404).json({ message: "Booking couldn't be found" })
    }

    if(bookingId.userId !== user.id && bookingId.Spot.ownerId !== user.id) { return res.status(403).json({ message: "Authenticated user does not have the correct role(s) or permission(s)" })};
    
    const today = new Date();
    if(bookingId.startDate <= today) {
        return res.status(403).json({ "message": "Bookings that have been started can't be deleted" })
    }
    
    await bookingId.destroy();
    return res.status(200).json({ message: 'Successfully deleted' })

})

module.exports = router;
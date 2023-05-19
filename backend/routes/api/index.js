// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');
const reviewsRouter = require('./reviews.js');
const spotsRouter = require('./spots.js');
const spotImagesRouter = require('./spot-images.js');
const reviewImagesRouter = require('./review-images.js');
const bookingsRouter = require('./bookings.js')
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });
  
// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'TheRock'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// GET /api/restore-user
// router.use(restoreUser);
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/spot-images', spotImagesRouter);
router.use('/review-images', reviewImagesRouter);
router.use('/bookings', bookingsRouter);
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
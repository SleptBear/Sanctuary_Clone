const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const spotImagesRouter = require('./spot-images.js');
const reviewImagesRouter = require('./review-images.js');
const bookingsRouter = require('./bookings.js');
const { restoreUser } = require('../../utils/auth.js');

// GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// const { requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);  //think these can both be removed because im done testing this router file further below in test routes.

// router.use(requireAuth);  //might add this in later but probably not based on line 17

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/spot-images', spotImagesRouter);

router.use('/review-images', reviewImagesRouter);

router.use('/bookings', bookingsRouter);


// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

  module.exports = router;

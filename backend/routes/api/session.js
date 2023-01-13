// backend/routes/api/session.js
const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    // .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    // .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      let user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.message = "Invalid Credentials"
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);
      const csrfToken = req.csrfToken();
      // console.log(user)
      user = user.dataValues
      delete user.createdAt;
      delete user.updatedAt;
      user.token = csrfToken
      return res.json({
        user
      });
    }
  );

  // Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Logout successful' });
  }
);

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    const csrfToken = req.csrfToken();
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({user: null});
  }
);

module.exports = router;

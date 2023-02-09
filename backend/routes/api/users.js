const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleDuplicateErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      // .isEmail()
      .withMessage('Invalid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Username is required  and must include 4 characters.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage('First Name is required and must include 2 letters'),
    check('lastName')
      .exists({ checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage('Last Name is required and must include 2 letters'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

const verifyDuplicate = [
  check('email').custom(value => {
    return User.findOne({where: { email: value }}).then(user => {
      if (user) {
        return Promise.reject('User with that email already exists');
      }
    });
  }),
  check('username').custom(value => {
    return User.findOne({where: { username: value }}).then(user => {
      if (user) {
        return Promise.reject('User with that username already exists');
      }
    });
  }),
  handleDuplicateErrors
]

// Sign up
router.post(
    '/',
    validateSignup,
    verifyDuplicate,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      // const { _csrf } = req.body;
      const user = await User.signup({ email, username, password, firstName, lastName });

      await setTokenCookie(res, user);
      const csrfToken = req.csrfToken();
      return res.json({
        user,
        'XSRF-Token': csrfToken
        // _csrf
      });
    }
  );

module.exports = router;

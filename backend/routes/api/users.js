const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { validationResult } = require('express-validator');

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];
// Sign up
router.post(
  '',
  validateSignup,
  async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const validationErrors = {};

        // Extract individual validation errors
        errors.array().forEach((error) => {
          validationErrors[error.param] = error.msg;
        });

        return res.status(400).json({
          message: 'Bad Request',
          errors: validationErrors,
        });
      }

      const existingUserEmail = await User.findOne({
        where: { email },
      });

      if (existingUserEmail) {
        return res.status(400).json({
          message: 'User already exists',
          errors: {
            email: 'User with that email already exists',
          },
        });
      }

      const existingUserUsername = await User.findOne({
        where: { username },
      });

      if (existingUserUsername) {
        return res.status(400).json({
          message: 'User already exists',
          errors: {
            username: 'User with that username already exists',
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        username,
        hashedPassword,
        firstName,
        lastName,
      });

      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser,
      });

  }
);
module.exports = router;
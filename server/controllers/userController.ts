import User from '../database/db.js';
import * as types from '../types';

const userController: Record<string, types.middlewareFunction> = {};

// Create a new user in database
userController.createUser = async (req, res, next) => {
  try {
    const { name, email, password, arn, externalId, region } = req.body;
    // DB create query
    const newUser = await User.create({
      name,
      email,
      password,
      arn,
      externalId,
      region,
    });
    console.log('userController.createUser user created yay');
    res.locals.confirmation = {
      userCreated: true,
      arn: newUser.arn,
      externalId: newUser.externalId,
    };
    next();
  } catch (err) {
    // Entry field missing or Non-unique email
    console.log(
      'userController.createUser ERROR: sign up failed, missing field or non-unique email'
    );
    return next(err);
  }
};

// Authenticate user from database
userController.verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // DB read query
    const user = await User.findOne({ email });
    console.log('userController.verifyUser finding user');
    // Verify password
    //is there something wrong with this logic, or is the front end handling async incorrectly?
    if (user !== null) {
      if (await user.validatePassword(password)) {
        // Correct password
        console.log('userController.verifyUser correct password YAY!!');
        res.locals.confirmation = {
          success: true,
          arn: user.arn,
          externalId: user.externalId,
          region: user.region,
        };
      } else {
        // Incorrect password
        console.log('userController.verifyUser ERROR: wrong password');
        res.locals.confirmation = {
          success: false,
        };
      }
      return next();
    } else {
      console.log('userController.verifyUser ERROR: email is not registered');
      res.locals.confirmation = {
        success: false,
      };
      return next();
    }
  } catch (err) {
    // Email not found
    console.log('userController.verifyUser ERROR: email is not registered');
    return next({ err });
  }
};

export default userController;

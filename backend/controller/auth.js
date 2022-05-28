import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("User", user);
    if (user) {
      const { id, email, username, profileImage } = user;
      const isMatch = await user.comparePassword(req.body.password);
      if (isMatch) {
        res.status(200).json({
          id,
          email,
          username,
          profileImage,
          token: jwt.sign({ id }, process.env.SECRET_KEY, {
            expiresIn: "2d",
          }),
        });
      } else {
        return next({
          status: 400,
          message: "Invaid username/password",
        });
      }
    } else {
      return next({
        status: 405,
        message: "User not found",
      });
    }
  } catch (err) {
    return next({
      status: 500,
      message: err.message,
    });
  }
};

export const signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const { id, username, profileImage } = user;
    res.status(200).json({
      id,
      username,
      profileImage,
      token: jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: "2d",
      }),
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username/email is already being taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

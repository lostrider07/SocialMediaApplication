import jwt from "jsonwebtoken";

//This will make sure the user is logged in (Authentication)
export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (decode) {
      return next();
    } else {
      return next({
        status: 401,
        message: "You will have to login first",
      });
    }
  } catch (err) {
    return next({
      status: 401,
      message: "You will have to login first",
    });
  }
};

//This will ensure if the logged in user is the correct one (Authorization)
export const correctUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded", decode);
    if (decode.id === req.params.id) {
      return next();
    } else {
      return next({
        status: 401,
        message: "Unauthorized User",
      });
    }
  } catch (err) {
    return next({
      status: 404,
      message: "Unauthorized User",
    });
  }
};

import createError from "http-errors";
import AuthMessage from "../../modules/auth/auth.message.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../../modules/user/user.model.js";
dotenv.config();

const Authorization = async (req, res, next) => {
  try {
    const accessToken = req?.cookies?.accessToken;
    if (!accessToken) throw new createError(401, AuthMessage.Unauthorized);
    const data = jsonwebtoken.verify(accessToken, process.env.JWT_SECRET_KEY);
    if (data?.id) {
      const user = await UserModel.findById(data.id);
      if (!user) throw new createError(404, AuthMessage.UserNotFound);
      if (!user.verify) throw new createError(401, AuthMessage.UserNotVerify);
      req.user = user;
      return next();
    }
    throw new createError(401, AuthMessage.InvalidToken);
  } catch (error) {
    next(error);
  }
};

export default Authorization;

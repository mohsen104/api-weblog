import createError from "http-errors";
import UserModel from "../user/user.model.js";
import { randomInt } from "crypto";
import AuthMessage from "./auth.message.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const AuthService = {
  sendOtp: async (auhtDto) => {
    const { mobile } = auhtDto;
    const now = new Date().getTime();
    const otp = {
      code: randomInt(10000, 99999),
      expiresIn: now + 60 * 1000,
    };
    const user = await UserModel.findOne({ mobile });
    if (!user) {
      return await UserModel.create({ otp, mobile });
    }
    if (user.otp && user.otp.expiresIn > now)
      throw new createError(400, AuthMessage.OtpNotExpired);
    user.otp = otp;
    await user.save();
    return user;
  },
  checkOtp: async (authDto) => {
    const { mobile, code } = authDto;
    const now = new Date().getTime();
    const user = await UserModel.findOne({ mobile });
    if (!user) throw new createError(404, AuthMessage.UserNotFound);
    if (user.otp.expiresIn < now)
      throw new createError(401, AuthMessage.OtpExpired);
    if (user.otp.code !== code)
      throw new createError(401, AuthMessage.OtpIncorrect);
    user.verify = true;
    await user.save();
    return generateToken(user);
  },
};

const generateToken = (user) => {
  return {
    accessToken: jwt.sign(
      { id: user._id, mobile: user.mobile },
      process.env.JWT_SECRET_KEY,
    ),
  };
};

export default AuthService;

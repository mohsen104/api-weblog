import AuthMessage from './auth.message.js';
import AuthService from './auth.service.js';
import { SendOtpValidation, CheckOtpValidation } from '../../common/validations/auth.validation.js';
import verifyMobile from '../../common/utils/verifyMobile.js';

const AuthController = {
  sendOtp: async (req, res, next) => {
    try {
      const { mobile } = req.body;
      const mobileVerified = await verifyMobile(res, mobile);
      await SendOtpValidation.validateAsync({ mobile: mobileVerified });
      await AuthService.sendOtp({ mobile: mobileVerified });
      return res.json({
        message: AuthMessage.SendOtp,
      });
    } catch (error) {
      next(error);
    }
  },
  checkOtp: async (req, res, next) => {
    try {
      const { mobile, code } = req.body;
      const mobileVerified = await verifyMobile(res, mobile);
      await CheckOtpValidation.validateAsync({ mobile: mobileVerified, code });
      const { accessToken } = await AuthService.checkOtp({ mobile: mobileVerified, code });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24, // 1d
      });
      return res.json({
        message: AuthMessage.CheckOtp,
      });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      res.clearCookie('accessToken');
      return res.json({
        message: AuthMessage.Logout,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;

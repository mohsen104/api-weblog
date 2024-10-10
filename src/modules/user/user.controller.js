import UserMessage from './user.message.js';
import UserService from './user.service.js';
import UserValidation from '../../common/validations/user.validation.js';

const UserController = {
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await UserService.getOne(id);
      return res.json({
        message: UserMessage.Success,
        user,
      });
    } catch (error) {
      next(error);
    }
  },
  changeProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fullName, bio } = req.body;
      const file = req?.file;
      await UserValidation.validateAsync({ fullName, bio });
      await UserService.changeProfile({ id, fullName, bio, file });
      return res.json({
        message: UserMessage.UserChangeProfile,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;

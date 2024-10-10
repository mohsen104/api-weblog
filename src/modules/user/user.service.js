import { isValidObjectId, Types } from "mongoose";
import UserMessage from "./user.message.js";
import UserModel from "./user.model.js";
import createError from "http-errors";
import removeImage from "../../common/utils/removeImage.js";
import createImage from "../../common/utils/createImage.js";

const UserService = {
  getOne: async (id) => {
    if (!isValidObjectId(id))
      throw new createError(404, UserMessage.UserNotFound);
    const user = await UserModel.aggregate([
      { $match: { _id: new Types.ObjectId(String(id)) } },
      {
        $lookup: {
          from: "posts",
          foreignField: "_id",
          localField: "posts",
          as: "posts",
        },
      },
      {
        $unwind: {
          path: "$posts",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          fullName: { $first: "$fullName" },
          bio: { $first: "$bio" },
          followers: { $first: "$followers" },
          followings: { $first: "$followings" },
          profile: { $first: "$profile" },
          posts: {
            $push: {
              title: "$posts.title",
              image: "$posts.image",
              description: "$posts.description",
              slugs: "$posts.slugs",
              rate: { $avg: "$posts.comments.rate" },
            },
          },
        },
      },
    ]);
    if (!user) throw new createError(404, UserMessage.UserNotFound);
    return user;
  },
  changeProfile: async (userDto) => {
    if (!isValidObjectId(userDto.id))
      throw new createError(404, UserMessage.UserNotFound);

    const user = await UserModel.findOne({ _id: userDto.id });
    if (!user) throw new createError(404, UserMessage.UserNotFound);

    if (userDto.profile) {
      const fileName = await createImage(userDto.profile, "user");
      await removeImage(user.profile);
      user.profile = `uploads/${fileName}`;
    }

    if (userDto.fullName) user.fullName = userDto.fullName;

    if (userDto.bio) user.bio = userDto.bio;

    return await user.save();
  },
};

export default UserService;

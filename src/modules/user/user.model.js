import mongoose, { Types } from "mongoose";

const OtpSchema = mongoose.Schema({
  code: {
    type: String,
    default: undefined,
  },
  expiresIn: {
    type: Number,
    default: 0,
  },
});

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    posts: {
      type: [Types.ObjectId],
      ref: "posts",
      default: [],
    },
    profile: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      required: true,
    },
    otp: {
      type: OtpSchema,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true},
);

const model = mongoose.model("user", UserSchema);

export default model;

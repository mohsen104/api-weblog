import mongoose, { Types } from 'mongoose';

const AnswerCommentSchema = mongoose.Schema(
  {
    author: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    for: {
      type: Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  { timestamps: true },
);

const CommentSchema = mongoose.Schema(
  {
    author: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    answers: {
      type: [AnswerCommentSchema],
      default: [],
    }
  },
  { timestamps: true },
);

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
      index: true,
    },
    slugs: {
      type: [String],
      default: [],
    },
    author: {
      type: Types.ObjectId,
      ref: 'users',
      required: true,
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const model = mongoose.model('post', PostSchema);

export default model;

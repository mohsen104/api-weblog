import { isValidObjectId, Types } from 'mongoose';
import PostMessage from './post.message.js';
import PostModel from './post.model.js';
import UserModel from '../user/user.model.js';
import createError from 'http-errors';
import createImage from '../../common/utils/createImage.js';

const PostService = {
  create: async (postDto) => {
    const { title, description, slugs, author, file } = postDto;
    const fileName = await createImage(file, "post");
    const post = await PostModel.create({ title, description, slugs, author, image: `uploads/${fileName}` });
    await UserModel.updateOne({ _id: author }, { $push: { posts: post._id } });
  },
  edit: async (postDto) => {
    let data = { ...postDto };
    delete data.id;
    delete data.image;
    delete data.slugs;
    if (postDto.image) {
      const fileName = await createImage(postDto.image, "post");
      data.image = `uploads/${fileName}`;
    }
    await PostModel.updateOne({ _id: postDto.id }, {
      $set: { ...data },
      $push: { slugs: { $each: postDto.slugs } }
    });
  },
  addComment: async (commentDto) => {
    if (!isValidObjectId(commentDto.id))
      throw new createError(404, PostMessage.PostNotFound);
    const post = await PostModel.findOne({ _id: commentDto.id });
    if (!post) throw new createError(404, PostMessage.PostNotFound);
    const commnet = {
      author: commentDto.author,
      description: commentDto.description,
      rate: commentDto.rate,
    };
    post.comments.push(commnet);
    return await post.save();
  },
  answerComment: async (commentDto) => {
    if (!isValidObjectId(commentDto.id))
      throw new createError(404, PostMessage.PostNotFound);
    const post = await PostModel.findOne({ 'comments._id': commentDto.id });
    if (!post) throw new createError(404, PostMessage.PostNotFound);
    const comment = post.comments.id(commentDto.id);
    if (!comment) throw new createError(404, PostMessage.CommentNotFound);
    const answer = {
      author: commentDto.author,
      description: commentDto.description,
      for: commentDto.id,
    };
    comment.answers.push(answer);
    return await post.save();
  },
  removeOne: async (id) => {
    if (!isValidObjectId(id)) throw new createError(404, PostMessage.PostNotFound);
    await PostModel.deleteOne({ _id: id });
  },
  getOne: async (id) => {
    if (!isValidObjectId(id))
      throw new createError(404, PostMessage.PostNotFound);
    const post = await PostModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(String(id)) },
      },
      {
        $lookup: {
          from: 'users',
          foreignField: '_id',
          localField: 'author',
          as: 'author',
        },
      },
      {
        $lookup: {
          from: 'users',
          foreignField: '_id',
          localField: 'author',
          as: 'commentAuthor',
        },
      },
      {
        $unwind: {
          path: '$comments',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$author',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$commentAuthor',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          description: { $first: '$description' },
          slugs: { $first: '$slugs' },
          createdAt: { $first: '$createdAt' },
          author: {
            $first: {
              fullName: '$author.fullName',
              profile: '$author.profile',
            },
          },
          rate: { $avg: '$comments.rate' },
          commnets: {
            $push: {
              description: '$comments.description',
              rate: '$comments.rate',
              createdAt: '$comments.createdAt',
              author: {
                fullName: '$commentAuthor.fullName',
                profile: '$commentAuthor.profile',
              },
            },
          },
        },
      },
    ]);
    return post;
  },
  getAll: async (postDto) => {
    const { page = 1, limit = 5, sort = "createdAt", search = "", from = "", to = "", slug = "" } = postDto;
    const sortField = sort[0] === "-" ? sort.slice(1) : sort;
    const sortOrder = sort[0] === "-" ? -1 : 1;
    const skip = (page - 1) * limit;
    let match = {
      $or: [
        { title: { $regex: search } },
        { desc: { $regex: search } },
      ],
    };
    if (slug) {
      match.slugs = { $in: [slug] };
    }
    if (from || to) {
      match.createdAt = {};
      if (from) match.createdAt.$gte = new Date(from);
      if (to) match.createdAt.$lte = new Date(to);
    }
    const posts = await PostModel.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: Number(limit) },
      { $sort: { [sortField]: sortOrder } },
      {
        $lookup: {
          from: 'users',
          foreignField: '_id',
          localField: 'author',
          as: 'author',
        },
      },
      {
        $unwind: {
          path: '$author',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$comments',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          description: { $first: '$description' },
          slugs: { $first: '$slugs' },
          author: {
            $first: {
              fullName: '$author.fullName',
              profile: '$author.profile',
            },
          },
          rate: { $avg: '$comments.rate' },
        },
      },
    ]);
    return { posts, result: posts.length, postsCount: await PostModel.countDocuments(match) };
  },
};

export default PostService;

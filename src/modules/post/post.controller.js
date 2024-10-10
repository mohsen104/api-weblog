import PostMessage from "./post.message.js";
import PostService from "./post.service.js";
import {
  PostValidation,
  PostEditValidation,
} from "../../common/validations/post.validation.js";
import {
  CommentValidation,
  CommentAnsValidation,
} from "../../common/validations/comment.validation.js";
import removePropertyEmpty from "../../common/utils/removePropertyEmpty.js";
import slugifyHandler from "../../common/utils/slugifyHandler.js";

const PostController = {
  create: async (req, res, next) => {
    try {
      const { title, description, slugs } = req.body;
      const { id } = req.user;
      const file = req?.file;
      const sluged = await slugifyHandler(slugs);
      await PostValidation.validateAsync({ title, description, slugs: sluged });
      await PostService.create({
        title,
        description,
        slugs: sluged,
        file,
        author: id,
      });
      return res.json({
        message: PostMessage.PostCreated,
      });
    } catch (error) {
      next(error);
    }
  },
  edit: async (req, res, next) => {
    try {
      const { title, description, slugs } = req.body;
      const { id } = req.params;
      const image = req?.file;
      const sluged = await slugifyHandler(slugs);
      const data = await removePropertyEmpty({
        title,
        description,
        slugs: sluged,
        image,
      });
      await PostEditValidation.validateAsync(data);
      await PostService.edit({
        id,
        image,
        ...data,
      });
      return res.json({
        message: PostMessage.PostEdited,
      });
    } catch (error) {
      next(error);
    }
  },
  addComment: async (req, res, next) => {
    try {
      const { description, rate } = req.body;
      const { id: author } = req.user;
      const { id } = req.params;
      await CommentValidation.validateAsync({ description, rate });
      await PostService.addComment({ id, description, rate, author });
      return res.json({
        message: PostMessage.CommnetAdded,
      });
    } catch (error) {
      next(error);
    }
  },
  answerComment: async (req, res, next) => {
    try {
      const { description } = req.body;
      const { id: author } = req.user;
      const { id } = req.params;
      await CommentAnsValidation.validateAsync({ description });
      await PostService.answerComment({ id, description, author });
      return res.json({
        message: PostMessage.CommnetAdded,
      });
    } catch (error) {
      next(error);
    }
  },
  removeOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await PostService.removeOne(id);
      return res.json({
        message: PostMessage.PostDeleted,
        post,
      });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await PostService.getOne(id);
      return res.json({
        message: PostMessage.Success,
        post,
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const { query } = req;
      const { posts, result, postsCount } = await PostService.getAll(query);
      return res.json({
        message: PostMessage.Success,
        result,
        postsCount,
        posts,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default PostController;

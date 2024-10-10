import { Router } from 'express';
import PostController from './post.controller.js';
import Authorization from '../../common/guards/Authorization.guard.js';
import uploadFile from '../../common/middlewares/multer.js';

const router = Router();

router.post(
  '/create',
  Authorization,
  uploadFile.single('image'),
  PostController.create,
);
router.put(
  '/edit/:id',
  Authorization,
  uploadFile.single('image'),
  PostController.edit,
);
router.post('/add-comment/:id', Authorization, PostController.addComment);
router.post('/answer-comment/:id', Authorization, PostController.answerComment);
router.get('/all', Authorization, PostController.getAll);
router.get('/:id', Authorization, PostController.getOne);
router.delete('/:id', Authorization, PostController.removeOne);

export default router;

import { Router } from 'express';
import { get, post } from '@/controllers/author.controller';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/models/author/author.validation';

const authorRouter: Router = Router();

authorRouter.post('/create', validationMiddleware(validate.create), post.create);
authorRouter.post('/', post.read);
authorRouter.post('/update', post.update);
authorRouter.post('/delete', post.delete);

authorRouter.get('/create', get.create);
authorRouter.get('/', get.read);
authorRouter.get('/:id', get.read);
authorRouter.get('/:id/update', get.update);
authorRouter.get('/:id/delete', get.delete);

export default authorRouter;
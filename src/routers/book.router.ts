import { Router } from 'express';
import { get, post } from '@/controllers/book.controller';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/models/book/book.validation';

const bookRouter: Router = Router();

bookRouter.post('/create', validationMiddleware(validate.book), post.create);
bookRouter.post('/'      , post.read);
bookRouter.post('/update', post.update);
bookRouter.post('/delete', post.delete);

bookRouter.get('/create'    , get.create);
bookRouter.get('/'          , get.read);
bookRouter.get('/:id'       , get.read);
bookRouter.get('/:id/update', get.update);
bookRouter.get('/:id/delete', get.delete);

export default bookRouter;
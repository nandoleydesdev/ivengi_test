import { Router } from 'express';
import IndexController from '@/controllers/index.controller';

const indexRouter = Router();

indexRouter.get('/', IndexController.index);

export default indexRouter;
import { Router, NextFunction } from 'express';
import { listsGetRouter } from './api-controllers/lists_get';
import { listsPostRouter } from './api-controllers/lists_post';
import { listsIdDeleteRouter } from './api-controllers/lists_id_delete';
import { itemsGetRouter } from './api-controllers/items_get';
import { itemsPostRouter } from './api-controllers/items_post';
import { itemsIdDeleteRouter } from './api-controllers/items_id_delete';

const apiRouter: Router = Router();

apiRouter.use('/', listsGetRouter);
apiRouter.use('/', listsPostRouter);
apiRouter.use('/', listsIdDeleteRouter);
apiRouter.use('/', itemsGetRouter);
apiRouter.use('/', itemsPostRouter);
apiRouter.use('/', itemsIdDeleteRouter);

export { apiRouter };

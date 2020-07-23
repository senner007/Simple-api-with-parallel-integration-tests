import { Router, NextFunction } from 'express';
import { listsPostRouter } from './lists_post';
import { listsIdDeleteRouter } from './lists_id_delete';
import { listsGetRouter } from './lists_get';
import { itemsGetRouter } from './items_get';
import { itemsPostRouter } from './items_post';
import { itemsIdDeleteRouter } from './items_id_delete';

const router: Router = Router();

router.use('/', listsGetRouter);
router.use('/', listsPostRouter);
router.use('/', listsIdDeleteRouter);
router.use('/', itemsGetRouter);
router.use('/', itemsPostRouter);
router.use('/', itemsIdDeleteRouter);

export default router;

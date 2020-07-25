import { Router, Request, NextFunction } from 'express';
import { Response } from 'express';
import { IListRequest } from '../../middlewares/middleware.interfaces';
import { deleteItemById } from '../../repositories/api-repository';
import {
  IItemPost,
  EResponseCodes,
  ERoles,
  IItemDelete,
} from '../api.router.interfaces';
import { MIDDLEWARE_AUTHENTICATE } from '../../middlewares/MIDDLEWARE_AUTHENTICATE';
import { MIDDLEWARE_AUTHORIZE } from '../../middlewares/MIDDLEWARE_AUTHORIZE';
import { MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER } from '../../middlewares/MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER';
import { MIDDLEWARE_VALIDATE_ITEM_ID_ROUTE_PARAMETER } from '../../middlewares/MIDDLEWARE_VALIDATE_ITEM_ID_ROUTE_PARAMETER';

const itemsIdDeleteRouter: Router = Router();

itemsIdDeleteRouter.delete(
  '/lists/:id/items/:item_id',
  [
    MIDDLEWARE_VALIDATE_ITEM_ID_ROUTE_PARAMETER,
    MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER,
    MIDDLEWARE_AUTHENTICATE,
    MIDDLEWARE_AUTHORIZE(ERoles.OWNER),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemsDeleted: number = await deleteItemById({
        fk_item_id: Number(req.params.item_id),
        fk_list_id: Number(req.params.id),
      });
      res.sendStatus(EResponseCodes.OK);
    } catch (error) {
      next(error);
    }
  },
);

export { itemsIdDeleteRouter };

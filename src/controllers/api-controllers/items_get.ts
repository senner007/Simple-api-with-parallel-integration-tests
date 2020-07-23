import { Router, NextFunction } from 'express';
import { Response } from 'express';
import { IListRequest } from '../../middlewares/middleware.interfaces';
import { getListItemsByListId } from '../../repositories/api-repository';
import { IItemPost, IItem } from './api_interfaces';
import { MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER } from '../../middlewares/MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER';

const itemsGetRouter: Router = Router();

itemsGetRouter.get(
  '/lists/:id/items',
  [MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER],
  async (
    req: IListRequest<IItemPost>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const items: IItem[] = await getListItemsByListId(Number(req.params.id));
      res.json(items);
    } catch (error) {
      next(error);
    }
  },
);

export { itemsGetRouter };

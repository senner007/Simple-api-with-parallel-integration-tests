import { Router, NextFunction } from 'express';
import { Response } from 'express';
import { IListRequest } from '../../middlewares/middleware.interfaces';
import { getItemsByListId } from '../../repositories/api-repository';
import { IItemPost, IItem } from '../api.router.interfaces';
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
      const items: IItem[] = await getItemsByListId(Number(req.params.id));
      res.json(items);
    } catch (error) {
      next(error);
    }
  },
);

export { itemsGetRouter };

import { Router, NextFunction } from 'express';
import { Response } from 'express';
import { MIDDLEWARE_AUTHENTICATE } from '../../middlewares/MIDDLEWARE_AUTHENTICATE';
import { IListRequest } from '../../middlewares/middleware.interfaces';
import { postItemById } from '../../repositories/api-repository';
import { EResponseCodes, IItemPost, ERoles } from '../api.router.interfaces';
import { MIDDLEWARE_AUTHORIZE } from '../../middlewares/MIDDLEWARE_AUTHORIZE';
import { BadRequest } from '../../httpError/httpError';
import { MIDDLEWARE_VALIDATE_ITEM_POST } from '../../middlewares/MIDDLEWARE_VALIDATE_ITEM_POST';
import { MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER } from '../../middlewares/MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER';

const itemsPostRouter: Router = Router();

itemsPostRouter.post(
  '/lists/:id/items',
  [
    MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER,
    MIDDLEWARE_VALIDATE_ITEM_POST,
    MIDDLEWARE_AUTHENTICATE,
    MIDDLEWARE_AUTHORIZE(ERoles.OWNER),
  ],
  async (
    req: IListRequest<IItemPost>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await postItemById(Number(req.params.id), Number(req.body.item_id));
      res.sendStatus(EResponseCodes.OK);
    } catch (error) {
      if (error.constraint) {
        return next(
          new BadRequest('Provided list or item reference is invalid'),
        );
      }
      next(error);
    }
  },
);

export { itemsPostRouter };

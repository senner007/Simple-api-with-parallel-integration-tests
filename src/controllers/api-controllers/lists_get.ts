import { Router, NextFunction } from 'express';
import { Response } from 'express';
import { IListRequest } from '../../middlewares/middleware.interfaces';
import { getListsByUserId } from '../../repositories/api-repository';
import { IListGet, IList } from './api_interfaces';
import { MIDDLEWARE_VALIDATE_LIST_GET } from '../../middlewares/MIDDLEWARE_VALIDATE_LIST_GET';

const listsGetRouter: Router = Router();

listsGetRouter.get(
  '/lists',
  [MIDDLEWARE_VALIDATE_LIST_GET],
  async (
    req: IListRequest<IListGet>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const lists: IList[] = await getListsByUserId(req.body.user_id);
      res.json(lists);
    } catch (error) {
      next(error);
    }
  },
);

export { listsGetRouter };

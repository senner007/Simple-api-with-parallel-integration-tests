import { Router, NextFunction } from 'express';
import { Response } from 'express';
import { MIDDLEWARE_AUTHENTICATE } from '../../middlewares/MIDDLEWARE_AUTHENTICATE';
import { IListRequest } from '../../middlewares/middleware.interfaces';
import {
  getUserByUserName,
  deleteListById,
} from '../../repositories/api-repository';
import { IUser, EResponseCodes, ERoles, ICredentials } from './api_interfaces';
import { MIDDLEWARE_AUTHORIZE } from '../../middlewares/MIDDLEWARE_AUTHORIZE';
import { BadRequest } from '../../httpError/httpError';
import { MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER } from '../../middlewares/MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER';

const listsIdDeleteRouter: Router = Router();

listsIdDeleteRouter.delete(
  '/lists/:id',
  [
    MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER,
    MIDDLEWARE_AUTHENTICATE,
    MIDDLEWARE_AUTHORIZE(ERoles.OWNER),
  ],
  async (
    req: IListRequest<ICredentials>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user: IUser = await getUserByUserName(req.body.user_name);
      const deletedListsLength: number = await deleteListById(
        user.id,
        Number(req.params.id),
      );
      if (deletedListsLength === 0) {
        throw new BadRequest(
          'List not deleted. Provided list id reference not valid',
        );
      }
      res.sendStatus(EResponseCodes.OK);
    } catch (error) {
      next(error);
    }
  },
);

export { listsIdDeleteRouter };

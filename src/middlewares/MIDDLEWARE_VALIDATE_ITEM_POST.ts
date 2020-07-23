import { Response, Request, RequestHandler, NextFunction } from 'express';
import { IListRequest } from './middleware.interfaces';
import { ApiValidator } from '../validators/api-validators';
import {
  IListPost,
  IItemPost,
} from '../controllers/api-controllers/api_interfaces';

async function MIDDLEWARE_VALIDATE_ITEM_POST(
  req: IListRequest<IItemPost>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    new ApiValidator(req.body.item_id)
      .isNotANumber('An positive integer is required for the item_id')
      .isAboveBigInt(`Value for item_id exceeds max value`);

    next();
  } catch (error) {
    next(error);
  }
}

export { MIDDLEWARE_VALIDATE_ITEM_POST };

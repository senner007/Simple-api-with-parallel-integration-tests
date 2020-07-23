import { Response, NextFunction } from 'express';
import { IListRequest } from './middleware.interfaces';
import { ApiValidator } from '../validators/api-validators';
import { IListGet } from '../controllers/api-controllers/api_interfaces';

async function MIDDLEWARE_VALIDATE_LIST_GET(
  req: IListRequest<IListGet>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    new ApiValidator(req.body.user_id)
      .isNotANumber('An positive integer is required for the user_id')
      .isAboveBigInt(`Value for user_id exceeds max value`);

    next();
  } catch (error) {
    next(error);
  }
}

export { MIDDLEWARE_VALIDATE_LIST_GET };

import { Response, Request, RequestHandler, NextFunction } from 'express';
import { IListRequest } from './middleware.interfaces';
import { ApiValidator } from '../validators/api-validators';
import { IListPost } from '../controllers/api.router.interfaces';

async function MIDDLEWARE_VALIDATE_LIST_POST(
  req: IListRequest<IListPost>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    new ApiValidator(req.body.list_name)
      .isValueAbsent('Please provide parameter: list_name: string')
      .isNotValidString('Characters in name not allowed')
      .isNotLongEnough(`Name should have a min. characters of`, 10)
      .isTooLong(`Name should have a max. characters of`, 50);

    next();
  } catch (error) {
    next(error);
  }
}

export { MIDDLEWARE_VALIDATE_LIST_POST };

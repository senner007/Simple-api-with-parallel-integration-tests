import { Response, Request, NextFunction } from 'express';
import { ApiValidator } from '../validators/api-validators';

async function MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    new ApiValidator(req.params.id)
      .isNotANumber(
        'An positive integer is required for the list route parameter id',
      )
      .isAboveBigInt(`Value for list route parameter id exceeds max value`);

    next();
  } catch (error) {
    next(error);
  }
}

export { MIDDLEWARE_VALIDATE_LIST_ID_ROUTE_PARAMETER };

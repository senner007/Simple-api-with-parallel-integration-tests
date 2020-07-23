import { Response, NextFunction } from 'express';
import { IListRequest } from './middleware.interfaces';
import { FireBase } from '../authentication/firebaseInit';
import { Unauthorized } from '../httpError/httpError';
import { ICredentials } from '../controllers/api-controllers/api_interfaces';

async function MIDDLEWARE_AUTHENTICATE(
  req: IListRequest<ICredentials>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const fireBase: FireBase = new FireBase();

    const token: string = await fireBase.getTokenFromCredentials(
      req.body.user_name,
      req.body.user_password,
    );

    await fireBase.verifyToken(token);

    return next();
  } catch (err) {
    next(
      new Unauthorized(
        'Failed to authenticate user. Please provide valid user_name and user_password',
      ),
    );
  }
}

export { MIDDLEWARE_AUTHENTICATE };

import { ICredentials } from '../../../src/controllers/api-controllers/api_interfaces';

const OWNER_CREDENTIALS_PARAMETERS_STUB: ICredentials = {
  user_name: process.env.OWNER_USER_NAME,
  user_password: process.env.OWNER_PASSWORD,
};

export { OWNER_CREDENTIALS_PARAMETERS_STUB };

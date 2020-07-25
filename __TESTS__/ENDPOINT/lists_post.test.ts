import request from 'supertest';
import { POST_LIST_BY_USER_ID_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/POST_LIST_BY_USER_ID_PARAMETERS_STUB';
import { FIREBASE_MOCK_SETUP } from '../__MOCKS__/FIREBASE_MOCK';
import { dbManager } from '../../knex-manager';
import { OWNER_CREDENTIALS_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/OWNER_CREDENTIALS_PARAMETERS_STUB';
import { EResponseCodes } from '../../src/controllers/api.router.interfaces';
import { TEST_REQUEST } from '../ENDPOINT_TEST_REQUESTS';
import { TEST_SEEDS } from '../TEST_SEEDS';

jest.mock('../../src/authentication/firebaseInit');

describe(`
    /lists - POST
    {
      "user_name": string,
      "user_password": string,
      "list_name": string
    }
  `, () => {
  beforeEach(async () => {
    await TEST_SEEDS();
    FIREBASE_MOCK_SETUP();
  });

  afterEach(async () => {
    await dbManager.truncateDb();
  });

  it(`
    should post list
    - by user id 1 
    - and return status 200
    `, async () => {
    const response: request.Response = await TEST_REQUEST.postListByUserId(
      POST_LIST_BY_USER_ID_PARAMETERS_STUB,
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.OK);
  });

  it(`
  should NOT post list
  - with invalid name
  - by user id 1 
  - and return status 400
  `, async () => {
    const response: request.Response = await TEST_REQUEST.postListByUserId(
      { list_name: 'foo' },
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.BADREQUEST);
  });
});

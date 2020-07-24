import request from 'supertest';
import { POST_LIST_BY_USER_ID_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/POST_LIST_BY_USER_ID_PARAMETERS_STUB';
import { testSeeds } from '../testSeeds';
import { FIREBASE_MOCK_SETUP } from '../__MOCKS__/FIREBASE_MOCK';
import { dbManager } from '../../knex-manager';
import { testRequest } from '../endPointTestRequests';
import { OWNER_CREDENTIALS_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/OWNER_CREDENTIALS_PARAMETERS_STUB';
import { EResponseCodes } from '../../src/controllers/api-controllers/api_interfaces';

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
    await testSeeds();
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
    const response: request.Response = await testRequest.postListByUserId(
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
    const response: request.Response = await testRequest.postListByUserId(
      { list_name: 'foo' },
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.BADREQUEST);
  });
});

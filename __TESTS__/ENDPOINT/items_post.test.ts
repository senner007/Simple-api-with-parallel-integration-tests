import request from 'supertest';
import { testSeeds } from '../testSeeds';
import { FIREBASE_MOCK } from '../__MOCKS__/FIREBASE_MOCK';
import { dbManager } from '../../knex-manager';
import { testRequest } from '../endPointTestRequests';
import { OWNER_CREDENTIALS_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/OWNER_CREDENTIALS_PARAMETERS_STUB';
import { EResponseCodes } from '../../src/controllers/api-controllers/api_interfaces';

jest.mock('../../src/authentication/firebaseInit');

describe(`
    /lists/:id/items - POST
    {
      "user_name": string,
      "user_password": string,
      "item_id": number
    }
  `, () => {
  beforeEach(async () => {
    await testSeeds();
    FIREBASE_MOCK();
  });

  afterEach(async () => {
    await dbManager.truncateDb();
  });

  it('should post list by user id 1 and return status 200', async () => {
    const response: request.Response = await testRequest.postItemByListId(
      1,
      1,
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.OK);
  });
});

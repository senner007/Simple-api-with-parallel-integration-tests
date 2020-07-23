import { testRequest } from '../endPointTestRequests';
import request from 'supertest';
import { testSeeds } from '../testSeeds';
import { FIREBASE_MOCK } from '../__MOCKS__/FIREBASE_MOCK';
import { dbManager } from '../../knex-manager';
import { OWNER_CREDENTIALS_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/OWNER_CREDENTIALS_PARAMETERS_STUB';
import { EResponseCodes } from '../../src/controllers/api-controllers/api_interfaces';

jest.mock('../../src/authentication/firebaseInit');

describe(`
    /lists/:id - DELETE
    {
      "user_name": string,
      "user_password": string
    }
  `, () => {
  beforeEach(async () => {
    await testSeeds();
    FIREBASE_MOCK();
  });

  afterEach(async () => {
    await dbManager.truncateDb();
  });

  it('should delete owned list by list id 1 and return status 200', async () => {
    const response: request.Response = await testRequest.deleteListById(
      1,
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.OK);
  });

  it('should not delete not owned list by id 3 and return status 400', async () => {
    const response: request.Response = await testRequest.deleteListById(
      3,
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.BADREQUEST);
  });
});

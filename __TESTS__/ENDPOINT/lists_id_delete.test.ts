import request from 'supertest';
import { dbManager } from '../../knex-manager';
import { OWNER_CREDENTIALS_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/OWNER_CREDENTIALS_PARAMETERS_STUB';
import { EResponseCodes } from '../../src/controllers/api.router.interfaces';
import { TEST_SEEDS } from '../TEST_SEEDS';
import { testRequests } from '../ENDPOINT_TEST_REQUESTS';

describe(`
    /lists/:id - DELETE
    {
      "user_name": string,
      "user_password": string
    }
  `, () => {
  beforeEach(async () => {
    await TEST_SEEDS(Number(process.env.JEST_WORKER_ID));
  });

  afterEach(async () => {
    await dbManager(Number(process.env.JEST_WORKER_ID)).truncateDb();
  });

  it(`should delete owned list 
  - by list id 1 
  - and return status 200
  `, async () => {
    const response: request.Response = await testRequests.deleteListById(
      1,
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.OK);
  });

  it(`should not delete 
  - NOT owned list 
  - by id 3 
  - and return status 400
  `, async () => {
    const response: request.Response = await testRequests.deleteListById(
      3,
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.BADREQUEST);
  });
});

import { GET_LISTS_BY_USER_ID_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/GET_LISTS_BY_USER_ID_PARAMETERS_STUB';
import request from 'supertest';
import { dbManager } from '../../knex-manager';
import { IList } from '../../src/controllers/api.router.interfaces';
import { TEST_SEEDS } from '../TEST_SEEDS';
import { testRequests, ITestResponse } from '../ENDPOINT_TEST_REQUESTS';

describe(`
    /lists - GET
    {
      "user_id": number
    }
  `, () => {
  beforeEach(async () => {
    await TEST_SEEDS(Number(process.env.JEST_WORKER_ID));
  });

  afterAll(async () => {
    await dbManager(Number(process.env.JEST_WORKER_ID)).truncateDb();
  });

  it(`should get lists 
  - by user id 1
  - and return status code 200
  `, async () => {
    const response: ITestResponse<
      IList[]
    > = await testRequests.getListsByUserId(
      GET_LISTS_BY_USER_ID_PARAMETERS_STUB,
    );

    const body: IList[] = response.body;

    expect(body[0].name).toEqual('my-list');
    expect(body.length).toEqual(2);
    expect(response.status).toEqual(200);
  });
});

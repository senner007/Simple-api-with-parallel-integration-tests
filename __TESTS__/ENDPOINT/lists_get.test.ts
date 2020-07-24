import { GET_LISTS_BY_USER_ID_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/GET_LISTS_BY_USER_ID_PARAMETERS_STUB';
import request from 'supertest';
import { testSeeds } from '../testSeeds';
import { dbManager } from '../../knex-manager';
import { testRequest } from '../endPointTestRequests';
import { IList } from '../../src/controllers/api-controllers/api_interfaces';

describe(`
    /lists - GET
    {
      "user_id": number
    }
  `, () => {
  beforeEach(async () => {
    await testSeeds();
  });

  afterEach(async () => {
    await dbManager.truncateDb();
  });

  it('should get lists by user id 1', async () => {
    const response: request.Response = await testRequest.getListsByUserId(
      GET_LISTS_BY_USER_ID_PARAMETERS_STUB,
    );

    const body: IList[] = response.body as IList[];

    expect(body[0].name).toEqual('my-list');
    expect(body.length).toEqual(2);
  });
});

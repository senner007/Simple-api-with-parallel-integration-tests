import { GET_LISTS_BY_USER_ID_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/GET_LISTS_BY_USER_ID_PARAMETERS_STUB';
import request from 'supertest';
import { testSeeds } from '../testSeeds';
import { dbManager } from '../../knex-manager';
import { testRequest } from '../endPointTestRequests';

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

    const firstList: string = response.body[0].name;
    const listLength: number = response.body.length;

    expect(firstList).toEqual('my-list');

    expect(listLength).toEqual(2);
  });
});

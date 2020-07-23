import { testRequest } from '../endPointTestRequests';
import request from 'supertest';
import { testSeeds } from '../testSeeds';
import { dbManager } from '../../knex-manager';

describe(`
    /lists/:id/items - GET
    {}
  `, () => {
  beforeEach(async () => {
    await testSeeds();
  });

  afterEach(async () => {
    await dbManager.truncateDb();
  });

  it('should get items by list id 1', async () => {
    const response: request.Response = await testRequest.getItemsByListId(1);

    expect(response.body.length).toEqual(1);
    expect(response.body[0].name).toEqual('some-item');
    expect(response.body[0].price).toEqual(25);
  });
});

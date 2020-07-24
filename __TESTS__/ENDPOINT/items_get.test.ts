import { testRequest } from '../endPointTestRequests';
import request from 'supertest';
import { testSeeds } from '../testSeeds';
import { dbManager } from '../../knex-manager';
import { IItem } from '../../src/controllers/api-controllers/api_interfaces';

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

    const body: IItem[] = response.body as IItem[];

    expect(body.length).toEqual(1);
    expect(body[0].name).toEqual('some-item');
    expect(body[0].price).toEqual(25);
  });
});

import { dbManager } from '../../knex-manager';
import { IItem } from '../../src/controllers/api.router.interfaces';
import { TEST_SEEDS } from '../TEST_SEEDS';
import { testRequests, ITestResponse } from '../ENDPOINT_TEST_REQUESTS';

describe(`
    /lists/:id/items - GET
    {}
  `, () => {
  beforeAll(async () => {
    await TEST_SEEDS(Number(process.env.JEST_WORKER_ID));
  });

  afterAll(async () => {
    await dbManager(Number(process.env.JEST_WORKER_ID)).truncateDb();
  });

  it('should get items by list id 1', async () => {
    const response: ITestResponse<
      IItem[]
    > = await testRequests.getItemsByListId(1);

    const body: IItem[] = response.body;

    expect(body.length).toEqual(1);
    expect(body[0].name).toEqual('some-item');
    expect(body[0].price).toEqual(25);
  });
});

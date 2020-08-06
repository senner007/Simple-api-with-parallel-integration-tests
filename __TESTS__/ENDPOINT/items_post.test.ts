import request from 'supertest';
import { dbManager } from '../../knex-manager';
import { OWNER_CREDENTIALS_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/OWNER_CREDENTIALS_PARAMETERS_STUB';
import { EResponseCodes } from '../../src/controllers/api.router.interfaces';
import { TEST_SEEDS } from '../TEST_SEEDS';
import { testRequests } from '../ENDPOINT_TEST_REQUESTS';

describe(`
    /lists/:id/items - POST
    {
      "user_name": string,
      "user_password": string,
      "item_id": number
    }
  `, () => {
  beforeEach(async () => {
    await TEST_SEEDS(Number(process.env.JEST_WORKER_ID));
  });

  afterEach(async () => {
    await dbManager(Number(process.env.JEST_WORKER_ID)).truncateDb();
  });

  it(`should post item 1
  - by list id 1 
  - and return status 200`, async () => {
    const response: request.Response = await testRequests.postItemByListId(
      {
        listId: 1,
        itemId: 1,
      },
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.OK);
  });

  it(`should not post item 1
  - by non existing list id 4 
  - and return status 400`, async () => {
    const response: request.Response = await testRequests.postItemByListId(
      {
        listId: 4,
        itemId: 1,
      },
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.BADREQUEST);
  });
});

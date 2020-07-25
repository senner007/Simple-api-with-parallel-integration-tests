import request from 'supertest';
import { TEST_SEEDS } from '../TEST_SEEDS';
import { FIREBASE_MOCK_SETUP } from '../__MOCKS__/FIREBASE_MOCK';
import { dbManager } from '../../knex-manager';
import { OWNER_CREDENTIALS_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/OWNER_CREDENTIALS_PARAMETERS_STUB';
import { EResponseCodes } from '../../src/controllers/api.router.interfaces';
import { TEST_REQUEST } from '../ENDPOINT_TEST_REQUESTS';

jest.mock('../../src/authentication/firebaseInit');

describe(`
    /lists/:id/items/:item_id - DELETE
    {
      "user_name": string,
      "user_password": string,
  }
  `, () => {
  beforeEach(async () => {
    await TEST_SEEDS();
    FIREBASE_MOCK_SETUP();
  });

  afterEach(async () => {
    await dbManager.truncateDb();
  });

  it(`should delete : 
    - item id 1 
    - by list id 1 
    - and return status 200
    `, async () => {
    const response: request.Response = await TEST_REQUEST.deleteItemById(
      {
        listId: 1,
        itemId: 1,
      },
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.OK);
  });

  it(`should NOT delete :
      - item id 1 
      - by list id 1 
      - with INCORRECT password 
      - and return status 401
    `, async () => {
    const response: request.Response = await TEST_REQUEST.deleteItemById(
      {
        listId: 1,
        itemId: 1,
      },
      {
        user_name: 'nielshtg@gmail.com',
        user_password: 'wrong_password',
      },
    );

    expect(response.status).toEqual(EResponseCodes.UNAUTHORIZED);
  });

  it(`should NOT delete : 
    - non existing item id 2 
    - by list id 1 
    - and return status 400
  `, async () => {
    const response: request.Response = await TEST_REQUEST.deleteItemById(
      {
        listId: 1,
        itemId: 2,
      },
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.BADREQUEST);
  });
});

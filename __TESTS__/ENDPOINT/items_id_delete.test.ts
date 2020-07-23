import { testRequest } from '../endPointTestRequests';
import request from 'supertest';
import { testSeeds } from '../testSeeds';
import { FIREBASE_MOCK } from '../__MOCKS__/FIREBASE_MOCK';
import { dbManager } from '../../knex-manager';
import { OWNER_CREDENTIALS_PARAMETERS_STUB } from '../__STUBS__/API_PARAMETERS/OWNER_CREDENTIALS_PARAMETERS_STUB';
import { EResponseCodes } from '../../src/controllers/api-controllers/api_interfaces';

jest.mock('../../src/authentication/firebaseInit');

describe(`
    /lists/:id/items/:item_id - DELETE
    {
      "user_name": string,
      "user_password": string,
  }
  `, () => {
  beforeEach(async () => {
    await testSeeds();
    FIREBASE_MOCK();
  });

  afterEach(async () => {
    await dbManager.truncateDb();
  });

  it(`should delete : 
    - item id 1 
    - by list id 1 
    - and return status 200
    `, async () => {
    const listId: number = 1;
    const itemId: number = 1;

    const response: request.Response = await testRequest.deleteItemById(
      listId,
      itemId,
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
    const listId: number = 1;
    const itemId: number = 1;

    const response: request.Response = await testRequest.deleteItemById(
      listId,
      itemId,
      {
        user_name: 'nielshtg@gmail.com',
        user_password: 'some_password',
      },
    );

    expect(response.status).toEqual(EResponseCodes.UNAUTHORIZED);
  });

  it(`should NOT delete : 
    - non existing item id 2 
    - by list id 1 
    - and return status 400
  `, async () => {
    const listId: number = 1;
    const itemId: number = 2;

    const response: request.Response = await testRequest.deleteItemById(
      listId,
      itemId,
      OWNER_CREDENTIALS_PARAMETERS_STUB,
    );

    expect(response.status).toEqual(EResponseCodes.BADREQUEST);
  });
});

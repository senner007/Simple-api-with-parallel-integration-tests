import initServer from '../src/server';
import request, { SuperTest } from 'supertest';
import {
  IListGet,
  IListPost,
  ICredentials,
  IList,
  IItem,
} from '../src/controllers/api.router.interfaces';
const app: Express.Application = initServer();

export interface ITestResponse<T> extends request.Response {
  body: T;
}

class TestRequests {
  public async getListsByUserId(
    parameters: IListGet,
  ): Promise<ITestResponse<IList[]>> {
    return request(app).get(`/api/lists`).send(parameters);
  }

  public async postListByUserId(
    list_name: IListPost,
    credentials: ICredentials,
  ): Promise<request.Response> {
    return request(app)
      .post(`/api/lists`)
      .send({ ...credentials, ...list_name });
  }

  public async deleteListById(
    listId: IList['id'],
    credentials: ICredentials,
  ): Promise<request.Response> {
    return request(app).delete(`/api/lists/${listId}`).send(credentials);
  }

  public async getItemsByListId(
    listId: IList['id'],
  ): Promise<ITestResponse<IItem[]>> {
    return request(app).get(`/api/lists/${listId}/items`);
  }

  public async postItemByListId(
    parameters: {
      listId: IList['id'];
      itemId: IItem['id'];
    },
    credentials: ICredentials,
  ): Promise<request.Response> {
    return request(app)
      .post(`/api/lists/${parameters.listId}/items`)
      .send({ ...credentials, item_id: parameters.itemId });
  }

  public async deleteItemById(
    parameters: {
      listId: IList['id'];
      itemId: IItem['id'];
    },
    credentials: ICredentials,
  ): Promise<request.Response> {
    return request(app)
      .delete(`/api/lists/${parameters.listId}/items/${parameters.itemId}`)
      .send({ ...credentials });
  }
}

const testRequests: TestRequests = new TestRequests();

export { testRequests };

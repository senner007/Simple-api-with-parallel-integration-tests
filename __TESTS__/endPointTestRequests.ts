import initServer from '../src/server';

import request, { SuperTest } from 'supertest';
import {
  IListGet,
  IListPost,
  ICredentials,
  IList,
  IItem,
} from '../src/controllers/api-controllers/api_interfaces';
const app: Express.Application = initServer();

const getListsByUserId = async (requestParameters: IListGet) => {
  return await request(app).get(`/api/lists`).send(requestParameters);
};

const postListByUserId = async (
  list_name: IListPost,
  requestParameters: ICredentials,
) => {
  return request(app)
    .post(`/api/lists`)
    .send({ ...requestParameters, ...list_name });
};

const deleteListById = async (
  listId: IList['id'],
  requestParameters: ICredentials,
) => {
  return request(app).delete(`/api/lists/${listId}`).send(requestParameters);
};

const getItemsByListId = async (listId: IList['id']) => {
  return await request(app).get(`/api/lists/${listId}/items`);
};

const postItemByListId = async (
  listId: IList['id'],
  item_id: IItem['id'],
  requestParameters: ICredentials,
) => {
  return await request(app)
    .post(`/api/lists/${listId}/items`)
    .send({ ...requestParameters, item_id });
};

const deleteItemById = async (
  listId: IList['id'],
  itemId: IItem['id'],
  requestParameters: ICredentials,
) => {
  return await request(app)
    .delete(`/api/lists/${listId}/items/${itemId}`)
    .send({ ...requestParameters });
};

const testRequest = {
  getListsByUserId,
  postListByUserId,
  deleteListById,
  getItemsByListId,
  postItemByListId,
  deleteItemById,
};

export { testRequest };

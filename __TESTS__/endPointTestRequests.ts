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

const getListsByUserId = async (parameters: IListGet) => {
  return request(app).get(`/api/lists`).send(parameters);
};

const postListByUserId = async (
  list_name: IListPost,
  credentials: ICredentials,
) => {
  return request(app)
    .post(`/api/lists`)
    .send({ ...credentials, ...list_name });
};

const deleteListById = async (
  listId: IList['id'],
  credentials: ICredentials,
) => {
  return request(app).delete(`/api/lists/${listId}`).send(credentials);
};

const getItemsByListId = async (listId: IList['id']) => {
  return request(app).get(`/api/lists/${listId}/items`);
};

const postItemByListId = async (
  parameters: {
    listId: IList['id'];
    itemId: IItem['id'];
  },
  credentials: ICredentials,
) => {
  return request(app)
    .post(`/api/lists/${parameters.listId}/items`)
    .send({ ...credentials, item_id: parameters.itemId });
};

const deleteItemById = async (
  parameters: {
    listId: IList['id'];
    itemId: IItem['id'];
  },
  credentials: ICredentials,
) => {
  return request(app)
    .delete(`/api/lists/${parameters.listId}/items/${parameters.itemId}`)
    .send({ ...credentials });
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

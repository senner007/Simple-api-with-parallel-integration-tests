import { knex } from '../dbConfig';
import {} from '../middlewares/middleware.interfaces';
import {
  IList,
  IUser,
  IRole,
  ERoles,
  IItem,
  IListItem,
} from '../controllers/api-controllers/api_interfaces';
import { BadRequest } from '../httpError/httpError';

const getListsByUserId: (id: number) => Promise<IList[]> = async (
  id: number,
) => {
  return await knex('lists')
    .select('*')
    .where('fk_user_id', id)
    .orderBy('lists.id', 'asc');
};

const getUserByUserName: (user_name: string) => Promise<IUser> = async (
  user_name: string,
) => {
  const user: IUser[] = await knex('users')
    .select('*')
    .where('name', user_name);
  return user[0];
};

const postListByUserId: (
  fk_user_id: number,
  name: string,
) => Promise<IList[]> = async (fk_user_id: number, name: string) => {
  return await knex('lists')
    .insert({
      fk_user_id,
      name,
    })
    .into('lists');
};

const deleteListById: (user_id: number, id: number) => Promise<number> = async (
  user_id: number,
  id: number,
) => {
  return await knex('lists')
    .where({ id })
    .where({ fk_user_id: user_id })
    .delete();
};

const postItemById: (
  fk_list_id: number,
  fk_item_id: number,
) => Promise<IList[]> = async (fk_list_id: number, fk_item_id: number) => {
  return await knex('list_items')
    .insert({
      fk_list_id,
      fk_item_id,
    })
    .into('list_items');
};

const getUserRoleByUserId: (
  fk_user_id: IUser['id'],
) => Promise<ERoles> = async (fk_user_id: IUser['id']) => {
  const roleName: Pick<IRole, 'name'>[] = await knex('user_roles')
    .join('roles', 'user_roles.fk_user_id', '=', 'roles.id')
    .where('user_roles.fk_user_id', '=', fk_user_id)
    .select('roles.name');
  return roleName[0].name as ERoles;
};

const getListItemsByListId: (list_id: IList['id']) => Promise<IItem[]> = async (
  list_id: IList['id'],
) => {
  return await knex('list_items')
    .join('items', 'items.id', '=', 'list_items.fk_item_id')
    .where('list_items.fk_list_id', '=', list_id)
    .select('items.id', 'items.name', 'items.price');
};

const deleteItemById: (
  fk_list_id: IListItem['fk_list_id'],
  fk_item_id: IListItem['fk_item_id'],
) => Promise<number> = async (
  fk_list_id: IListItem['fk_list_id'],
  fk_item_id: IListItem['fk_item_id'],
) => {
  const firstItem: IListItem = await knex('list_items')
    .where({ fk_list_id, fk_item_id })
    .first();

  if (firstItem) {
    return await knex('list_items').where({ id: firstItem.id }).del();
  } else {
    throw new BadRequest(
      'Item can not be deleted. Item by id was not found in list',
    );
  }
};

export {
  getListsByUserId,
  postListByUserId,
  getUserByUserName,
  deleteListById,
  postItemById,
  getUserRoleByUserId,
  getListItemsByListId,
  deleteItemById,
};

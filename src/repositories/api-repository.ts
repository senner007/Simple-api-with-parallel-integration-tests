import { knex } from '../dbConfig';
import {} from '../middlewares/middleware.interfaces';
import {
  IList,
  IUser,
  IRole,
  ERoles,
  IListItem,
  IItemDelete,
} from '../controllers/api.router.interfaces';
import { BadRequest } from '../httpError/httpError';

export async function getListsByUserId(id: number): Promise<IList[]> {
  return knex('lists')
    .select('*')
    .where('fk_user_id', id)
    .orderBy('lists.id', 'asc');
}

export async function getUserByUserName(user_name: string): Promise<IUser> {
  const user: IUser[] = await knex('users')
    .select('*')
    .where('name', user_name);
  return user[0];
}

export async function postListByUserId(
  fk_user_id: number,
  name: string,
): Promise<IList[]> {
  return knex('lists')
    .insert({
      fk_user_id,
      name,
    })
    .into('lists');
}

export function deleteListById(user_id: number, id: number): Promise<number> {
  return knex('lists').where({ id }).where({ fk_user_id: user_id }).delete();
}

export async function postItemById(
  fk_list_id: number,
  fk_item_id: number,
): Promise<IList[]> {
  return knex('list_items')
    .insert({
      fk_list_id,
      fk_item_id,
    })
    .into('list_items');
}

export async function getUserRoleByUserId(
  fk_user_id: IUser['id'],
): Promise<ERoles> {
  const roleName: Pick<IRole, 'name'>[] = await knex('user_roles')
    .join('roles', 'user_roles.fk_user_id', '=', 'roles.id')
    .where('user_roles.fk_user_id', '=', fk_user_id)
    .select('roles.name');
  return roleName[0].name as ERoles;
}

export async function getItemsByListId(list_id: IList['id']): Promise<IList[]> {
  return knex('list_items')
    .join('items', 'items.id', '=', 'list_items.fk_item_id')
    .where('list_items.fk_list_id', '=', list_id)
    .select('items.id', 'items.name', 'items.price');
}

export async function deleteItemById(itemDelete: IItemDelete): Promise<void> {
  const firstItem: IListItem = await knex('list_items')
    .where({
      fk_list_id: itemDelete.fk_list_id,
      fk_item_id: itemDelete.fk_item_id,
    })
    .first()
    .select('id');

  if (firstItem) {
    return knex('list_items').where({ id: firstItem.id }).del();
  } else {
    throw new BadRequest(
      'Item can not be deleted. Item by id was not found in list',
    );
  }
}

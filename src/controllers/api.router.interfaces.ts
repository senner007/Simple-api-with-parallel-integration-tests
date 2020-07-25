export interface IUser {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface IUserRole {
  id: number;
  fk_role_id: number;
  fk_user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface IRole {
  id: number;
  name: string;
}

export interface IList {
  id: number;
  fk_user_id: number;
  name: string;
}

export interface IItem {
  id: number;
  name: string;
  price: number;
}

export interface IListItem {
  id: number;
  fk_list_id: number;
  fk_item_id: number;
}

export interface ICredentials {
  user_name: IUser['name'];
  user_password: string;
}

export interface IListPost {
  list_name: IList['name'];
}

export interface IItemDelete {
  fk_list_id: IListItem['fk_list_id'];
  fk_item_id: IListItem['fk_item_id'];
}

export enum EResponseCodes {
  OK = 200,
  BADREQUEST = 400,
  UNAUTHORIZED = 401,
}

export enum ERoles {
  OWNER = 'OWNER',
}

export interface IListGet {
  user_id: IUser['id'];
}

export interface IItemPost {
  item_id: IItem['id'];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser_user {
  __typename: "User";
  id: string;
  login: string;
}

export interface createUser_createUser {
  __typename: "CreateUserPayload";
  user: createUser_createUser_user;
  token: string | null;
}

export interface createUser {
  createUser: createUser_createUser | null;
}

export interface createUserVariables {
  login: string;
  password: string;
}

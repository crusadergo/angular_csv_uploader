/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userMut
// ====================================================

export interface userMut_signinUser_user {
  __typename: "User";
  login: string;
  id: string;
}

export interface userMut_signinUser {
  __typename: "SignInUserPayload";
  token: string | null;
  user: userMut_signinUser_user | null;
}

export interface userMut {
  signinUser: userMut_signinUser | null;
}

export interface userMutVariables {
  login: string;
  password: string;
}

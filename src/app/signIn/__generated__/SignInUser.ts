/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignInUser
// ====================================================

export interface SignInUser_signinUser_user {
  __typename: "User";
  login: string;
  id: string;
}

export interface SignInUser_signinUser {
  __typename: "SignInUserPayload";
  token: string | null;
  user: SignInUser_signinUser_user | null;
}

export interface SignInUser {
  signinUser: SignInUser_signinUser | null;
}

export interface SignInUserVariables {
  login: string;
  password: string;
}

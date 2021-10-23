/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Mut
// ====================================================

export interface Mut_createCsv_item {
  __typename: "CsvStorage";
  title: string;
  file: any | null;
}

export interface Mut_createCsv {
  __typename: "UploadPayload";
  item: Mut_createCsv_item;
}

export interface Mut {
  createCsv: Mut_createCsv | null;
}

export interface MutVariables {
  title: string;
  file?: any | null;
}

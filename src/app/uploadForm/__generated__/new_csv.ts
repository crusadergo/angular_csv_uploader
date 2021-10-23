/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: new_csv
// ====================================================

export interface new_csv_create_createdCsv {
  __typename: "CsvStorage";
  title: string;
  file: any | null;
}

export interface new_csv_create {
  __typename: "UploadPayload";
  createdCsv: new_csv_create_createdCsv;
}

export interface new_csv {
  create: new_csv_create | null;
}

export interface new_csvVariables {
  title: string;
  file?: any | null;
}

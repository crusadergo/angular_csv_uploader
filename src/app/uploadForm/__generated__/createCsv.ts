/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCsv
// ====================================================

export interface createCsv_createCsv_csvObject {
  __typename: "CsvStorage";
  title: string;
  file: any | null;
}

export interface createCsv_createCsv {
  __typename: "UploadPayload";
  csvObject: createCsv_createCsv_csvObject;
}

export interface createCsv {
  createCsv: createCsv_createCsv | null;
}

export interface createCsvVariables {
  title: string;
  file?: any | null;
}

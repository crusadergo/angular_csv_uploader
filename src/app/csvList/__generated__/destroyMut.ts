/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: destroyMut
// ====================================================

export interface destroyMut_destroyCsv_csvs {
  __typename: "CsvStorage";
  id: string;
  title: string;
  filename: string;
}

export interface destroyMut_destroyCsv {
  __typename: "DestroyPayload";
  csvs: destroyMut_destroyCsv_csvs[];
}

export interface destroyMut {
  destroyCsv: destroyMut_destroyCsv | null;
}

export interface destroyMutVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAll
// ====================================================

export interface getAll_csvs {
  __typename: "CsvStorage";
  id: string;
  title: string;
  filename: string;
}

export interface getAll {
  csvs: getAll_csvs[];
}

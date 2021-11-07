/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateMut
// ====================================================

export interface updateMut_updateCsv_item {
  __typename: "CsvStorage";
  id: string;
  title: string;
  filename: string;
}

export interface updateMut_updateCsv {
  __typename: "UpdatePayload";
  item: updateMut_updateCsv_item;
}

export interface updateMut {
  updateCsv: updateMut_updateCsv | null;
}

export interface updateMutVariables {
  title: string;
  id: number;
}

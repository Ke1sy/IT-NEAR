/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePostMutation
// ====================================================

export interface UpdatePostMutation_updatePost {
  __typename: "Post";
  id: string;
  text: string;
}

export interface UpdatePostMutation {
  updatePost: UpdatePostMutation_updatePost;
}

export interface UpdatePostMutationVariables {
  id?: string | null;
  text: string;
}

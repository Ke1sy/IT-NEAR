/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddPostMutation
// ====================================================

export interface AddPostMutation_addPost {
  __typename: "Post";
  text: string;
  date: string;
  authorId: number;
  likedBy: string[];
}

export interface AddPostMutation {
  addPost: AddPostMutation_addPost;
}

export interface AddPostMutationVariables {
  text: string;
  date: string;
  authorId: number;
  likedBy: string[];
}

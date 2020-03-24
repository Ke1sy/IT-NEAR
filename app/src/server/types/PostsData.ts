/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostsData
// ====================================================

export interface PostsData_posts {
  __typename: "Post";
  id: string;
  text: string;
  likesCount: number;
  date: string;
  authorId: number;
}

export interface PostsData {
  posts: PostsData_posts[] | null;
}

export interface PostsDataVariables {
  authorId: number;
}

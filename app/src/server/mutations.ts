import {gql} from 'apollo-boost';

export const ADD_POST = gql`
   mutation AddPostMutation($text: String!, $date: String!, $authorId: Int!, $likedBy: [String!]!) {
    addPost(text: $text, date: $date, authorId: $authorId, likedBy: $likedBy) {
        text
        date
        authorId,
        likedBy
    }
}
`;

export const DELETE_POST = gql`
   mutation DeletePostMutation($id: ID) {
    deletePost(id: $id) {
        text
    }
}
`;

export const UPDATE_POST = gql`
   mutation UpdatePostMutation($id: ID, $text: String!, $likedBy: [String!]!) {
   updatePost(id: $id, text: $text, likedBy: $likedBy) {
        id
        text
        likedBy
    }
}
`;


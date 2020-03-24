import {gql} from 'apollo-boost';

export const ADD_POST = gql`
   mutation AddPostMutation($text: String!, $likesCount: Int!, $date: String!, $authorId: Int!) {
    addPost(text: $text, likesCount: $likesCount, date: $date, authorId: $authorId) {
        text
        date
        likesCount
        authorId
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
   mutation UpdatePostMutation($id: ID, $text: String!) {
   updatePost(id: $id, text: $text) {
        id
        text
    }
}
`;


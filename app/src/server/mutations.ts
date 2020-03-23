import {gql} from 'apollo-boost';

export const addPostMutation = gql`
   mutation addPostMutation($text: String!, $likesCount: Int!, $date: String!, $authorId: Int!) {
    addPost(text: $text, likesCount: $likesCount, date: $date, authorId: $authorId) {
        text
        date
        likesCount
        authorId
    }
}
`;

export const deletePostMutation = gql`
   mutation deletePostMutation($id: ID) {
    deletePost(id: $id) {
        text
    }
}
`;

export const updatePostMutation = gql`
   mutation updatePostMutation($id: ID, $text: String!) {
   updatePost(id: $id, text: $text) {
        id
        text
    }
}
`;


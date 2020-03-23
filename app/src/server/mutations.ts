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


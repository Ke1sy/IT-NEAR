import {gql} from 'apollo-boost';

export const postsQuery = gql`
    query postsQuery($authorId: Int!) {
        posts(authorId: $authorId){
            id,
            text,
            likesCount,
            date,
            authorId
        }
     }
`;
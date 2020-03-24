import gql from 'graphql-tag';

export const GET_POSTS = gql`
    query PostsData($authorId: Int!) {
        posts(authorId: $authorId){
            id,
            text,
            likesCount,
            date,
            authorId
        }
     }
`;
const graphql = require('graphql');
const {GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql;

const Posts = require("../models/posts");

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: GraphQLID},
        text: {type: GraphQLNonNull(GraphQLString)},
        likesCount: {type: GraphQLNonNull(GraphQLInt)},
        date: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)}
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        posts: {
            type: new GraphQLList(PostType),
            args: {
                authorId: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, {authorId}) {
                return Posts.find({authorId})
            }
        },
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addPost: {
            type: PostType,
            args: {
                text: {type: GraphQLNonNull(GraphQLString)},
                likesCount: {type: GraphQLNonNull(GraphQLInt)},
                date: {type: GraphQLNonNull(GraphQLString)},
                authorId: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, {text, likesCount, date, authorId}) {
                const post = new Posts({text, likesCount, date, authorId});
                return post.save()
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutations
});
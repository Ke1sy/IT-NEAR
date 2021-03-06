const graphql = require('graphql');
const {GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql;

const Posts = require("../models/posts");

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        text: {type: GraphQLNonNull(GraphQLString)},
        likedBy: {type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(GraphQLString)))},
        date: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)}
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        posts: {
            type: new GraphQLList(GraphQLNonNull(PostType)),
            args: {
                authorId: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, {authorId}) {
                return Posts.find({authorId}).sort({date:-1})
            }
        },
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addPost: {
            type: GraphQLNonNull(PostType),
            args: {
                text: {type: GraphQLNonNull(GraphQLString)},
                likedBy: {type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(GraphQLString)))},
                date: {type: GraphQLNonNull(GraphQLString)},
                authorId: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, {text, likedBy, date, authorId}) {
                const post = new Posts({text, likedBy, date, authorId});
                return post.save()
            }
        },
        deletePost: {
            type: GraphQLNonNull(PostType),
            args: {
                id: {type: GraphQLID},
            },
            resolve(parent, {id}) {
                return Posts.findByIdAndRemove(id);
            }
        },
        updatePost: {
            type: GraphQLNonNull(PostType),
            args: {
                id: {type: GraphQLID},
                text: {type: GraphQLNonNull(GraphQLString)},
                likedBy: {type: GraphQLNonNull(new GraphQLList(GraphQLNonNull(GraphQLString)))},
            },
            resolve(parent, {id, text, likedBy}) {
                return Posts.findByIdAndUpdate(
                    id,
                    {$set: {text, likedBy}},
                    {new: true}
                );
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutations
});
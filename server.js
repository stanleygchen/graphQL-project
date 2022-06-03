var express = require('express');
var express_graphql = require('express-graphql').graphqlHTTP;
var { buildSchema,
      GraphQLSchema,
      GraphQLList,
      GraphQLNonNull,
      GraphQLObjectType,
      GraphQLString
} = require('graphql');

var states = [
    {id: "AL", name: "Alabama" },
    {id: "AK", name: "Alaska"},
    {id: "AZ", name: "Arizona"}

];
// GraphQL schema
var StateType = new GraphQLObjectType({
    name: 'State',
    description: 'This is a state',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
    })
})

var RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: "Root Query",
    fields: () => ({
        states: {
            type: new GraphQLList(StateType),
            description: "List of all States",
            resolve: () => states
        }
    })
})

var schema = new GraphQLSchema({
    query: RootQueryType
})


// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    graphiql: true
}));
app.listen(5000, () => console.log('Express GraphQL Server Now Running On localhost:5000/graphql'));
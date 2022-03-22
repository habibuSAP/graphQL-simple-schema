const { ApolloServer, gql, MockList } = require("apollo-server");
const typeDefs = gql`
        scalar Date
        type SkiDays {
                id: ID!
                date: Date!
                mountain: String!
                conditions: Conditions
        }
        enum Conditions {
                POWDER
                HEAVY
                ICE
                THIN
        }
        type Query {
                totalDays: Int!
                allDays: [SkiDays!]!
        }
        input AddDayInput {
                date: Date!
                mountain: String!
                conditions: Conditions
        }
        type RemoveDayPayload {
                day: SkiDays!
                removed: Boolean
                totalBefore: Int
                totalAfter: Int
        }
        type Mutation {
                addDay(input: AddDayInput!): SkiDays
                removeDay(id:ID!): RemoveDayPayload! 
        }
        type Subscription {
                newDay: SkiDays!
        }
        
`;

const mocks = {
        Date: () => "1/2/2025",
        String: () => "Cool Stuff",
        Query: () => ({
                allDays: () => new MockList([1, 15])
        })


}
const resolvers = {

};

const server = new ApolloServer({
        typeDefs,
        mocks
});

server.listen().then(({ url }) => console.log('Server running at ', url)); 
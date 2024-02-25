const queries = `#graphql
    getUserToken(email: String!, password: String!): String!
    getCurrentLoggedInUser: User
`;

export default queries;

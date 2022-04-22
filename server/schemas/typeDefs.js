const { gql } = require("apollo-server-express");
// defining Query and Mutation types
const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(
      bookId: String!,
      authors: [String]!,
      description: String!,
      title: String!,
      image: String!,
    ): Auth
    removeBook(bookId: String!): Auth
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
      bookId: String
      authors: [String]
      description: String
      title: String
      image: String
      link: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;

import { gql } from '@apollo/client';
// me query
export const GET_ME = gql`
_id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
      bookId: String
      authors: [String]
      description: String
      title: String
      image: String
      link: String
`
    
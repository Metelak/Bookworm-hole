const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    // define query functionality to work with Mongoose Models
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ id: context.user._id})
            .select('-__v -password');
  
            return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      }
    },
    Mutation: {
        login:

        saveBook:

        deleteBook:
    }
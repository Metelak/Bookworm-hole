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
    // define mutation functionality to work with Mongoose Model
    Mutation: {
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
        },
        // create
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },
        // update
        saveBook: async(parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookData } },
                { new: true, runValidators: true }
              );
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You need to be logged in');
        },
        // delete
        removeBook: async(parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
              );
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You need to be logged in!');
        },
    }
};
    module.exports = resolvers;
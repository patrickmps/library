/* eslint no-underscore-dangle: 0 */
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}).populate('books'),
    allBooks: async (root, args) => {
      const filters = {}
      if (args?.author) {
        const author = await Author.find({ name: args.author })
        filters.author = author[0]._id
      }
      if (args?.genre) filters.genres = args.genre
      return Book.find(filters).populate('author', { name: 1, born: 1 })
    },
  },

  Author: {
    bookCount: async (root) => {
      const bookCount = root?.books.length

      return bookCount
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      try {
        user.save()
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },

    addBook: async (root, args, { currentUser }) => {
      const newBook = { ...args }

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      if (newBook.author?.length < 3 || newBook.title?.length < 3) {
        throw new GraphQLError('book title or author name being too short', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: newBook.author || newBook.name,
          },
        })
      }

      let author = await Author.findOne({ name: newBook.author })
      if (!author) {
        author = new Author({ name: newBook.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: newBook,
              error,
            },
          })
        }
      }
      newBook.author = author._id
      const book = new Book({ ...newBook })
      author.books = author.books.concat(book._id)

      try {
        await author.save()
        await book.save()
      } catch (error) {
        if (error.code === 11000) {
          throw new GraphQLError('This book has already been added ', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: newBook,
              error,
            },
          })
        }
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: newBook,
            error,
          },
        })
      }

      pubsub.publish('BOOK_ADDED', {
        bookAdded: book.populate('author', { name: 1, born: 1 }),
      })

      return book.populate('author', { name: 1, born: 1 })
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      try {
        author.save()
      } catch (error) {
        console.log(error.message)
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          },
        })
      }
      return author
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers

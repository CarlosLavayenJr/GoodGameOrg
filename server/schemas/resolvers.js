const { User, Product, Category, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },

    leagues: async (parent, { category, name, location }) => {
      const params = {};
      if (category) params.category = category;
      if (name) params.name = { $regex: name };
      if (location) params.location = { $regex: location };
      return await League.find(params).populate('category').populate('teams');
    },

    league: async (parent, { _id }) => {
      return await League.findById(_id).populate('category').populate('teams');
    },

    teams: async (parent, { category, name, leagueId }) => {
      const params = {};
      if (category) params.category = category;
      if (name) params.name = { $regex: name };
      if (leagueId) params.league = leagueId; 
      return await Team.find(params).populate('users').populate('league'); 
    },

    team: async (parent, { _id }) => {
      return await Team.findById(_id).populate('users').populate('league');
    },

    // ... (user resolver remains mostly the same)

    matches: async (parent, { teamId, leagueId }) => {
      const params = {};
      if (teamId) {
        params.$or = [{ team1: teamId }, { team2: teamId }];
      }
      if (leagueId) params.league = leagueId;
      return await Match.find(params).populate('team1').populate('team2');
    },

    match: async (parent, { _id }) => {
      return await Match.findById(_id).populate('team1').populate('team2');
    },

    checkout: async (parent, { leagueId }, context) => {
      const url = new URL(context.headers.referer).origin;
      const league = await League.findById(leagueId);

      if (!league) {
        throw new Error("League not found");
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Registration for ${league.name}`,
                description: league.description
              },
              unit_amount: league.registrationFee * 100, // Assuming you have a registrationFee field in League model
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}`,
      });

      return { session: session.id };
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addTeam: async (parent, { name, description, image, captain, league }, context) => {
      // ... (your logic to create a team)
  },

    updateTeam: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        return await Team.findByIdAndUpdate(_id, args, { new: true });
      }
      throw AuthenticationError;
    },

    createLeague: async (parent, args, context) => {
        // ... (your logic to create a league)
    },

    updateLeague: async (parent, { _id, ...args }, context) => {
        // ... (your logic to update a league)
    },

    deleteLeague: async (parent, { _id }, context) => {
        // ... (your logic to delete a league)
    },

    createMatch: async (parent, args, context) => {
        // ... (your logic to create a match)
    },

    updateMatch: async (parent, { _id, ...args }, context) => {
        // ... (your logic to update a match)
    },

    deleteMatch: async (parent, { _id }, context) => {
        // ... (your logic to delete a match)
    }
  }
};

module.exports = resolvers;

const { User, League, Match, Team, Tournament, Category } = require('../models');
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
      if (name) params.name = { $regex: name, $options: 'i' }; // added case-insensitive option
      if (location) params.location = { $regex: location, $options: 'i' }; // added case-insensitive option
      return await League.find(params).populate('category').populate('teams');
    },

    league: async (parent, { _id }) => {
      return await League.findById(_id).populate('category').populate('teams');
    },

    teams: async (parent, { category, name, leagueId }) => {
      const params = {};
      if (category) params.category = category;
      if (name) params.name = { $regex: name, $options: 'i' }; // added case-insensitive option
      if (leagueId) params.league = leagueId; 
      return await Team.find(params).populate('users').populate('league'); 
    },

    team: async (parent, { _id }) => {
      return await Team.findById(_id).populate('users').populate('league');
    },

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
    },

    tournaments: async (parent, { name, location }) => {
      const params = {};
      if (name) params.name = { $regex: name, $options: 'i' }; // added case-insensitive option
      if (location) params.location = { $regex: location, $options: 'i' }; // added case-insensitive option
      return await Tournament.find(params).populate('teams').populate('matches');
    },

    tournament: async (parent, { _id }) => {
      return await Tournament.findById(_id).populate('teams').populate('matches');
    },
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

      throw new AuthenticationError('Not authenticated');
    },

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

    addTeam: async (parent, { name, description, image, captain, league }, context) => {
      if (context.user) {
        const team = await Team.create({ name, description, image, captain, league });
        await League.findByIdAndUpdate(league, { $push: { teams: team._id } });
        return team;
      }
      throw new AuthenticationError('Not authenticated');
    },

    updateTeam: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        return await Team.findByIdAndUpdate(_id, args, { new: true });
      }
      throw new AuthenticationError('Not authenticated');
    },

    createLeague: async (parent, args, context) => {
      if (context.user) {
        const league = await League.create(args);
        return league;
      }
      throw new AuthenticationError('Not authenticated');
    },

    updateLeague: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        return await League.findByIdAndUpdate(_id, args, { new: true });
      }
      throw new AuthenticationError('Not authenticated');
    },

    deleteLeague: async (parent, { _id }, context) => {
      if (context.user) {
        return await League.findByIdAndDelete(_id);
      }
      throw new AuthenticationError('Not authenticated');
    },

    createMatch: async (parent, args, context) => {
      if (context.user) {
        const match = await Match.create(args);
        await League.findByIdAndUpdate(args.league, { $push: { matches: match._id } });
        return match;
      }
      throw new AuthenticationError('Not authenticated');
    },

    updateMatch: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        return await Match.findByIdAndUpdate(_id, args, { new: true });
      }
      throw new AuthenticationError('Not authenticated');
    },

    deleteMatch: async (parent, { _id }, context) => {
      if (context.user) {
        return await Match.findByIdAndDelete(_id);
      }
      throw new AuthenticationError('Not authenticated');
    },

    createTournament: async (parent, args, context) => {
      if (context.user) {
        const tournament = await Tournament.create(args);
        return tournament;
      }
      throw new AuthenticationError('Not authenticated');
    },

    updateTournament: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        return await Tournament.findByIdAndUpdate(_id, args, { new: true });
      }
      throw new AuthenticationError('Not authenticated');
    },

    deleteTournament: async (parent, { _id }, context) => {
      if (context.user) {
        return await Tournament.findByIdAndDelete(_id);
      }
      throw new AuthenticationError('Not authenticated');
    },
    addCategory: async (parent, args, context) => {
      if (context.user) {
        const newCategory = await Category.create(args);
        return newCategory;
      }
      throw new AuthenticationError('Not authenticated');
    },

    updateCategory: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        return await Category.findByIdAndUpdate(_id, args, { new: true });
      }
      throw new AuthenticationError('Not authenticated');
    },

    deleteCategory: async (parent, { _id }, context) => {
      if (context.user) {
        return await Category.findByIdAndDelete(_id);
      }
      throw new AuthenticationError('Not authenticated');
    },
  },
};

module.exports = resolvers;

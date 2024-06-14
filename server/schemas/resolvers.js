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
      return await Tournament.find(params).populate('category').populate('teams').populate('matches');
    },

    tournament: async (parent, { _id }) => {
      return await Tournament.findById(_id).populate('category').populate('teams').populate('matches');
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
      if (context.user) {
        // Check if a team with the same name and league already exists
        const existingTeam = await Team.findOne({ name, league });
        if (existingTeam) {
          throw new Error('Team with this name and league already exists');
        }
    
        const team = await Team.create({ name, description, image, captain, league });
        await League.findByIdAndUpdate(league, { $push: { teams: team._id } });
        return team;
      }
      throw AuthenticationError;
    },

    updateTeam: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        return await Team.findByIdAndUpdate(_id, args, { new: true });
      }
      throw AuthenticationError;
    },

    createLeague: async (parent, { name, location, category, startDate, endDate, format }, context) => {
      if (context.user) {
        // Check if a league with the same name and location already exists
        const existingLeague = await League.findOne({ name, location });
        if (existingLeague) {
          throw new Error('League with this name and location already exists');
        }
    
        const league = await League.create({ name, location, category, startDate, endDate, format });
        return league;
      }
      throw AuthenticationError;
    },

    updateLeague: async (parent, { _id, name, location, category, startDate, endDate, format }, context) => {
      if (context.user) {
        return await League.findByIdAndUpdate(_id, { name, location, category, startDate, endDate, format }, { new: true });
      }
      throw AuthenticationError;
    },

    deleteLeague: async (parent, { _id }, context) => {
      if (context.user) {
        return await League.findByIdAndDelete(_id);
      }
      throw AuthenticationError;
    },

    createMatch: async (parent, args, context) => {
      if (context.user) {
        // Check if a match with the same team1, team2, and league already exists
        const { team1, team2, league } = args;
        const existingMatch = await Match.findOne({ team1, team2, league });
        if (existingMatch) {
          throw new Error('Match with these teams and league already exists');
        }
    
        const match = await Match.create(args);
        await League.findByIdAndUpdate(args.league, { $push: { matches: match._id } });
        return match;
      }
      throw AuthenticationError;
    },
    

    updateMatch: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        return await Match.findByIdAndUpdate(_id, args, { new: true });
      }
      throw AuthenticationError;
    },

    deleteMatch: async (parent, { _id }, context) => {
      if (context.user) {
        return await Match.findByIdAndDelete(_id);
      }
      throw AuthenticationError;
    },

    createTournament: async (parent, { name, category, startDate, endDate, location }, context) => {
      if (context.user) {
        // Check if a tournament with the same name and location already exists
        const existingTournament = await Tournament.findOne({ name, location });
        if (existingTournament) {
          throw new Error('Tournament with this name and location already exists');
        }
    
        const tournament = await Tournament.create({ name, category, startDate, endDate, location });
        return tournament;
      }
      throw AuthenticationError;
    },

    updateTournament: async (parent, { _id, name, category, startDate, endDate, location }, context) => {
      if (context.user) {
        return await Tournament.findByIdAndUpdate(_id, { name, category, startDate, endDate, location }, { new: true });
      }
      throw AuthenticationError;
    },

    deleteTournament: async (parent, { _id }, context) => {
      if (context.user) {
        return await Tournament.findByIdAndDelete(_id);
      }
      throw AuthenticationError;
    },
    addCategory: async (parent, args, context) => {
      if (context.user) {
        const { name } = args;
    
        // Check if the category name already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
          throw new Error('Category with this name already exists');
        }
    
        const newCategory = await Category.create(args);
        return newCategory;
      }
      throw AuthenticationError;
    },

    updateCategory: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        return await Category.findByIdAndUpdate(_id, args, { new: true });
      }
      throw AuthenticationError;
    },

    deleteCategory: async (parent, { _id }, context) => {
      if (context.user) {
        return await Category.findByIdAndDelete(_id);
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;

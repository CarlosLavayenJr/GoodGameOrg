const typeDefs = `
  type Category {
    _id: ID
    name: String
    description: String
  }

  type Team {
    _id: ID!
    name: String!
    description: String
    image: String # URL for image
    captain: User # Reference to the team captain (User type)
    record: [Int] # Array of [wins, losses]
    users: [User]!
    league: League # Reference to the league the team belongs to
    matches: [Match]
  }

  type League {
    _id: ID!
    name: String!
    location: String
    category: Category!
    startDate: String
    endDate: String
    format: String  # e.g., "round robin," "tournament"
    teams: [Team]!
    matches: [Match]
  }

  type Tournament {
    _id: ID!
    name: String!
    category: Category!
    startDate: String!
    endDate: String!
    location: String
    teams: [Team]!
    matches: [Match]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    teams: [Team]
    matches: [Match]
    leagues: [League]
  }

  type Match {
    _id: ID!
    team1: Team!
    team2: Team!
    team1Score: Int
    team2Score: Int
    winner: Team
    date: String!
    time: String!
    location: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    categories: [Category]
    leagues(category: ID, name: String, location: String): [League]
    league(_id: ID!): League
    teams(category: ID, name: String, leagueId: ID): [Team] # Filter by league
    team(_id: ID!): Team
    user: User
    matches(teamId: ID, leagueId: ID): [Match] # Filter by team or league
    match(_id: ID!): Match
    tournaments(name: String, location: String): [Tournament]
    tournament(_id: ID!): Tournament
    checkout(leagueId: ID!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addTeam(team: [ID]!): Team
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateTeam(_id: ID!): Team
    createLeague(name: String!, location: String, category: ID!, startDate: String, endDate: String, format: String): League
    updateLeague(_id: ID!, name: String, location: String, category: ID, startDate: String, endDate: String, format: String): League
    deleteLeague(_id: ID!): League
    createMatch(team1: ID!, team2: ID!, date: String!, time: String!, location: String, league: ID): Match
    updateMatch(_id: ID!, team1Score: Int, team2Score: Int, winner: ID): Match
    deleteMatch(_id: ID!): Match
    createTournament(name: String!, category: ID!, startDate: String!, endDate: String!, location: String): Tournament
    updateTournament(_id: ID!, name: String, category: ID!, startDate: String, endDate: String, location: String): Tournament
    deleteTournament(_id: ID!): Tournament
    addCategory(name: String!, description: String): Category
    updateCategory(_id: ID!, name: String, description: String): Category
    deleteCategory(_id: ID!): Category
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const leagueRoutes = require('./routes/leagueRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/GoodGameOrg');
const dbConnection = mongoose.connection;

// mongoose.connect('mongodb://localhost:27017/GoodGameOrg', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(authRoutes);
app.use(tournamentRoutes);
app.use(leagueRoutes);

dbConnection.once('open', () => {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
});
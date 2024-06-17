import React from 'react';
import TournamentList from '../components/TournamentList';
import CreateTournament from '../components/CreateTournament';

const TournamentsPage = () => {
    return (
        <div>
            <h1>Tournaments</h1>
            <CreateTournament />
            <TournamentList />
        </div>
    );
};

export default TournamentsPage;

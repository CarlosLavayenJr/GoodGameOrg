import React from 'react';
import LeagueList from '../components/LeagueList';
import CreateLeague from '../components/CreateLeague';

const LeaguesPage = () => {
    return (
        <div>
            <h1>Leagues</h1>
            <CreateLeague />
            <LeagueList />
        </div>
    );
};

export default LeaguesPage;

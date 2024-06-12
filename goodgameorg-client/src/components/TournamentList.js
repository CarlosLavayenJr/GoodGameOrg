import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const TournamentList = () => {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        const fetchTournaments = async () => {
            const response = await axiosInstance.get('/tournaments');
            setTournaments(response.data);
        };

        fetchTournaments();
    }, []);

    return (
        <div>
            <h2>Tournaments</h2>
            <ul>
                {tournaments.map(tournament => (
                    <li key={tournament._id}>{tournament.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TournamentList;

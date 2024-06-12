import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const MatchList = ({ tournamentId }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            const response = await axiosInstance.get(`/tournaments/${tournamentId}/matches`);
            setMatches(response.data);
        };

        fetchMatches();
    }, [tournamentId]);

    return (
        <div>
            <h2>Matches</h2>
            <ul>
                {matches.map(match => (
                    <li key={match._id}>
                        {match.homeTeam} vs {match.awayTeam} - {match.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MatchList;

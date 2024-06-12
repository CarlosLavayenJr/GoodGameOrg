import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const TeamList = ({ tournamentId }) => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            const response = await axiosInstance.get(`/tournaments/${tournamentId}/teams`);
            setTeams(response.data);
        };

        fetchTeams();
    }, [tournamentId]);

    return (
        <div>
            <h2>Teams</h2>
            <ul>
                {teams.map(team => (
                    <li key={team._id}>{team.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TeamList;

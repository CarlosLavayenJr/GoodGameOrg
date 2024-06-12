import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const LeagueList = () => {
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        const fetchLeagues = async () => {
            const response = await axiosInstance.get('/leagues');
            setLeagues(response.data);
        };

        fetchLeagues();
    }, []);

    return (
        <div>
            <h2>Leagues</h2>
            <ul>
                {leagues.map(league => (
                    <li key={league._id}>{league.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default LeagueList;

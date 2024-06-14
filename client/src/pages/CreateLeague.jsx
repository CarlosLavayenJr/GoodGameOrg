import React, { useState } from 'react';

const CreateLeague = () => {
    const [leagueName, setLeagueName] = useState('');
    const [teams, setTeams] = useState(['']);
    const [numGames, setNumGames] = useState(0);
    const [gameType, setGameType] = useState('');

    const handleTeamChange = (index, event) => {
        const newTeams = [...teams];
        newTeams[index] = event.target.value;
        setTeams(newTeams);
    };

    const addTeam = () => {
        setTeams([...teams, '']);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Logic to handle form submission goes here
        console.log({ leagueName, teams, numGames, gameType });
    };

    return (
        <form onSubmit={handleSubmit} className='AddaLeague'>
            <div>
                <label>
                    League Name:
                    <input
                        type="text"
                        value={leagueName}
                        onChange={(e) => setLeagueName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Number of Games:
                    <input
                        type="number"
                        value={numGames}
                        onChange={(e) => setNumGames(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Game Type:
                    <input
                        type="text"
                        value={gameType}
                        onChange={(e) => setGameType(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>Teams:</label>
                {teams.map((team, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={team}
                            onChange={(e) => handleTeamChange(index, e)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addTeam}>Add Team</button>
            </div>
            <button type="submit">Create League</button>
        </form>
    );
};

export default CreateLeague;

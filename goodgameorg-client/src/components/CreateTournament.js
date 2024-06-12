import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const CreateTournament = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/tournaments', { name, description });
            alert('Tournament created successfully');
        } catch (error) {
            console.error('Create tournament error', error);
        }
    };

    return (
        <form onSubmit={handleCreate}>
            <input
                type="text"
                placeholder="Tournament Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create Tournament</button>
        </form>
    );
};

export default CreateTournament;

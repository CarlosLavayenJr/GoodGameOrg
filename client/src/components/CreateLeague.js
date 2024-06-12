import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const CreateLeague = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/leagues', { name, description });
            alert('League created successfully');
        } catch (error) {
            console.error('Create league error', error);
        }
    };

    return (
        <form onSubmit={handleCreate}>
            <input
                type="text"
                placeholder="League Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create League</button>
        </form>
    );
};

export default CreateLeague;

import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [setError] = useState(null);
    const [confirmPass] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        //Confirming the password is entered correctly
        if (password !== confirmPass) {
            setError('Password does not match!');
            return;
        }
        setError(null);

        try {
            await axiosInstance.post('/register', { username, password });
            alert('User registered successfully');
        } catch (error) {
            //Gives error message in console and to user
            console.error('Registration Error!', error);
            return res.status(400).json({message: 'Registration Error!'});
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;

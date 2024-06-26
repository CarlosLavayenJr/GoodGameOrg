import React, { useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';

export default function CreateTournament() {
  const [name, setName] = useState('');
  const [game, setGame] = useState('');
  const [participants, setParticipants] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation and handle form submission
    console.log('Tournament Name:', name);
    console.log('Game:', game);
    console.log('Participants:', participants);
  };

  return (
    <Container className="TournamentsBox">
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TextField
          label="Tournament Name"
          variant="outlined"     //Text field with an outline
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          
          InputProps={{
            style: {
              color: 'white', 
            },
          }}
          InputLabelProps={{
            style: {
              color: 'white', 
            },
          }}
        />
        <TextField
          label="Game"
          variant="outlined"
          value={game}
          onChange={(e) => setGame(e.target.value)}
          required

          InputProps={{
            style: {
              color: 'white', 
            },
          }}
          InputLabelProps={{
            style: {
              color: 'white', 
            },
          }}
        />
        <TextField
          label="Participants"
          variant="outlined"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          placeholder="Enter participant names or number of participants"
          required

          InputProps={{
            style: {
              color: 'white',
            },
          }}
          InputLabelProps={{
            style: {
              color: 'white', 
            },
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Tournament
        </Button>
      </Box>
    </Container>
  );
}

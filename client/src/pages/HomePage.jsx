import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/tournament-data');
        setData(response.data);
        window.bracketsViewer.render({
          stages: response.data.stage,
          matches: response.data.match,
          matchGames: response.data.match_game,
          participants: response.data.participant,
        });
      } catch (err) {
        console.error('Failed to fetch tournament data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Tournament Viewer</h1>
      <div id="tournament-viewer"></div>
    </div>
  );
};

export default HomePage;

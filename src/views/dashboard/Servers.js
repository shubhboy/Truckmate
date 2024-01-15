import React, { useState, useEffect } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles'


// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

const Servers = () => {
  // ** Hook
  const theme = useTheme()
  const [servers, setServers] = useState([]);
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const response = await fetch('/api/serverapi');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServers(data);
      } catch (error) {
        console.error("Fetching TruckersMP server data failed: ", error);
      }
    };

    fetchServerData();
  }, []);

  return (
    <Grid container spacing={2}>
      {servers.map((server, index) => (
        <Grid item xs={12} sm={6} md={6} key={index}>
          <Card sx={{ position: 'relative', mb: 2 }}>
            <CardContent>
              <Typography variant='h6'>
                {server.name || 'Server Name'}
                {<Typography variant='caption'> {server.game}</Typography>}
              </Typography>

              <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
                {`${server.queue} players in queue`}
              </Typography>
              <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                {`${server.players} / ${server.maxplayers}`}
              </Typography>
              <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Servers

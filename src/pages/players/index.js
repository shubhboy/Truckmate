import React, { useState } from 'react';

// ** MUI Imports
import { Grid, Typography, TextField, InputAdornment } from '@mui/material';


// ** Demo Components Imports
import CardUser from 'src/views/players/Players'
import Magnify from 'mdi-material-ui/Magnify'


const CardBasic = () => {
  const [truckersMPId, setTruckersMPId] = useState('');
  const [playerData, setPlayerData] = useState(null);

  const handleInputChange = (event) => {
    setTruckersMPId(event.target.value);
  };

  const fetchPlayerData = async () => {
    try {
      const response = await fetch(`/api/playerapi?truckersMPId=${truckersMPId}`);
      const data = await response.json();
      setPlayerData(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  console.log(playerData);

  const handleSearch = () => {
    fetchPlayerData();
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={6} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Player Truckers mp Info</Typography>
      </Grid>
      <Grid item xs={6} sx={{ paddingBottom: 4, alignItems: 'right' }}>
        <TextField
          value={truckersMPId}
          onChange={handleInputChange}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              handleSearch();
              ev.preventDefault();
            }
          }}
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        />
      </Grid>
      {playerData && (
        <Grid item xs={12} sm={12} md={12}>
          <CardUser playerData={playerData} />
        </Grid>
      )}
    </Grid>
  )
}

export default CardBasic
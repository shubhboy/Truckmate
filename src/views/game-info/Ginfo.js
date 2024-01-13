import React, { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'



const Ginfo = () => {
  const [supportedVersions, setSupportedVersions] = useState(null);

  useEffect(() => {
    fetch('https://api.truckersmp.com/v2/version')
      .then(response => response.json())
      .then(data => setSupportedVersions(data));
  }, []);

  return (
    <Card>
      <CardHeader
        title='Supported Game version Information'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        {supportedVersions ? (
          <Box>
            <Typography variant="subtitle1">ETS Version: {supportedVersions.supported_game_version}</Typography>
            <Typography variant="subtitle1">ATS Version: {supportedVersions.supported_ats_game_version}</Typography>
          </Box>
        ) : (
          <p>Loading supported game version information...</p>
        )}
      </CardContent>
    </Card>
  );
}

export default Ginfo;

import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, CardHeader, CardContent } from '@mui/material';

const Ginfo = () => {
  const [supportedVersions, setSupportedVersions] = useState(null);

  useEffect(() => {
    fetch('/api/ginfoapi')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
        // Update the state with the received data
        setSupportedVersions({
          supported_game_version: data.supported_game_version,
          supported_ats_game_version: data.supported_ats_game_version
        });
      })
      .catch(error => {
        console.error('Error fetching supported game versions:', error);
      });
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
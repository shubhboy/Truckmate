import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import History from 'mdi-material-ui/History';
import CellphoneLink from 'mdi-material-ui/CellphoneLink';
import StarCircleOutline from 'mdi-material-ui/StarCircleOutline';

const VtcStat = () => {
  const [vtcData, setVtcData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.truckersmp.com/v2/vtc');
      const data = await response.json();

      if (data && data.featured && data.recent && data.featured_cover) {
        const featuredCount = data.featured.length;
        const recentCount = data.recent.length;
        const featuredCoverCount = data.featured_cover.length;

        setVtcData([
          { stats: featuredCount, title: 'Featured', color: 'primary', icon: <StarCircleOutline sx={{ fontSize: '1.75rem' }} /> },
          { stats: recentCount, title: 'Recent', color: 'success', icon: <History sx={{ fontSize: '1.75rem' }} /> },
          { stats: featuredCoverCount, title: 'Featured Cover', color: 'warning', icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
          }
        ]);
      } else {
        console.error('Error: Data properties are undefined');
      }
    } catch (error) {
      console.error('Error fetching VTC data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStats = () => {
    return vtcData.map((item, index) => (
      <Grid item xs={12} sm={4} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ));
  };

  return (
    <Card>
      <CardHeader
        title='VTC Info'
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VtcStat;
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ** Icons Imports
import CellphoneLink from 'mdi-material-ui/CellphoneLink';
import StarCircleOutline from 'mdi-material-ui/StarCircleOutline';
import CalendarBlank from 'mdi-material-ui/CalendarBlank';
import ClipboardTextClock from 'mdi-material-ui/ClipboardTextClock';

const EventsStat = ({ eventData }) => {

  const salesData = [
    {
      stats: eventData.featured.toString(),
      title: 'Featured',
      color: 'primary',
      icon: <StarCircleOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: eventData.today.toString(),
      title: 'Today',
      color: 'success',
      icon: <CalendarBlank sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: eventData.now.toString(),
      color: 'warning',
      title: 'Now',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: eventData.upcoming.toString(),
      color: 'info',
      title: 'Upcoming',
      icon: <ClipboardTextClock sx={{ fontSize: '1.75rem' }} />
    }
  ];


  const renderStats = (salesData) => {
    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        title='TMP Event (Convoy) Information'
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Checkout all convoy info
            </Box>{' '}
            😎
          </Typography>
        }
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
          {renderStats(salesData)}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EventsStat;
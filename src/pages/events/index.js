import React, { useState, useEffect } from 'react';
import { Grid, CardHeader, Card } from '@mui/material';


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Einfo from 'src/views/events/Einfo'

import Events from 'src/views/events/Events'



const EventsStat = () => {
  const [eventData, setEventData] = useState({
    featured: 0,
    today: 0,
    now: 0,
    upcoming: 0
  });

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await fetch('/api/eventsapi');
        const jsonResponse = await response.json();

        // Check if the 'response' property exists in the JSON response
        if (jsonResponse && response) {
          const { featured, today, now, upcoming } = response;
          setEventData({
            featured: featured.length,
            today: today.length,
            now: now.length,
            upcoming: upcoming.length
          });
        } else {
          // Handle the case where the 'response' property does not exist
          console.error('API response does not contain the expected "response" property.');
        }
      } catch (error) {
        console.error('Error fetching events data:', error);
      }
    };

    fetchEventsData();
  }, []);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {/*<Grid item xs={12} md={12} lg={12}>
          <Events eventData={eventData} />
  </Grid> */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Convoy / Events info' titleTypographyProps={{ variant: 'h6' }} />
            <Einfo />
          </Card>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default EventsStat
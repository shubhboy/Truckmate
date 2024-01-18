// ** MUI Imports
import Grid from '@mui/material/Grid'


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'


import Servers from 'src/views/dashboard/Servers'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={12}>
        <Grid item xs={12} sm={12} md={12}>
          <Servers />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard

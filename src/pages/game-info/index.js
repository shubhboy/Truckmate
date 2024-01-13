import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Info from 'src/views/game-info/Ginfo'



const Ginfo = () => {
    return (
      <ApexChartWrapper>
        <Grid container spacing={6}>
        
    <Grid item xs={12} md={12} lg={12}>
            <Info />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    )
  }
  
  export default Ginfo
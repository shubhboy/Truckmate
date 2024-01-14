import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Vtc from 'src/views/vtc/Vtc'
import Vinfo from 'src/views/vtc/Vinfo'



const VtcStat = () => {
    return (
      <ApexChartWrapper>
        <Grid container spacing={6}>
        
    <Grid item xs={12} md={12} lg={12}>
            {/* <Vtc /> */}
            <Vinfo />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    )
  }
  
  export default VtcStat
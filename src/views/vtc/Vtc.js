// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import History from 'mdi-material-ui/History'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import StarCircleOutline from 'mdi-material-ui/StarCircleOutline'
import CalendarBlank from 'mdi-material-ui/CalendarBlank'

const vtcData = [
  {
    stats: '12',
    title: 'Featured',
    color: 'primary',
    icon: <StarCircleOutline sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '38',
    title: 'Recent',
    color: 'success',
    icon: <History sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '7',
    color: 'warning',
    title: 'Featured Cover',
    icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
  }
]

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
  ))
}

const VtcStat = () => {
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
  )
}

export default VtcStat
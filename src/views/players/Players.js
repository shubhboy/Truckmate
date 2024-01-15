// ** MUI Imports
import { Box, Card, Avatar, CardMedia, Typography, CardContent, Divider, Grid } from '@mui/material';

import { styled } from '@mui/material/styles'



// ** Icons Imports
import { TrendingUp, StarOutline, LockOpenOutline, CalendarAccountOutline } from 'mdi-material-ui';



// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardUser = ({ playerData }) => {
  const data = playerData.response;

  return (
    <Card sx={{ position: 'relative' }}>
      <CardMedia sx={{ height: '12.625rem' }} image='/images/cards/background-user.png' />
      <Avatar
        alt={data.name}
        src={data.avatar}
        sx={{
          width: 75,
          height: 75,
          left: '1.313rem',
          top: '10.28125rem',
          position: 'absolute',
          border: theme => `0.25rem solid ${theme.palette.common.white}`
        }}
      />
      <CardContent>
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6'>{data.name}</Typography>
            <Typography variant='caption' sx={{ fontWeight: 600, color: 'text.primary' }}>Steam ID : {data.steamID}</Typography>
          </Box>
          <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
            <CalendarAccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            TMP Join Date
            <Typography variant='body2'>{data.joinDate}</Typography>
          </Typography>
        </Box>
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            Other Info
          </Typography>
        </Box>
      </CardContent>




      <Grid container spacing={6}>
        <Grid
          item
          sm={5}
          xs={12}
          sx={{ paddingTop: ['0 !important', '1.5rem !important'], paddingLeft: ['1.5rem !important', '0 !important'] }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover',
              padding: theme => `${theme.spacing(18, 5, 16)} !important`
            }}
          >
            <Box>
              <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>

                <Typography variant='h6'>VTC</Typography>
              </Box>
              {data.vtcHistory.map((vtc, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant='subtitle1'>{vtc.name}</Typography>
                  <Typography variant='body2'>Join Date: {vtc.joinDate}</Typography>
                  <Typography variant='body2'>Left Date: {vtc.leftDate}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={7}>
          <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
            <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
              Ban History
            </Typography>

            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Grid container spacing={4}>
              <Grid item xs={12} sm={5}>
                <StyledBox>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>Active Ban : {data.banned ? 'Yes' : 'No'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarAccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>Ban Until : {data.bannedUntil}</Typography>
                  </Box>
                </StyledBox>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                  <StarOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                  <Typography variant='body2'>Patreon Member : {data.patreon.isPatron ? 'Yes' : 'No'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                  <Typography variant='body2'>VTC Member : {data.vtc.inVTC ? 'Yes' : 'No'}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>

  )
}

export default CardUser

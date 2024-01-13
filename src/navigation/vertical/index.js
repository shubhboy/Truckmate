// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCircle from 'mdi-material-ui/AccountCircle'
import TruckFastOutline from 'mdi-material-ui/TruckFastOutline'
import CalendarEdit from 'mdi-material-ui/CalendarEdit'
import Information from 'mdi-material-ui/Information'


const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Player Info',
      icon: AccountCircle,
      path: '/players'
    },
    {
      title: 'Events',
      icon: CalendarEdit,
      path: '/events'
    },
    {
      title: 'VTC',
      icon: TruckFastOutline,
      path: '/vtc'
    },
    {
      sectionTitle: 'Info'
    },
    {
      title: 'Game info',
      icon: Information,
      path: '/game-info'
    }
  ]
}

export default navigation

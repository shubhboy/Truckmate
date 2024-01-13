import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Collapse, Typography, IconButton } from '@mui/material';
import { ChevronUp, ChevronDown, Map } from 'mdi-material-ui';

const ConvoyTable = ({ convoys, title }) => {
    const [openRow, setOpenRow] = useState(null);

    const handleRowClick = (index) => {
        setOpenRow(openRow === index ? null : index);
    };

    const openMap = (mapUrl) => {
        window.open(mapUrl, '_blank');
    };

    return (
        <div>
            <Typography variant='h6' align='center' gutterBottom component='div'>
                {title}
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label='collapsible table'>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Featured Convoy</TableCell>
                            <TableCell align='center'>Game</TableCell>
                            <TableCell align='center'>Server</TableCell>
                            <TableCell align='center'>Depature City</TableCell>
                            <TableCell align='center'>Arrival City</TableCell>
                            <TableCell align='center'>Map</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {convoys && convoys.map((convoy, index) => (
                            <React.Fragment key={index}>
                                <TableRow onClick={() => handleRowClick(index)}>
                                    <TableCell>
                                        <IconButton aria-label='expand row' size='small'>
                                            {openRow === index ? <ChevronUp /> : <ChevronDown />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{convoy.name}</TableCell>
                                    <TableCell align='center'>{convoy.game}</TableCell>
                                    <TableCell align='center'>{convoy.server.name}</TableCell>
                                    <TableCell align='center'>{convoy.departure.city}</TableCell>
                                    <TableCell align='center'>{convoy.arrive.city}</TableCell>
                                    <TableCell align='center'>
                                        <IconButton aria-label='open map' size='small' onClick={() => openMap(convoy.map)}>
                                            <Map />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                                        <Collapse in={openRow === index} timeout='auto' unmountOnExit>
                                            <Box margin={1}>
                                                <Typography variant='h6' gutterBottom component='div'>
                                                    More Info
                                                </Typography>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align='center'>VTC Name: {convoy.vtc.name}</TableCell>
                                                        <TableCell align='center'>Confirmed Attendances: {convoy.attendances.confirmed}</TableCell>
                                                        <TableCell align='center'>Unsure Attendances: {convoy.attendances.unsure}</TableCell>
                                                        <TableCell algin='center'>VTCS: {convoy.attendances.vtcs}</TableCell>
                                                        <TableCell align='center'>Required DLC: {convoy.dlcs.dlc_id}</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const Einfo = () => {
    const [featuredConvoys, setFeaturedConvoys] = useState([]);
    const [todayConvoys, setTodayConvoys] = useState([]);
    const [nowConvoys, setNowConvoys] = useState([]);
    const [upcomingConvoys, setUpcomingConvoys] = useState([]);

    useEffect(() => {
        fetch('https://api.truckersmp.com/v2/events')
            .then(response => response.json())
            .then(data => {
                setFeaturedConvoys(data.response.featured);
                setTodayConvoys(data.response.today);
                setNowConvoys(data.response.now);
                setUpcomingConvoys(data.response.upcoming);
            });
    }, []);

    return (
        <div>
            <ConvoyTable convoys={featuredConvoys} title="Featured Convoys" />
            <ConvoyTable convoys={todayConvoys} title="Today's Convoys" />
            <ConvoyTable convoys={nowConvoys} title="Now Convoys" />
            <ConvoyTable convoys={upcomingConvoys} title="Upcoming Convoys" />
        </div>
    );
};

export default Einfo;
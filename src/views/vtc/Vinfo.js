import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Collapse, Typography, IconButton } from '@mui/material';
import { ChevronUp, ChevronDown, MessageProcessingOutline } from 'mdi-material-ui';

const VtcTable = ({ vtcs, title }) => {
    const [openRow, setOpenRow] = useState(null);

    const handleRowClick = (index) => {
        setOpenRow(openRow === index ? null : index);
    };

    const openDiscord = (discordUrl) => {
        window.open(discordUrl, '_blank');
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
                            <TableCell>VTC Name</TableCell>
                            <TableCell align='center'>Owner</TableCell>
                            <TableCell align='center'>Slogan</TableCell>
                            <TableCell align='center'>Member Count</TableCell>
                            <TableCell align='center'>Discord</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vtcs && vtcs.map((vtc, index) => (
                            <React.Fragment key={index}>
                                <TableRow onClick={() => handleRowClick(index)}>
                                    <TableCell>
                                        <IconButton aria-label='expand row' size='small'>
                                            {openRow === index ? <ChevronUp /> : <ChevronDown />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{vtc.name}</TableCell>
                                    <TableCell align='center'>{vtc.owner_username}</TableCell>
                                    <TableCell align='center'>{vtc.slogan}</TableCell>
                                    <TableCell align='center'>{vtc.members_count}</TableCell>
                                    <TableCell align='center'>
                                        <IconButton aria-label='open discord' size='small' onClick={() => openDiscord(vtc.socials.discord)}>
                                            <MessageProcessingOutline />
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
                                                        <TableCell align='center'>Recruitment: {vtc.recruitment}</TableCell>
                                                        <TableCell align='center'>Language: {vtc.language}</TableCell>
                                                        <TableCell align='center'>Verified: {vtc.verified ? 'Yes' : 'No'}</TableCell>
                                                        <TableCell align='center'>Created: {vtc.created}</TableCell>
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

const Vinfo = () => {
    const [recentVtc, setRecentVtc] = useState([]);
    const [featuredVtc, setFeaturedVtc] = useState([]);
    const [featuredCoverVtc, setFeaturedCoverVtc] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.truckersmp.com/v2/vtc');
                const data = await response.json();
                setRecentVtc(data.response.recent);
                setFeaturedVtc(data.response.featured);
                setFeaturedCoverVtc(data.response.featured_cover);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <VtcTable vtcs={recentVtc} title="Recent VTC" />
            <VtcTable vtcs={featuredVtc} title="Featured VTC" />
            <VtcTable vtcs={featuredCoverVtc} title="Featured Cover VTC" />
        </div>
    );
};

export default Vinfo;
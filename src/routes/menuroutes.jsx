import React from 'react';
//Components
import DashBoard from '../screens/dashboard/dashboard';
import Historical from '../screens/historical/historical';
import User from '../screens/user/user';
import Device from '../screens/device/device';
//Icons
import AssessmentIcon from '@material-ui/icons/Assessment';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import MemoryIcon from '@material-ui/icons/Memory';

const adminRoutes = [
    {
        path: '/main',
        name: "Panel",
        icon: () => <AssessmentIcon style={{ color: 'white' }} />,
        component: DashBoard,
        to: "/"

    },
    {
        path: '/history',
        name: "Historicos",
        icon: () => <HistoryIcon style={{ color: 'white' }} />,
        component: Historical,

    },
    {
        path: '/user',
        name: "Usuario",
        icon: () => <PersonIcon style={{ color: 'white' }} />,
        component: User,

    },
    {
        path: '/device',
        name: "Dipositivos",
        icon: () => <MemoryIcon style={{ color: 'white' }} />,
        component: Device,

    },
    // { redirect: true, path: "/", to: "/main", name: "HomePage" }
];

export default adminRoutes;
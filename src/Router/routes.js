/* eslint-disable no-unused-vars */
import { Route } from 'react-router-dom'
import PrivateRoute from './CustomRoutes/PrivateRoute'
// import PublicRoute from './CustomRoutes/PublicRoute'
import * as paths from '../constants/routerConstants'
import DefaultLayout from './../components/Layouts/DefaultLayout'

const routes = [
    // {
    //     name: 'LandingPage',
    //     path: paths.HomePath,
    //     route: Route,
    //     componentProps: { routes: [] },
    //     exact: true,
    // },
    {
        name: 'MarketView',
        path: paths.HomePath,
        route: Route,
        componentProps: { routes: [] },
        layout: DefaultLayout,
        exact: true,
    },
    {
        name: 'MarketNftDetailView',
        path: `${paths.MarketDetailPath}/:id`,
        route: PrivateRoute,
        layoutProps: { hideFooter: true },
        componentProps: { routes: [] },
        layout: DefaultLayout,
        // exact: true,
    },
    {
        name: 'Profile',
        path: paths.ProfilePath,
        route: PrivateRoute,
        componentProps: { routes: [] },
        layout: DefaultLayout,
        exact: true,
    },
]

export default routes

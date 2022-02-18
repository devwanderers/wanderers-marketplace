/* eslint-disable no-unused-vars */
import { Route } from 'react-router-dom'
// import PrivateRoute from "./CustomRoutes/PrivateRoute"
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
        name: 'MarketNftDetail',
        path: paths.MarketDetailPath,
        route: Route,
        layoutProps: { hideFooter: true },
        componentProps: { routes: [] },
        layout: DefaultLayout,
        exact: true,
    },
    {
        name: 'Profile',
        path: paths.ProfilePath,
        route: Route,
        componentProps: { routes: [] },
        layout: DefaultLayout,
        exact: true,
    },
]

export default routes

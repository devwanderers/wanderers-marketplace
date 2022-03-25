import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch } from 'react-router'
import loadable from '@loadable/component'
import routes from './routes'
import PageLoading from './../components/PageLoadings/PageLoading'

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {routes.map((route, index) => {
                        return (
                            <route.route
                                key={`route-${route.name}`}
                                path={route.path}
                                exact={route.exact}
                                component={(props) => {
                                    const Component = loadable(
                                        () => import(`../views/${route.name}`),
                                        {
                                            fallback: <PageLoading />,
                                        }
                                    )
                                    const layoutProps = route?.layoutProps
                                        ? route?.layoutProps
                                        : {}
                                    return route?.layout ? (
                                        <route.layout
                                            {...props}
                                            {...layoutProps}
                                        >
                                            <Component
                                                {...props}
                                                {...route?.componentProps}
                                            />
                                        </route.layout>
                                    ) : (
                                        <Component
                                            {...props}
                                            {...route?.componentProps}
                                        />
                                    )
                                }}
                            />
                        )
                    })}
                </Switch>
            </Router>
        )
    }
}

export default AppRouter

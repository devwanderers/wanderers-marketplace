import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { HomePath } from '../../constants/routerConstants'

const PrivateRoute = ({ component, ...restProps }) => {
    const { account } = useWeb3React()

    return (
        <Route
            {...restProps}
            render={(props) => {
                const Component = component
                // Add Logic here
                if (!account) return <Redirect to={HomePath} />
                return <Component {...props} />
            }}
        />
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)

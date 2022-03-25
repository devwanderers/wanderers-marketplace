/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { Layout, Drawer } from 'antd'
import { GiHamburgerMenu } from 'react-icons/gi'
import DefaultFooter from '../Footers/DefaultFooter'
// import NoAuthNavbar from '../Navbar/NoAuthNavbar'
// import Header from './../DisplayText/Header'
import useWindowSize from './../../hooks/useWindowSize'
import * as routePaths from '../../constants/routerConstants'
import { BrandLogoSVG } from '../../assets/svg/brand'
import MarketNavbar from '../Navbar/MarketNavbar'
import WalletDrawer from '../Wallet/WalletDrawer'
import useAuth from './../../hooks/useAuth'
import useDebugInformation from './../../hooks/useDebugInformation'

const { Content } = Layout

const DefaultLayout = ({ hideFooter, children, ...rest }) => {
    const history = useHistory()
    const { login, logout } = useAuth()
    const { width } = useWindowSize()
    useDebugInformation('DefaultLayout', { width, login, logout, history })

    // const [isOpen, setOpenDrawer] = useState(false)
    return (
        <Layout
            className="overflow-x-hidden flex flex-col min-h-screen"
            style={{ minWidth: '425px' }}
        >
            <MarketNavbar />

            <WalletDrawer login={login} logout={logout} />
            <Content className="bg-white flex flex-1 flex-shrink flex-grow relative">
                {children}
            </Content>
        </Layout>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.element,
}

export default DefaultLayout

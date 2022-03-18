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

const { Content } = Layout

const DefaultLayout = ({ hideFooter, children, ...rest }) => {
    const history = useHistory()
    const [showDrawer, setShowDrawer] = useState(false)
    const { width } = useWindowSize()

    const handleOnClickBurger = () => {
        setShowDrawer(!showDrawer)
    }
    // const [isOpen, setOpenDrawer] = useState(false)
    return (
        <Layout
            className="overflow-x-hidden flex flex-col min-h-screen"
            style={{ minWidth: '425px' }}
        >
            <MarketNavbar />
            {/* {width >= 768 ? (
                <header className="h-24 relative z-50 lg:px-0 text-white bg-blue-5 2xl:px-8">
                    <div className="max-w-1280px m-auto flex h-full px-6 2xl:px-0">
                        <div className="mr-20 h-full py-5">
                            <Link to={routePaths.HomePath} className="h-full ">
                                <div className="h-full">
                                    <BrandLogoSVG
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </div>
                            </Link>
                        </div>
                        <div className="flex-1"></div>
                        <div className="flex items-center justify-center space-x-6 h-full py-6">
                            <div className="text-xl font-saira-condensed flex flex-row items-center space-x-6">
                                <div>
                                    <a
                                        target="_blank"
                                        // href=""
                                        onClick={() => {
                                            window.location.replace(
                                                'https://thewanderers.io/'
                                            )
                                        }}
                                    >
                                        Home
                                    </a>
                                </div>
                                <div></div>
                            </div>
                            <button className="font-saira-condensed text-xl h-full px-8 rounded-full border border-green-0 text-green-0">
                                Connect Wallet
                            </button>
                            <button
                                onClick={() =>
                                    history.push(routePaths.ProfilePath)
                                }
                                className="font-saira-condensed text-xl text-white bg-primary h-full px-8 rounded-full"
                            >
                                My Profile
                            </button>
                        </div>
                    </div>
                </header>
            ) : (
                <React.Fragment>
                    <Drawer
                        placement="left"
                        closable={true}
                        onClose={handleOnClickBurger}
                        visible={showDrawer}
                        key="left"
                    >
                        <div>
                            <div className="flex flex-col text-xl font-saira-condensed space-y-2 mb-5">
                                <div className="">
                                    <a
                                        target="_blank"
                                        onClick={() => {
                                            window.location.replace(
                                                'https://thewanderers.io/'
                                            )
                                        }}
                                    >
                                        Home
                                    </a>
                                </div>
                                <div>
                                    <Link to={routePaths.HomePath}>
                                        Marketplace
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-row space-x-5">
                                <button className="font-saira-condensed text-xl py-2 px-8 rounded-full border border-green-0 text-green-0">
                                    Connect Wallet
                                </button>
                                <button
                                    onClick={() =>
                                        history.push(routePaths.ProfilePath)
                                    }
                                    className="font-saira-condensed text-xl text-white bg-primary py-2 px-8 rounded-full"
                                >
                                    My Profile
                                </button>
                            </div>
                        </div>
                    </Drawer>
                    <header className="h-24 relative z-50 py-6 lg:px-0 text-white bg-blue-5">
                        <div className="max-w-1800px m-auto flex h-full">
                            <div className="flex-1 relative">
                                <a className="h-full absolute left-0 top-0 bottom-0 ">
                                    <div
                                        onClick={handleOnClickBurger}
                                        className="flex items-center justify-center text-2xl h-full px-4 cursor-pointer  transform  active:scale-125 "
                                        style={{ color: '#fff' }}
                                    >
                                        <GiHamburgerMenu height="100%" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </header>
                </React.Fragment>
            )} */}

            <WalletDrawer />
            <Content className="bg-white flex flex-1 flex-shrink flex-grow relative">
                {children}
            </Content>
            {/* {!hideFooter && (
                <DefaultFooter className="bg-white flex-1 flex-shrink flex-grow" />
            )} */}
        </Layout>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.element,
}

export default DefaultLayout

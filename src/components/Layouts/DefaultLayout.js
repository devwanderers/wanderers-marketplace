import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { Layout, Drawer } from 'antd'
import { IoIosArrowDown } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import DefaultFooter from '../Footers/DefaultFooter'
// import NoAuthNavbar from '../Navbar/NoAuthNavbar'
import Header from './../DisplayText/Header'
import useWindowSize from './../../hooks/useWindowSize'

const { Content } = Layout

const DefaultLayout = ({ children, ...rest }) => {
    const [showDrawer, setShowDrawer] = useState(false)
    const { width } = useWindowSize()

    const handleOnClickBurger = () => {
        setShowDrawer(!showDrawer)
    }
    // const [isOpen, setOpenDrawer] = useState(false)
    return (
        <Layout className="overflow-x-hidden flex flex-col min-h-screen">
            {width >= 768 ? (
                <Header className="h-24 relative z-50 py-6 lg:px-0 text-white bg-blue-5">
                    <div className="max-w-1800px m-auto flex h-full px-6 lg:px-0">
                        <div className="flex-1"></div>
                        <div className="flex items-center justify-center space-x-6">
                            <div className="text-blue-4 text-xl font-saira-condensed flex flex-row items-center space-x-6">
                                <div>
                                    <Link>Home</Link>
                                </div>
                                <div>
                                    <Link>Explore</Link>
                                </div>
                                <div>
                                    <a className="">
                                        <span className="flex">
                                            Community
                                            <div className="flex items-center justify-center relative pl-1">
                                                <IoIosArrowDown />
                                            </div>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <button className="font-saira-condensed text-xl py-2 px-8 rounded-full border border-green-0 text-green-0">
                                Connect Wallet
                            </button>
                            <button className="font-saira-condensed text-xl text-white bg-primary py-2 px-8 rounded-full">
                                My Profile
                            </button>
                        </div>
                    </div>
                </Header>
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
                                    <Link>Home</Link>
                                </div>
                                <div>
                                    <Link>Explore</Link>
                                </div>
                                <div>
                                    <a className="">
                                        <span className="flex">
                                            Community
                                            <div className="flex items-center justify-center relative pl-1">
                                                <IoIosArrowDown />
                                            </div>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-row space-x-5">
                                <button className="font-saira-condensed text-xl py-2 px-8 rounded-full border border-green-0 text-green-0">
                                    Connect Wallet
                                </button>
                                <button className="font-saira-condensed text-xl text-white bg-primary py-2 px-8 rounded-full">
                                    My Profile
                                </button>
                            </div>
                        </div>
                    </Drawer>
                    <Header className="h-24 relative z-50 py-6 lg:px-0 text-white bg-blue-5">
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
                    </Header>
                </React.Fragment>
            )}

            <Content className="bg-white flex flex-1 flex-shrink flex-grow">
                {children}
            </Content>
            <DefaultFooter className="bg-white flex-1 flex-shrink flex-grow" />
        </Layout>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.element,
}

export default DefaultLayout

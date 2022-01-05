/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import GenericNavBar from './GenericNavbar'
import { Button, Dropdown, Avatar } from 'antd'
// import { useHistory } from 'react-router'
import useWindowSize from './../../hooks/useWindowSize'
// import { TravelPath } from '../../constants/routerConstants'
import MenuNavbar from './MenuNavbar'
import GenericNavbarMobile from './GenericNavbarMobile'

const NoAuthNavBar = ({ logout, authenticated, ...rest }) => {
    const [showDrawer, setShowDrawer] = useState(false)
    // const history = useHistory()
    const { width } = useWindowSize()
    const handleShowDrawer = () => setShowDrawer(!showDrawer)

    const menu = (
        <MenuNavbar
            isMobile={width < 768}
            authenticated={authenticated}
            logout={logout}
        />
    )

    return width >= 768 ? (
        <GenericNavBar
            {...rest}
            rightSection={
                <div className="flex justify-center items-center">
                    <button className="border border-blue-2 text-blue-2 text-lg px-12">
                        Connect
                    </button>
                </div>
            }
        />
    ) : (
        <GenericNavbarMobile
            {...rest}
            showDrawer={showDrawer}
            onClickBurguer={handleShowDrawer}
            burgerColor="black"
            hideLogo
            contentDrawer={
                <React.Fragment>
                    <div className="mb-10"></div>
                    {menu}
                </React.Fragment>
            }
        />
    )
}

export default NoAuthNavBar

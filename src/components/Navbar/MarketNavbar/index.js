import React from 'react'
import { BrandLogoSVG } from '../../../assets/svg/brand'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'

import { navbarMenu } from '../../../constants/navbarMenu'
import { BsPerson } from 'react-icons/bs'
import WalletButton from '../../Wallet/WalletButton'
import useActiveWeb3React from './../../../hooks/useActiveWeb3React'

const MenuOption = ({ selected, onClick, children }) => {
    return (
        <div
            onClick={onClick}
            className="px-4 relative h-full flex items-end pb-3 text-aqua-2 text-lg cursor-pointer"
        >
            {selected && (
                <div className="absolute h-1 bg-blue-6 bottom-0 left-0 w-full"></div>
            )}
            {children}
        </div>
    )
}

const MarketNavbar = ({ onOpenDrawer, visibleDrawer }) => {
    const navigate = useNavigate()
    // const { visibleWalletDrawer } = useWalletDrawer()
    const location = useLocation()
    const { account } = useActiveWeb3React()
    console.log({ location })
    const isSelected = (path) => {
        if (typeof path !== 'string' || visibleDrawer) return false

        return !!matchPath({ path, exact: true }, location.pathname)
    }

    return (
        <header className="h-20 bg-blue-8 border-b border-aqua-3">
            <div className="max-w-1800px mx-auto flex flex-row h-full pl-4">
                <button
                    onClick={() => navigate('/')}
                    className="h-12 w-12 my-auto mr-4 lg:mr-0"
                >
                    <BrandLogoSVG height={'100%'} width="100%" />
                </button>
                <div className="ml-auto h-full ">
                    <div className="flex flex-row h-full gap-4 lg:gap-12">
                        <div className=" flex flex-row space-x-2 lg:space-x-4 h-full">
                            {navbarMenu.map((menu) => {
                                const handleOnClick = () =>
                                    typeof menu.path === 'function'
                                        ? menu.path()
                                        : navigate(menu.path)

                                return (
                                    <MenuOption
                                        key={menu.id}
                                        onClick={handleOnClick}
                                        selected={isSelected(menu.path)}
                                    >
                                        {menu.title}
                                    </MenuOption>
                                )
                            })}
                        </div>
                        <div className="h-full flex flex-row items-end gap-6">
                            {account && (
                                <div className="relative text-white h-12 pb-3 px-4">
                                    {isSelected('profile') && (
                                        <div className="absolute h-1 bg-blue-6 bottom-0 left-0 w-full"></div>
                                    )}

                                    <button
                                        className="h-full"
                                        onClick={() => navigate('profile')}
                                    >
                                        <BsPerson size={'100%'} />
                                    </button>
                                </div>
                            )}
                            <div className="relative text-white h-12 pb-3 px-4">
                                {visibleDrawer && (
                                    <div className="absolute h-1 bg-blue-6 bottom-0 left-0 w-full"></div>
                                )}
                                <WalletButton
                                    visibleDrawer={visibleDrawer}
                                    onOpenDrawer={onOpenDrawer}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default MarketNavbar

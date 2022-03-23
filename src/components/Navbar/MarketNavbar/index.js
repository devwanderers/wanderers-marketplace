import React from 'react'
import { BrandLogoSVG } from '../../../assets/svg/brand'
import { matchPath, useHistory, useLocation } from 'react-router-dom'
import { HomePath, ProfilePath } from '../../../constants/routerConstants'
import { navbarMenu } from '../../../constants/navbarMenu'
import { BsPerson } from 'react-icons/bs'
import WalletButton from '../../Wallet/WalletButton'
import useWalletDrawer from './../../../store/reducers/siteInteraction/hooks/useWalletDrawer'
import { useWeb3React } from '@web3-react/core'

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

const MarketNavbar = (props) => {
    const history = useHistory()
    const { visibleWalletDrawer } = useWalletDrawer()
    const location = useLocation()
    const { account } = useWeb3React()

    const isSelected = (path) => {
        if (typeof path !== 'string' || visibleWalletDrawer) return false

        return !!matchPath(location.pathname, { path, exact: true })
    }

    return (
        <header className="h-20 bg-blue-8 border-b border-aqua-3">
            <div className="max-w-1800px mx-auto flex flex-row h-full">
                <button
                    onClick={() => history.push(HomePath)}
                    className="h-12 w-12 my-auto"
                >
                    <BrandLogoSVG height={'100%'} width="100%" />
                </button>
                <div className="ml-auto h-full ">
                    <div className="flex flex-row h-full gap-12">
                        <div className=" flex flex-row space-x-4 h-full">
                            {navbarMenu.map((menu) => {
                                const handleOnClick = () =>
                                    typeof menu.path === 'function'
                                        ? menu.path()
                                        : history.push(menu.path)

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
                                    {isSelected(ProfilePath) && (
                                        <div className="absolute h-1 bg-blue-6 bottom-0 left-0 w-full"></div>
                                    )}

                                    <button
                                        className="h-full"
                                        onClick={() =>
                                            history.push(ProfilePath)
                                        }
                                    >
                                        <BsPerson size={'100%'} />
                                    </button>
                                </div>
                            )}
                            <div className="relative text-white h-12 pb-3 px-4">
                                {visibleWalletDrawer && (
                                    <div className="absolute h-1 bg-blue-6 bottom-0 left-0 w-full"></div>
                                )}
                                <WalletButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default MarketNavbar
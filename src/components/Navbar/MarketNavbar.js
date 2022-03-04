import React from 'react'
import { BrandLogoSVG } from '../../assets/svg/brand'
import { useHistory, useLocation } from 'react-router-dom'
import { HomePath } from '../../constants/routerConstants'
import { navbarMenu } from './../../constants/navbarMenu'

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
    const location = useLocation()
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
                    <div className="flex flex-row space-x-2 h-full">
                        {navbarMenu.map((menu) => {
                            const handleOnClick = () => {
                                if (typeof menu.path === 'function') {
                                    menu.path()
                                } else {
                                    history.push(menu.path)
                                }
                            }
                            const isSelected = () => {
                                if (typeof menu.path === 'function')
                                    return false

                                const match = location.pathname.indexOf(
                                    menu.path
                                )

                                if (match !== -1) return true
                                return false
                            }
                            return (
                                <MenuOption
                                    key={menu.id}
                                    onClick={handleOnClick}
                                    selected={isSelected()}
                                >
                                    {menu.title}
                                </MenuOption>
                            )
                        })}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default MarketNavbar

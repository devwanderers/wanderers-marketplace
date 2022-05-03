import React from 'react'
import { BiWalletAlt } from 'react-icons/bi'

const WalletButton = ({ onOpenDrawer, visibleDrawer }) => {
    return (
        <button
            className="h-full"
            onClick={() => {
                if (visibleDrawer) onOpenDrawer(false)
                else onOpenDrawer(true)
            }}
        >
            <BiWalletAlt size={'100%'} />
        </button>
    )
}

export default WalletButton

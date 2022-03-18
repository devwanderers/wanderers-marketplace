import React from 'react'
import { BiWalletAlt } from 'react-icons/bi'
import useWalletDrawer from './../../store/reducers/siteInteraction/hooks/useWalletDrawer'

const WalletButton = () => {
    const { openWalletDrawer, closeWalletDrawer, visibleWalletDrawer } =
        useWalletDrawer()

    return (
        <button
            className="h-full"
            onClick={() => {
                if (visibleWalletDrawer) closeWalletDrawer()
                else openWalletDrawer()
            }}
        >
            <BiWalletAlt size={'100%'} />
        </button>
    )
}

export default WalletButton

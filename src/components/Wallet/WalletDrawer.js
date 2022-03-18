import React, { useEffect } from 'react'
import { Drawer } from 'antd'
import { BsPerson } from 'react-icons/bs'
import useWalletDrawer from './../../store/reducers/siteInteraction/hooks/useWalletDrawer'
import { useLocation } from 'react-router-dom'

const WalletDrawer = (props) => {
    const { visibleWalletDrawer, closeWalletDrawer } = useWalletDrawer()
    const location = useLocation()
    console.log({ location })

    useEffect(() => {
        closeWalletDrawer()
    }, [location])

    return (
        <Drawer
            visible={visibleWalletDrawer}
            placement="right"
            getContainer={false}
            onClose={closeWalletDrawer}
            title={
                <div className="flex">
                    <div className="text-white text-3xl mr-3">
                        <BsPerson />
                    </div>
                    <div className="flex items-center">
                        <span className="text-white text-xl">My Wallet</span>
                    </div>
                </div>
            }
            closable={false}
            style={{ height: 'calc(100% - 78.89px', bottom: 0, top: 'auto' }}
        >
            <p className="text-blue-9">
                Connect with one of our available wallet providers or create a
                new one
            </p>

            <div className="space-y-2 mt-8 flex flex-col">
                <button className="text-center border border-blue-9 hover:border-white py-1">
                    <span className="text-white">Metamask</span>
                </button>
                {/* <button className="text-center border border-blue-9 hover:border-white py-1">
                    <span className="text-white">Coinbase Wallet</span>
                </button>
                <button className="text-center border border-blue-9 hover:border-white py-1">
                    <span className="text-white"> WalletConnect</span>
                </button> */}
            </div>
        </Drawer>
    )
}

export default WalletDrawer

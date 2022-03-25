/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Drawer } from 'antd'
import { BsPerson } from 'react-icons/bs'
import useWalletDrawer from './../../store/reducers/siteInteraction/hooks/useWalletDrawer'
import { useLocation } from 'react-router-dom'
import useAuth from './../../hooks/useAuth'
import { useWeb3React } from '@web3-react/core'
import { cls } from './../../services/helpers'
import { formatAddress } from './../../services/address-services'

const WalletDrawer = ({ login, logout }) => {
    const { visibleWalletDrawer, closeWalletDrawer } = useWalletDrawer()
    // const [visible, setState] = useState(false)
    const location = useLocation()
    const { account } = useWeb3React()

    // useEffect(() => {
    //     closeWalletDrawer()
    // }, [location])

    // useEffect(() => {
    //     setState(visibleWalletDrawer)
    // }, [visibleWalletDrawer])

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
                    <div
                        className={cls(
                            `flex items-center w-full ${
                                account && 'justify-between'
                            }`
                        )}
                    >
                        {account ? (
                            <React.Fragment>
                                <span className="text-white text-xl">
                                    My Wallet
                                </span>
                                <span className="text-white text-xl">
                                    {formatAddress(account)}
                                </span>
                            </React.Fragment>
                        ) : (
                            <span className="text-white text-xl">
                                Connect your wallet
                            </span>
                        )}
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
                {!account ? (
                    <button
                        onClick={() => login()}
                        className="text-center border border-blue-9 hover:border-white py-1"
                    >
                        <span className="text-white">Metamask</span>
                    </button>
                ) : (
                    <button
                        onClick={() => logout()}
                        className="text-center border border-blue-9 hover:border-white py-1"
                    >
                        <span className="text-white">Disconnect</span>
                    </button>
                )}
            </div>
        </Drawer>
    )
}

export default WalletDrawer

/* eslint-disable no-unused-vars */
import { useCallback } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { useDispatch } from 'react-redux'
import { injected } from './../wallet/connectors'
import { setupNetwork } from './../services/wallet'
import { useLocalStorage } from './useStorage'
import * as actions from '../store/reducers/globalActions'
import useActiveWeb3React from './useActiveWeb3React'

const useAuth = () => {
    const { chainId, activate, deactivate } = useActiveWeb3React()
    // const [walletAuth, setWalletAuth] = useLocalStorage('walletAuth', 'false')
    const dispatch = useDispatch()

    const login = useCallback(
        (msg) => {
            activate(injected, async (error) => {
                if (error instanceof UnsupportedChainIdError) {
                    console.log(error)
                    const hasSetup = await setupNetwork()
                    if (hasSetup) {
                        activate(injected).then(() => {
                            window.localStorage.setItem('walletAuth', 'true')
                            // setWalletAuth(true)
                        })
                    }
                } else {
                    if (error instanceof NoEthereumProviderError) {
                        console.log(error)
                    } else if (
                        error instanceof UserRejectedRequestErrorInjected
                    ) {
                        console.log(error)
                    }
                }
            }).then(() => {
                window.localStorage.setItem('walletAuth', 'true')
                // setWalletAuth(true)
            })
        },
        [activate]
    )

    const logout = useCallback(() => {
        deactivate()
        window.localStorage.setItem('walletAuth', 'false')
        dispatch(actions.logout())
    }, [deactivate, dispatch, chainId])

    return { login, logout }
}

export default useAuth

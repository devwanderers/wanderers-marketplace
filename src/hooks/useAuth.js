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

const useAuth = () => {
    const { chainId, activate, deactivate } = useWeb3React()
    const [walletAuth, setWalletAuth] = useLocalStorage('walletAuth', false)
    const dispatch = useDispatch()

    const login = useCallback(
        (msg) => {
            activate(injected, async (error) => {
                if (error instanceof UnsupportedChainIdError) {
                    const hasSetup = await setupNetwork()
                    if (hasSetup) {
                        activate(injected).then(() => {
                            setWalletAuth(true)
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
                setWalletAuth(true)
            })
        },
        [activate]
    )
    const logout = useCallback(() => {
        deactivate()
        setWalletAuth(false)
    }, [deactivate, dispatch, chainId])

    return { login, logout }
}

export default useAuth

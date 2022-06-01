/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useLocalStorage } from './useStorage'
import useAuth from './useAuth'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import * as actions from '../store/reducers/globalActions'

const useConnect = () => {
    const { chainId, activate, deactivate } = useWeb3React()
    const { login } = useAuth()
    const { connector, account, library } = useWeb3React()
    // const [walletAuth, setWalletAuth] = useLocalStorage('walletAuth', false)
    const dispatch = useDispatch()

    useEffect(() => {
        const walletAuth = window.localStorage.getItem('walletAuth')
        if (walletAuth === 'true') {
            console.log('Login')
            login()
        }
    }, [login])

    useEffect(() => {
        if (account && connector) {
            const handleDeactivate = () => {
                // setWalletAuth(false)
            }
            const reload = () => {
                window.location.reload()
                dispatch(actions.logout())
            }

            connector.on('Web3ReactDeactivate', handleDeactivate)
            window.ethereum.on('chainChanged', reload)
            window.ethereum.on('accountsChanged', reload)

            return () => {
                connector.removeListener(
                    'Web3ReactDeactivate',
                    handleDeactivate
                )
                window.ethereum.removeListener('chainChanged', reload)
                window.ethereum.removeListener('accountsChanged', reload)
            }
        }
        return undefined
    }, [connector])
}

export default useConnect

import { useEffect } from 'react'
import { useLocalStorage } from './useStorage'
import useAuth from './useAuth'
import { useWeb3React } from '@web3-react/core'

const useConnect = () => {
    const { login } = useAuth()
    const { connector, account } = useWeb3React()
    const [walletAuth, setWalletAuth] = useLocalStorage('walletAuth1', false)

    useEffect(() => {
        if (walletAuth) {
            login()
        }
    }, [login])

    useEffect(() => {
        if (account && connector) {
            const handleDeactivate = () => {
                setWalletAuth(false)
            }
            const reload = () => {
                window.location.reload()
            }

            connector.on('Web3ReactDeactivate', handleDeactivate)
            window.ethereum.on('chainChanged', reload)
            return () => {
                connector.removeListener(
                    'Web3ReactDeactivate',
                    handleDeactivate
                )
                window.ethereum.removeListener('chainChanged', reload)
            }
        }
        return undefined
    }, [connector])
}

export default useConnect

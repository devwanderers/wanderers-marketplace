/* eslint-disable no-unused-vars */
import { useCallback } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useMoralis } from 'react-moralis'

const useAuth = () => {
    const {
        authenticate,
        logout: deactivate,
        isAuthenticated,
        chainId,
        account,
    } = useMoralis()
    const dispatch = useDispatch()

    const login = useCallback(
        async (msg) => {
            await authenticate()
                .then((user) => {
                    console.log('logged in user:', user)
                    // console.log(user.get('ethAddress'))
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        [authenticate]
    )

    const logout = useCallback(async () => {
        await deactivate()
    }, [deactivate, dispatch])

    return { login, logout }
}

export default useAuth

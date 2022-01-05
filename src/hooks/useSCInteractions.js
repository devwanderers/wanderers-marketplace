/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../wallet/connectors'
import { useLocalStorage } from './useStorage'
import AvatarDestinareAbi from '../abi/AvatarDestinare.json'
import useEffectOnce from './useEffectOnce'
import * as scActions from '../store/reducers/scInteractionReducer/actions'
import { scInteractionReducerSelector } from '../store/reducers/scInteractionReducer/selectors'
import { returnPromise } from '../services/promises'
import useInterval from './useInterval'

const nftAvatar = 1000000000000000000

const mintResultConverToArray = (res) => {
    const {
        events: { Transfer },
    } = res

    if (!Array.isArray(Transfer)) {
        const {
            returnValues: { tokenId },
        } = Transfer
        return [tokenId]
    }

    return Transfer.reduce((acc, val) => {
        const {
            returnValues: { tokenId },
        } = val
        return [...acc, tokenId]
    }, [])
}

const transformTokenIdResult = (res) => {
    return res.reduce((acc, val) => {
        return { ...acc, [val.tokenId]: { ...val } }
    }, {})
}

const ntfObjectToArray = (data) => {
    if (Object.keys(data).length === 0) return {}
    return Object.keys(data).reduce((acc, val) => {
        return [...acc, data[val]]
    }, [])
}

const useSCInteractions = () => {
    const [minting, setFetchingMinting] = useState(false)
    const [mintingError, setMintingError] = useState(null)
    // Estado traido del reducer
    const scInteractions = useSelector(scInteractionReducerSelector)
    const dispatch = useDispatch()

    // Acciones conectadas con dispatch
    const setMinting = (data) => dispatch(scActions.setMinting(data))
    const setMinted = (data) => dispatch(scActions.setMinted(data))
    const clearMinting = () => dispatch(scActions.clearMinting())
    const clearMinted = () => dispatch(scActions.clearMinted())

    const { active, library, activate, deactivate, account, chainId } =
        useWeb3React()

    const [walletAuth, setWalletAuth] = useLocalStorage('walletAuth', false)

    async function getTokenUris() {
        if (scInteractions.minting.length === 0) return
        const promises = scInteractions.minting.reduce((acc, val) => {
            return [
                ...acc,
                new Promise((resolve, reject) => {
                    ;(async () => {
                        try {
                            const contract = new library.eth.Contract(
                                AvatarDestinareAbi,
                                process.env.REACT_APP_AVATAR_DESTINARE_CONTRACT_ADDRESS
                            )
                            const tokenUri = await contract.methods
                                .tokenURI(val)
                                .call()
                            const response = await fetch(tokenUri)
                            const nftData = await response.json()
                            resolve({
                                tokenId: val,
                                tokenUri,
                                nftData,
                            })
                        } catch (error) {
                            reject(error)
                        }
                    })()
                }),
            ]
        }, [])

        Promise.all(promises)
            .then((values) => {
                setFetchingMinting(false)
                clearMinting()
                setMinted(values)
                // callBack(values)
            })
            .catch((reason) => {
                console.log({ reason })
                setMintingError(reason)
            })
    }

    const mintAvatar = useCallback(
        async (amount) => {
            if (!active) setMintingError('Wallet not connected')
            if (mintingError) setMintingError(null)

            clearMinted()
            setFetchingMinting(true)
            try {
                const contract = new library.eth.Contract(
                    AvatarDestinareAbi,
                    process.env.REACT_APP_AVATAR_DESTINARE_CONTRACT_ADDRESS
                )
                const mintAvatar = await contract.methods
                    .mint(account, amount)
                    .send({ from: account, value: nftAvatar * amount })

                const transformedData = mintResultConverToArray(mintAvatar)
                setMinting(transformedData)
            } catch (error) {
                console.log({ error })
                setFetchingMinting(false)
                setMintingError(error)
            }
        },
        [active, library]
    )

    const resetError = useCallback(() => {
        setFetchingMinting(false)
        setMintingError(null)
    }, [mintingError])

    useInterval(
        () => {
            getTokenUris()
        },
        minting ? 5000 : null
    )
    return {
        mintAvatar,
        mintData: scInteractions.minted,
        minting,
        mintingError,
        resetError,
    }
}

export default useSCInteractions

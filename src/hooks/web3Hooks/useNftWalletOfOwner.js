import { useState, useCallback, useMemo, useEffect } from 'react'
import { useERC721Contract } from './useContract'
import useActiveWeb3React from './../useActiveWeb3React'

const useNftWalletOfOwner = (contractAddress) => {
    const [error, setError] = useState(undefined)
    const [tokensId, setTokensId] = useState(undefined)
    const { account, library } = useActiveWeb3React()

    const erc721Contract = useERC721Contract(contractAddress)

    const getWalletOfOwner = useCallback(async () => {
        try {
            const res = await erc721Contract.walletOfOwner(account)
            setTokensId(res)
        } catch (error) {
            setError(error)
        }
    }, [account, erc721Contract])

    useEffect(() => {
        getWalletOfOwner()
    }, [library, account])

    return useMemo(() => {
        if (error) {
            console.log({ error })
            return undefined
        }
        return tokensId?.map((v) => Number(parseInt(v)))
    }, [tokensId, error])
}

export default useNftWalletOfOwner

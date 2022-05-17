/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import AvatarDestinareAbi from '../../abi/AvatarDestinare.json'
import { useEffect } from 'react/cjs/react.development'
import { Moralis } from 'moralis'
import { useMoralisQuery } from 'react-moralis'

export const useFirst500MIntedNft = () => {
    const [data, setData] = useState([])
    const {
        data: moralisData,
        isLoading,
        error,
    } = useMoralisQuery(
        'Mints',
        (query) => query.ascending('block_number').limit(500),
        []
    )

    useEffect(() => {
        const _data = moralisData.map((v) => {
            return {
                blockNumber: v.get('block_number'),
                from: v.get('from'),
                to: v.get('to'),
                tokenId: v.get('tokenId'),
                timeStamp: v.get('block_timestamp'),
            }
        })
        setData(_data)
        // fetchEventsData()
    }, [moralisData])

    return { data, isLoading, error }
}

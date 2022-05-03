/* eslint-disable no-unused-vars */
import { useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import AvatarDestinareAbi from '../../abi/AvatarDestinare.json'
import { useEffect } from 'react/cjs/react.development'

export const useFirst500MIntedNft = (tokenId) => {
    const [data, setData] = useState([])
    const { library } = useWeb3React()

    const fetchEventsData = useCallback(() => {
        const contract = new library.eth.Contract(
            AvatarDestinareAbi,
            process.env.REACT_APP_LAND_DESTINARE_CONTRACT_ADDRESS
        )
        contract
            .getPastEvents(
                'Transfer',
                {
                    filter: {
                        from: '0x0000000000000000000000000000000000000000',
                    },
                    fromBlock: 'earliest',
                    toBlock: '',
                },
                (err, events) => console.log('err', err, 'events', events)
            )
            .then((events) => {
                const newArr = events.slice(0, 500).map((v) => {
                    return {
                        from: v.returnValues.from,
                        to: v.returnValues.to,
                        tokenId: v.returnValues.tokenId,
                        blockNumber: v.blockNumber,
                        blockHash: v.blockHash,
                    }
                })

                setData(newArr)
            })
            .catch((err) => console.log(err))
    }, [library])
    console.log({ data })
    useEffect(() => {
        fetchEventsData()
    }, [])
}

import { useCallback, useEffect, useState } from 'react'
import useActiveWeb3React from './../useActiveWeb3React'
import { ethers } from 'ethers'
import { _useResolveCall } from './../utils/_useResolveCall'
import { useERC721LandContract } from './useContract'
import { ipfsReplaceUri } from './../../services/ipfs'
import { LAND_ADDRESS } from '../../constants/addressConstants'
import useRefresh from './../useRefresh'
import { profileReducerSelector } from '../../store/reducers/profile/selectors'
import { useSelector } from 'react-redux'
import { nftIdSelector } from './../../store/reducers/nftAvatars/selectors'

export const useMint = () => {
    const { account } = useActiveWeb3React()

    const erc721Contract = useERC721LandContract(LAND_ADDRESS)

    const mint = useCallback(async () => {
        if (account) {
            try {
                const tx = await erc721Contract.mint(account, 1, {
                    from: account,
                    value: ethers.utils.parseEther('0.09'),
                })

                const tokenId = await tx.wait().then((v) => {
                    return parseInt(Number(v.logs[0].topics[3]))
                })

                return tokenId
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }, [erc721Contract, account])

    return _useResolveCall(mint, null, {})
}

export const useClaimGenesis = () => {
    const { account } = useActiveWeb3React()
    const { avatar } = useSelector(profileReducerSelector)

    const erc721Contract = useERC721LandContract(LAND_ADDRESS)

    const claim = useCallback(async () => {
        if (account) {
            try {
                const tx = await erc721Contract.claimGenesisDrop(avatar)

                const tokenId = await tx.wait().then((v) => {
                    return parseInt(Number(v.logs[0].topics[3]))
                })

                return tokenId
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }, [erc721Contract, account, avatar])

    return _useResolveCall(claim, null, {})
}

export const useClaimSecondSeason = () => {
    const { account } = useActiveWeb3React()

    const erc721Contract = useERC721LandContract(LAND_ADDRESS)

    const claim = useCallback(
        async ({ tokendId1, tokenId2 }) => {
            if (account) {
                try {
                    const tx = await erc721Contract.claimSeasonTwoDrop(
                        tokendId1,
                        tokenId2
                    )

                    const tokenId = await tx.wait().then((v) => {
                        return parseInt(Number(v.logs[0].topics[3]))
                    })

                    return tokenId
                } catch (error) {
                    console.log(error)
                    throw error
                }
            }
        },
        [erc721Contract, account]
    )

    return _useResolveCall(claim, null, {})
}

export const useGetTotalSupply = () => {
    const { account } = useActiveWeb3React()
    const { fastRefresh } = useRefresh()

    const erc721Contract = useERC721LandContract(LAND_ADDRESS)

    const fetchTotalSupply = useCallback(async () => {
        if (account) {
            try {
                const totalSupply = await erc721Contract.totalSupply()

                return parseInt(Number(totalSupply))
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }, [erc721Contract, account])

    const { fetch, ...rest } = _useResolveCall(fetchTotalSupply, null, {})

    useEffect(() => {
        fetch()
    }, [fetch, fastRefresh])

    return { reload: fetch, ...rest }
}

export const useGetMaxSupply = () => {
    const { account } = useActiveWeb3React()

    const erc721Contract = useERC721LandContract(LAND_ADDRESS)

    const fetchMaxSupply = useCallback(async () => {
        if (account) {
            try {
                const maxSupply = await erc721Contract.maxSupply()

                return parseInt(Number(maxSupply))
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }, [erc721Contract, account])

    const { fetch, ...rest } = _useResolveCall(fetchMaxSupply, null, {})

    useEffect(() => {
        fetch()
    }, [fetch])

    return { reload: fetch, ...rest }
}

export const useDisableMint = () => {
    const [init, setInit] = useState(false)
    const { account } = useActiveWeb3React()
    const { fastRefresh } = useRefresh()
    const { avatar } = useSelector(profileReducerSelector)

    const erc721Contract = useERC721LandContract(LAND_ADDRESS)

    const fetchData = useCallback(async () => {
        if (account) {
            try {
                let disabled = false
                console.log('fetchData')
                if (avatar) {
                    const claimed = await erc721Contract.genesisClaim(avatar)
                    console.log(claimed)
                    disabled = claimed
                }

                const [totalSupply, maxSupply] = await Promise.all([
                    erc721Contract.totalSupply(),
                    erc721Contract.maxSupply(),
                ])

                return (
                    disabled ||
                    parseInt(Number(totalSupply)) ===
                        parseInt(Number(maxSupply))
                )
            } catch (error) {
                console.log('disableMint', error)
                throw error
            }
        }
    }, [erc721Contract, account, avatar])

    const { fetch, data, ...rest } = _useResolveCall(fetchData, true, {})

    useEffect(() => {
        if (!init || !data) {
            if (!init) setInit(true)
            fetch()
        }
    }, [fetch, fastRefresh, init])

    return { reload: fetchData, data, ...rest }
}

export const useUnClaimedNftsIdSecondSeason = () => {
    const [init, setInit] = useState(false)
    const { account } = useActiveWeb3React()
    const { fastRefresh } = useRefresh()
    const nftIds = useSelector(nftIdSelector)

    const erc721Contract = useERC721LandContract(LAND_ADDRESS)

    const fetchData = useCallback(async () => {
        if (account) {
            try {
                const validIds = []
                if (Array.isArray(nftIds)) {
                    for (let index = 0; index < nftIds.length; index++) {
                        const claimed = await erc721Contract.seasonTwoClaim(
                            nftIds[index]
                        )
                        if (!claimed)
                            validIds.push(Number(parseInt(nftIds[index])))
                    }
                }
                console.log({ validIds })
                return validIds
            } catch (error) {
                console.log('disableMint', error)
                throw error
            }
        }
    }, [erc721Contract, account, nftIds])

    const { fetch, data, ...rest } = _useResolveCall(fetchData, [], {})

    useEffect(() => {
        if (!init || !data) {
            if (!init) setInit(true)
            fetch()
        }
    }, [fetch, fastRefresh, init])

    return { reload: fetchData, data, ...rest }
}

export const useFetchNft = (tokenId) => {
    const erc721Contract = useERC721LandContract(LAND_ADDRESS)

    const fetchNft = useCallback(async () => {
        try {
            const tokenUri = await erc721Contract.tokenURI(tokenId)

            const uri = ipfsReplaceUri(tokenUri)

            const nft = await fetch(uri).then((res) => res.json())
            return { ...nft, image: ipfsReplaceUri(nft.image) }
        } catch (error) {
            console.log('Fetching Nft failed with error: ', error)
        }
    }, [erc721Contract, tokenId])

    return _useResolveCall(fetchNft, null, {})
}

export const useGetNft = (tokenId) => {
    const { account } = useActiveWeb3React()
    const { fetch, ...rest } = useFetchNft(tokenId)

    useEffect(() => {
        if (account && tokenId) {
            fetch()
        }
    }, [tokenId, account])
    return { fetch, ...rest }
}

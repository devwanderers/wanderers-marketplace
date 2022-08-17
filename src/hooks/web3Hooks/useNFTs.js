/* eslint-disable no-undef */
import { useCallback, useEffect, useState } from 'react'
import useActiveWeb3React from './../useActiveWeb3React'
import { ethers } from 'ethers'
import { _useResolveCall } from './../utils/_useResolveCall'
import {
    useERC721Contract,
    useERC721LandContract,
    useRewardsContract,
} from './useContract'
import { ipfsReplaceUri } from './../../services/ipfs'
import {
    LAND_ADDRESS,
    NFT_ADDRESS_GENESIS,
    REWARDS_ADDRESS,
} from '../../constants/addressConstants'
import useRefresh from './../useRefresh'
import { profileReducerSelector } from '../../store/reducers/profile/selectors'
import { useSelector } from 'react-redux'
import useDebounce from './../useDebounce'

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
                const [tokenId] = avatar.split('_')
                const tx = await erc721Contract.claimGenesisDrop(tokenId)

                const _tokenId = await tx.wait().then((v) => {
                    return parseInt(Number(v.logs[0].topics[3]))
                })

                return _tokenId
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
                if (avatar) {
                    const [tokenId, address] = avatar.split('_')

                    if (address !== NFT_ADDRESS_GENESIS) return true
                    const claimed = await erc721Contract.genesisClaim(tokenId)

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

    useDebounce(
        () => {
            if (init) {
                fetch()
            }
        },
        600,
        [avatar, init]
    )

    useEffect(() => {
        if (!init || !data) {
            if (!init) setInit(true)
            fetch()
        }
    }, [fetch, fastRefresh, init])

    return { reload: fetchData, data, ...rest }
}

export const useRevealCollection = () => {
    const [init, setInit] = useState(false)
    const { account } = useActiveWeb3React()
    const { fastRefresh } = useRefresh()

    const erc721Contract = useERC721Contract(LAND_ADDRESS)

    const fetchData = useCallback(async () => {
        if (account) {
            try {
                const isRevealed = await erc721Contract.revealed()

                return isRevealed
            } catch (error) {
                console.log('Error:', error)
                throw error
            }
        }
    }, [erc721Contract, account])

    const { fetch, data, ...rest } = _useResolveCall(fetchData, true, {})

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

export const useApproveNft = (tokenId) => {
    const { account } = useActiveWeb3React()

    const erc721Contract = useERC721LandContract(LAND_ADDRESS)

    const approve = useCallback(async () => {
        if (account) {
            try {
                const tx = await erc721Contract.approve(
                    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
                    '6'
                )

                const approved = await tx.wait()

                return approved
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }, [erc721Contract, account])

    return _useResolveCall(approve, null, {})
}

export const useClaimRewards = () => {
    const { account } = useActiveWeb3React()

    const erc721Contract = useRewardsContract(REWARDS_ADDRESS)

    const claim = useCallback(async () => {
        if (account) {
            try {
                const tx = await erc721Contract.claimNFTDropsByBalance(1, 1)

                const completed = await tx.wait()

                return completed
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }, [erc721Contract, account])

    return _useResolveCall(claim, null, {})
}

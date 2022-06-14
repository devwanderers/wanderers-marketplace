import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nftsSelector } from './../nftAvatars/selectors'
import * as actions from './actions'

import { profileReducerSelector } from './selectors'
import useDebounce from './../../../hooks/useDebounce'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React'
import { useNftAvatars } from '../nftAvatars/hooks'

const getAvatarName = (nft) => {
    return `${nft.tokenId}_${nft.address}`
}

export const useProfileReducer = () => {
    return useSelector(profileReducerSelector)
}

export const useSelectedAvatar = () => {
    const nfts = useNftAvatars()
    const { avatar } = useProfileReducer()

    return useMemo(() => {
        const nftIndex = nfts.findIndex((n) => getAvatarName(n) === avatar)

        return nftIndex !== -1
            ? { index: nftIndex, avatar: nfts[nftIndex] }
            : { index: null, avatar: null }
    }, [nfts, avatar])
}

export const useSaveAvatar = () => {
    const setProfile = useSetProfile()

    return useCallback(
        (avatar, cb) => {
            setProfile(
                {
                    avatar,
                },
                cb
            )
        },
        [setProfile]
    )
}

export const useSetProfile = () => {
    const { account } = useActiveWeb3React()
    const dispatch = useDispatch()

    return useCallback(
        async (data, cb = () => {}) => {
            await dispatch(
                actions.setProfile({
                    address: account,
                    ...data,
                })
            )
                .unwrap()
                .then(() => cb())
        },
        [account, dispatch]
    )
}

export const useSetAvatar = () => {
    const { avatar } = useProfileReducer()
    const [initialAvatar, setInitialAvatar] = useState(avatar)
    const saveAvatar = useSaveAvatar()
    const dispatch = useDispatch()

    useDebounce(
        () => {
            if (initialAvatar !== avatar && avatar) {
                saveAvatar(avatar, () => setInitialAvatar(avatar))
            }
        },
        2000,
        [avatar, initialAvatar]
    )

    return useCallback(
        (idAvatar) => {
            dispatch(actions.setAvatar(idAvatar))
        },
        [dispatch]
    )
}

export const useFetchProfile = () => {
    const { account } = useActiveWeb3React()
    const nfts = useSelector(nftsSelector)
    const dispatch = useDispatch()

    const fetchProfile = useCallback(async () => {
        dispatch(actions.getProfile(account)).then((res) => {
            if (
                res?.error &&
                res?.payload.message === "Profile doesn't exist"
            ) {
                const avatar =
                    nfts.length > 0
                        ? `${nfts[0].tokenId}_${nfts[0].address}`
                        : ''

                dispatch(
                    actions.setProfile({
                        address: account,
                        avatar,
                    })
                )
            }
            if (res?.payload?.profile) {
                const { avatar } = res.payload.profile
                const nftIndex = nfts.findIndex(
                    (n) => `${n.tokenId}_${n.address}` === avatar
                )

                if (nftIndex === -1 && nfts.length > 0) {
                    // Updating Selected NFT
                    dispatch(
                        actions.setProfile({
                            address: account,
                            avatar: `${nfts[0].tokenId}_${nfts[0].address}`,
                        })
                    )
                }
            }
        })
    }, [nfts, account, dispatch])

    useEffect(() => {
        if (account && nfts.length > 0) fetchProfile()
    }, [account, nfts])
}

export const useGetCode = () => {
    const { account } = useActiveWeb3React()
    const { code } = useSelector(profileReducerSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if (account) {
            dispatch(actions.getCode(account))
        }
    }, [account])

    const claimCode = useCallback(async () => {
        await dispatch(actions.getUnClaimedCode(account)).unwrap()
    }, [account])

    return { code, claimCode }
}

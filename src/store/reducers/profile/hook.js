import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nftsSelector } from './../nftAvatars/selectors'
import * as actions from './actions'
import { useWeb3React } from '@web3-react/core'
import { profileReducerSelector } from './selectors'
import useDebounce from './../../../hooks/useDebounce'

export const useSelectedAvatar = () => {
    const nfts = useSelector(nftsSelector)
    const { avatar } = useSelector(profileReducerSelector)
    const nftIndex = nfts.findIndex((n) => n.edition.toString() === avatar)

    return nftIndex !== -1
        ? { index: nftIndex, avatar: nfts[nftIndex] }
        : { index: null, avatar: null }
}

export const useSaveAvatar = () => {
    const { account } = useWeb3React()
    const dispatch = useDispatch()

    return useCallback(
        (idAvatar, cb) => {
            dispatch(
                actions.setProfile({
                    address: account,
                    avatar: idAvatar,
                })
            ).then(() => cb())
        },
        [dispatch]
    )
}

export const useSetAvatar = () => {
    const { avatar } = useSelector(profileReducerSelector)
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
    const { account } = useWeb3React()
    const nfts = useSelector(nftsSelector)
    const dispatch = useDispatch()

    const fetchProfile = useCallback(async () => {
        dispatch(actions.getProfile(account)).then((res) => {
            if (
                res?.error &&
                res?.payload.message === "Profile doesn't exist"
            ) {
                dispatch(
                    actions.setProfile({
                        address: account,
                        avatar: nfts[0].edition.toString(),
                    })
                )
            }
            if (res?.payload?.profile) {
                const { avatar } = res.payload.profile
                const nftIndex = nfts.findIndex(
                    (n) => n.edition.toString() === avatar
                )
                if (nftIndex === -1) {
                    // Updating Selected NFT
                    dispatch(
                        actions.setProfile({
                            address: account,
                            avatar: nfts[0].edition.toString(),
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

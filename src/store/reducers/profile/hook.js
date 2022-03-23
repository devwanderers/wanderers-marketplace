import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nftsSelector } from './../nftAvatars/selectors'
import * as actions from './actions'
import { useWeb3React } from '@web3-react/core'
import { profileReducerSelector } from './selectors'

export const useSelectedAvatar = () => {
    const nfts = useSelector(nftsSelector)
    const { avatar } = useSelector(profileReducerSelector)
    console.log({ avatar })
    const nftIndex = nfts.findIndex((n) => n.edition.toString() === avatar)

    return nftIndex !== -1 ? nfts[nftIndex] : null
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

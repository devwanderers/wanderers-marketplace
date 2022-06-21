/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useCallback } from 'react'
import { useNftAvatarReducer } from '../../store/reducers/nftAvatars/hooks'
import CardRewardTrip from '../Cards/CardRewardTrip'
import {
    useProfileReducer,
    useSetProfile,
} from '../../store/reducers/profile/hook'
import mysteryBox from '../../assets/images/utilities/mysterybox_1.gif'
import mysteryBox2 from '../../assets/images/utilities/mysterybox2.gif'
import luxepass from '../../assets/images/utilities/luxepass.gif'
import { NFT_ADDRESS_GENESIS } from './../../constants/addressConstants'
import { timeout } from '../../services/promises'
import windowOpen from './../../services/windowOpen'

const MisteryBoxSection = () => {
    const { nfts } = useNftAvatarReducer()
    const { revealed, secondRevealed } = useProfileReducer()
    const [{ misteryBox1L, misteryBox2L }, setLoading] = useState({
        misteryBox1L: false,
        misteryBox2L: false,
    })
    // const { code, claimCode } = useGetCode()

    const setProfile = useSetProfile()

    const totalNfts = useMemo(() => {
        if (!nfts) return 0
        return nfts.filter((v) => v.address === NFT_ADDRESS_GENESIS).length
    }, [nfts])

    const handleReveal = useCallback(async () => {
        setLoading((state) => ({ ...state, misteryBox1L: true }))
        await timeout(3000)
        try {
            await setProfile({ revealed: true })
        } catch (error) {
            console.log({ error })
        } finally {
            setLoading((state) => ({ ...state, misteryBox1L: false }))
        }
    }, [setProfile])

    const handleSecondReveal = useCallback(async () => {
        setLoading((state) => ({ ...state, misteryBox2L: true }))
        await timeout(3000)
        try {
            await setProfile({ secondRevealed: true })
        } catch (error) {
            console.log({ error })
        } finally {
            setLoading((state) => ({ ...state, misteryBox2L: false }))
        }
    }, [setProfile])

    return (
        <React.Fragment>
            {totalNfts > 0 && !revealed && (
                <CardRewardTrip
                    loading={misteryBox1L}
                    title={'???'}
                    image={mysteryBox}
                    onReveal={handleReveal}
                    hideTerms
                />
            )}

            {totalNfts > 0 && revealed && (
                <CardRewardTrip
                    title={'Luxe Pass'}
                    image={luxepass}
                    hideReveal
                    hideTerms
                />
            )}
            {totalNfts > 1 && !secondRevealed && (
                <CardRewardTrip
                    loading={misteryBox2L}
                    title={'???'}
                    image={mysteryBox2}
                    disableReveal
                    // onReveal={handleSecondReveal}
                    hideTerms
                />
            )}
        </React.Fragment>
    )
}

export default MisteryBoxSection

/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useCallback } from 'react'
import { useNftAvatarReducer } from '../../store/reducers/nftAvatars/hooks'
import CardRewardTrip from '../Cards/CardRewardTrip'
import {
    useProfileReducer,
    useSetProfile,
    useGetCode,
} from '../../store/reducers/profile/hook'
import mysteryBox from '../../assets/images/utilities/mysterybox_1.gif'
import complementaryTrip from '../../assets/images/utilities/complimentarytrip_1_1.gif'
import luxepass from '../../assets/images/utilities/luxepass.gif'
import { NFT_ADDRESS_GENESIS } from './../../constants/addressConstants'
import { timeout } from '../../services/promises'
import windowOpen from './../../services/windowOpen'

const MisteryBoxSection = () => {
    const { nfts } = useNftAvatarReducer()
    const { revealed } = useProfileReducer()
    const [loading, setLoading] = useState()
    const { code, claimCode } = useGetCode()

    const setProfile = useSetProfile()

    const totalNfts = useMemo(() => {
        if (!nfts) return 0
        return nfts.filter((v) => v.address === NFT_ADDRESS_GENESIS).length
    }, [nfts])

    const handleReveal = useCallback(async () => {
        setLoading(true)
        await timeout(3000)
        try {
            await setProfile({ revealed: true })
            await claimCode()
        } catch (error) {
            console.log({ error })
        } finally {
            setLoading(false)
        }
    }, [setProfile])

    return (
        <React.Fragment>
            {totalNfts > 0 && !revealed && (
                <CardRewardTrip
                    loading={loading}
                    title={'???'}
                    image={mysteryBox}
                    onReveal={handleReveal}
                    hideTerms
                />
            )}
            {totalNfts > 0 && revealed && (
                <CardRewardTrip
                    title={code?.code ?? ''}
                    image={complementaryTrip}
                    hideReveal
                    onReveal={() => setProfile({ revealed: true })}
                    onClickTerm={() => windowOpen('https://www.jugvi.com/')}
                />
            )}
            {totalNfts > 1 && revealed && (
                <CardRewardTrip
                    title={'Luxe Pass'}
                    image={luxepass}
                    hideReveal
                    hideTerms
                    onReveal={() => setProfile({ revealed: true })}
                />
            )}
        </React.Fragment>
    )
}

export default MisteryBoxSection

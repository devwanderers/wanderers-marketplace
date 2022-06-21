/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useCallback } from 'react'
import { useNftAvatarReducer } from '../../store/reducers/nftAvatars/hooks'
import CardRewardTrip from '../Cards/CardRewardTrip'
import {
    useProfileReducer,
    useSetProfile,
} from '../../store/reducers/profile/hook'
import mysteryBox from '../../assets/images/utilities/mysterybox_1.gif'
import mysteryBoxSilver from '../../assets/images/utilities/mystery box-silver_1.gif'
import mysteryBoxBronze from '../../assets/images/utilities/mystery box_bronze_1.gif'
import mysteryBoxGold from '../../assets/images/utilities/gold-mysterybox.gif'
import mysteryBox2 from '../../assets/images/utilities/mysterybox2.gif'
import mysteryNomad from '../../assets/images/utilities/MYSTERY-NOMAD.gif'
import mysteryDestination from '../../assets/images/utilities/mystery box-destination nft_1.gif'
import luxepass from '../../assets/images/utilities/luxepass.gif'
import { NFT_ADDRESS_GENESIS } from './../../constants/addressConstants'
import { timeout } from '../../services/promises'
import windowOpen from './../../services/windowOpen'

const mysteryBoxSection = () => {
    const { nfts } = useNftAvatarReducer()
    const { revealed, revealed2, revealed3, revealed4 } = useProfileReducer()
    const [
        { mysteryBox1L, mysteryBox2L, mysteryBox3L, mysteryBox4L },
        setLoading,
    ] = useState({
        mysteryBox1L: false,
        mysteryBox2L: false,
        mysteryBox3L: false,
        mysteryBox4L: false,
    })

    const setProfile = useSetProfile()

    const totalNfts = useMemo(() => {
        if (!nfts) return 0
        return nfts.filter((v) => v.address === NFT_ADDRESS_GENESIS).length
    }, [nfts])

    const handleReveal = useCallback(
        async (mysteryBox = 'revealed', loadingBox = 'mysteryBox1L') => {
            setLoading((state) => ({ ...state, [loadingBox]: true }))
            await timeout(3000)
            try {
                await setProfile({ [mysteryBox]: true })
            } catch (error) {
                console.log({ error })
            } finally {
                setLoading((state) => ({ ...state, [loadingBox]: false }))
            }
        },
        [setProfile]
    )

    const renderMysteryBox = () => {
        if (totalNfts > 10) {
            return !revealed4 ? (
                <CardRewardTrip
                    loading={mysteryBox4L}
                    title={'???'}
                    image={mysteryBoxGold}
                    onReveal={() => handleReveal('revealed4', 'mysteryBox4L')}
                    hideTerms
                />
            ) : (
                <React.Fragment>
                    <CardRewardTrip
                        title={'Free Destination'}
                        image={mysteryDestination}
                        hideReveal
                        hideTerms
                    />{' '}
                    <CardRewardTrip
                        title={'Free Destination'}
                        image={mysteryDestination}
                        hideReveal
                        hideTerms
                    />
                    <CardRewardTrip
                        title={'Free Nomadz Season 2'}
                        image={mysteryNomad}
                        hideReveal
                        hideTerms
                    />
                </React.Fragment>
            )
        }

        if (totalNfts > 4) {
            return !revealed3 ? (
                <CardRewardTrip
                    loading={mysteryBox3L}
                    title={'???'}
                    image={mysteryBoxSilver}
                    onReveal={() => handleReveal('revealed3', 'mysteryBox3L')}
                    hideTerms
                />
            ) : (
                <React.Fragment>
                    <CardRewardTrip
                        title={'Free Destination'}
                        image={mysteryDestination}
                        hideReveal
                        hideTerms
                    />
                    <CardRewardTrip
                        title={'Free Nomadz Season 2'}
                        image={mysteryNomad}
                        hideReveal
                        hideTerms
                    />
                </React.Fragment>
            )
        }

        if (totalNfts > 1) {
            return !revealed2 ? (
                <CardRewardTrip
                    loading={mysteryBox2L}
                    title={'???'}
                    image={mysteryBoxBronze}
                    onReveal={() => handleReveal('revealed2', 'mysteryBox2L')}
                    hideTerms
                />
            ) : (
                <CardRewardTrip
                    loading={mysteryBox2L}
                    title={'Free Destination'}
                    image={mysteryDestination}
                    hideReveal
                    hideTerms
                />
            )
        }
    }

    return (
        <React.Fragment>
            {totalNfts > 0 && !revealed && (
                <CardRewardTrip
                    loading={mysteryBox1L}
                    title={'???'}
                    image={mysteryBox}
                    onReveal={() => handleReveal()}
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
            {renderMysteryBox()}
        </React.Fragment>
    )
}

export default mysteryBoxSection

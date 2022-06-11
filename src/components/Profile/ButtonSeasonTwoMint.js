/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react'
import {
    useClaimSecondSeason,
    useUnClaimedNftsIdSecondSeason,
    useGetNft,
} from '../../hooks/web3Hooks/useNFTs'
import MintModal from '../Modals/MintModal'
import MintSeasonTwoModal from '../Modals/MintSeasonTwoModal'

const ButtonSeasonTwoMint = ({ onMintEnd }) => {
    const [{ mintConfirm, mintModal }, setVisible] = useState({
        mintModal: false,
        mintConfirm: false,
    })
    const { data: tokenIds, reload } = useUnClaimedNftsIdSecondSeason()
    const {
        fetch: claim,
        data: tokenId,
        isLoading: isMinting,
    } = useClaimSecondSeason()

    const handleMint = useCallback(
        async (tokendId1, tokenId2) => {
            handleVisible('mintModal')

            try {
                await claim({ params: { tokendId1, tokenId2 } })

                if (onMintEnd) onMintEnd()
            } catch (error) {
                console.log(error)
                handleVisible('mintModal')
            } finally {
                reload()
            }
        },
        [onMintEnd, claim]
    )

    const handleVisible = (modal) =>
        setVisible((state) => ({ ...state, [modal]: !state[modal] }))

    const { data, isLoading: isLoadingNft } = useGetNft(tokenId)

    const minting = useMemo(() => {
        return isMinting || isLoadingNft
    }, [isMinting, isLoadingNft])

    const disableMint = useMemo(() => {
        return tokenIds.length < 2
    }, [tokenIds])

    const nfts = useMemo(() => {
        if (data)
            return [
                {
                    tokenId,
                    nftData: { ...data },
                },
            ]
        return []
    }, [data, tokenId])

    return (
        <React.Fragment>
            <MintModal
                data={nfts}
                minting={minting}
                visibleModal={mintModal}
                onCloseModal={() => handleVisible('mintModal')}
            />
            <MintSeasonTwoModal
                tokenIds={tokenIds}
                visible={mintConfirm}
                onCancel={() => handleVisible('mintConfirm')}
                onOk={handleMint}
            />
            <div className="text-center w-full">
                <span className="text-primary font-semibold text-xl">
                    Second Season airdrops
                </span>
                <button
                    disabled={disableMint}
                    onClick={() => handleVisible('mintConfirm')}
                    className="bg-blue-6 rounded-md w-full  text-xl font-medium text-blue-5 disabled:opacity-40 mt-5"
                >
                    {disableMint
                        ? 'Already in your wallet'
                        : 'Send airdrop to your account'}
                </button>
            </div>
        </React.Fragment>
    )
}

export default ButtonSeasonTwoMint

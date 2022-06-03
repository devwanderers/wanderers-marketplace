import React, { useCallback, useMemo, useState } from 'react'
import {
    useClaimGenesis,
    useDisableMint,
    useGetNft,
} from '../../hooks/web3Hooks/useNFTs'
import MintModal from '../Modals/MintModal'

const ButtonMint = ({ onMintEnd }) => {
    const [visible, setVisible] = useState(false)
    const {
        fetch: claim,
        data: tokenId,
        isLoading: isMinting,
    } = useClaimGenesis()
    const { data: disableMint, reload } = useDisableMint()

    const handleMint = useCallback(async () => {
        setVisible(true)

        try {
            await claim()
            reload()
            if (onMintEnd) onMintEnd()
        } catch (error) {
            console.log(error)
            setVisible(false)
        }
    }, [onMintEnd, claim])

    const handleVisible = () => setVisible((state) => !state)

    const { data, isLoading: isLoadingNft } = useGetNft(tokenId)

    const minting = useMemo(() => {
        return isMinting || isLoadingNft
    }, [isMinting, isLoadingNft])

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
                visibleModal={visible}
                onCloseModal={() => handleVisible()}
            />
            <button
                disabled={disableMint}
                onClick={() => handleMint()}
                className="bg-blue-6 rounded-md w-full  text-xl font-medium text-blue-5 disabled:opacity-40"
            >
                Claim
            </button>
        </React.Fragment>
    )
}

export default ButtonMint

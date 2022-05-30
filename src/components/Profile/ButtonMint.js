import React, { useCallback, useMemo, useState } from 'react'
import {
    useDisableMint,
    useGetNft,
    useMint,
} from '../../hooks/web3Hooks/useNFTs'
import MintModal from '../Modals/MintModal'

const ButtonMint = ({ onMintEnd }) => {
    const [visible, setVisible] = useState(false)
    const { fetch: mint, data: tokenId, isLoading: isMinting } = useMint()
    const { data: disableMint } = useDisableMint()

    const handleMint = useCallback(async () => {
        setVisible(true)
        await mint()
            .then(() => {
                if (onMintEnd) onMintEnd()
            })
            .catch((err) => {
                console.log(err)
                setVisible(false)
            })
    }, [onMintEnd, mint])

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

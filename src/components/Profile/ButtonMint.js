import React, { useCallback, useMemo, useState } from 'react'
import { useGetNft, useMint } from '../../hooks/web3Hooks/useNFTs'
import MintModal from '../Modals/MintModal'

const ButtonMint = ({ onMintEnd }) => {
    const [visible, setVisible] = useState(false)
    const { fetch: mint, data: tokenId, isLoading: isMinting } = useMint()

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
    const _tokenId = 1
    const { data, isLoading: isLoadingNft } = useGetNft(_tokenId)

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
    }, [data])

    return (
        <React.Fragment>
            <MintModal
                data={nfts}
                minting={minting}
                visibleModal={visible}
                onCloseModal={() => handleVisible()}
            />
            <button
                onClick={() => handleMint()}
                className="bg-blue-6 rounded-md w-full  text-xl font-medium text-blue-5"
            >
                Claim
            </button>
        </React.Fragment>
    )
}

export default ButtonMint

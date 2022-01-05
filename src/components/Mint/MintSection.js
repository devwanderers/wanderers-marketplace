import React, { useState } from 'react'
import IncreaseDecreaseInput from '../Inputs/IncreaseDecreaseInput'
import { useWeb3React } from '@web3-react/core'
import useAuth from './../../hooks/useAuth'
// import { returnValueByScreenWidth } from '../../services/stylesServices'
import useResponsive from './../../hooks/useResponsive'
import {
    FrameCounterBottomSVG,
    FrameCounterTopSVG,
} from '../../assets/svg/frames'
import ModalMint from './ModalMint'
import { supportedChainIds } from './../../constants/chainNetworks'
import { setupNetwork } from './../../services/wallet'
import useSCInteractions from './../../hooks/useSCInteractions'
import useDeepCompareEffect from './../../hooks/useDeepCompareEffect'

const MintSection = (props) => {
    const { mintAvatar, mintData, minting, mintingError, resetError } =
        useSCInteractions()
    const { login, logout } = useAuth()
    const { account, chainId } = useWeb3React()
    const [mintAmount, setMintAmount] = useState(0)
    const [visibleModal, setVisibleModal] = useState(false)
    const [topPos] = useResponsive({
        base: '-6px',
        md: '-7px',
        lg: '-6px',
        xl: '-8px',
    })

    const handleShowMintModal = () => {
        setVisibleModal(!visibleModal)
    }

    const mint = () => {
        const validChainId = supportedChainIds.reduce((acc, val) => {
            if (!acc && val === chainId) return true
            return acc
        }, false)
        if (!validChainId) {
            setupNetwork()
        } else {
            handleShowMintModal()
            mintAvatar(mintAmount)
        }
    }

    useDeepCompareEffect(() => {
        if (!visibleModal) return
        if (mintingError) {
            resetError()
            handleShowMintModal()

            if (mintingError?.code !== 4001) {
                console.log({ mintingError })
            }
        }
    }, [visibleModal, mintingError])

    return (
        <React.Fragment>
            <ModalMint
                data={mintData}
                visibleModal={visibleModal}
                onCloseModal={handleShowMintModal}
                // mintAmount={mintAmount}
                minting={minting}
            />
            <div className="w-full md:w-8/12 lg:w-6/12 bg-black-1 bg-opacity-40 px-10 py-6 relative mx-auto lg:mx-0 mb-5">
                <div>
                    <div className="relative">
                        <div className="text-white">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-5xl leading-none">
                                    9,000
                                </span>
                                <span className="font-bold text-4xl leading-none">
                                    WANDERERS
                                </span>
                            </div>
                            <div className="text-2xl text-right">
                                <span className="leading-none">
                                    Price .06 ETH
                                </span>
                            </div>
                        </div>
                        <div className="text-white text-center w-4/5 m-auto">
                            <IncreaseDecreaseInput
                                onValueChange={(val) => {
                                    setMintAmount(val)
                                }}
                            ></IncreaseDecreaseInput>
                            <span className="text-xl">Max 15 mints per tx</span>
                        </div>
                        <div className="flex justify-center mt-4 space-x-3">
                            {!account ? (
                                <button
                                    onClick={() => login()}
                                    className="bg-info hover:bg-info focus:bg-info w-full text-white border-none text-xl py-1 "
                                    size="large"
                                >
                                    Connect
                                </button>
                            ) : (
                                <button
                                    onClick={() => logout()}
                                    className="bg-info hover:bg-info focus:bg-info w-full text-white border-none text-xl py-1"
                                    size="large"
                                >
                                    Disconnect
                                </button>
                            )}
                            <button
                                disabled={!account}
                                onClick={() => {
                                    mint()
                                }}
                                className="bg-primary hover:bg-primary py-1  w-full focus:bg-primary text-white border-none text-xl  disabled:opacity-75"
                                size="large"
                            >
                                Mint now
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute right-0 left-0 top-0"
                    style={{
                        top: topPos,
                    }}
                >
                    <FrameCounterTopSVG width="100%" />
                </div>
                <div
                    className="absolute right-0 left-0 "
                    style={{ bottom: '-2px' }}
                >
                    <FrameCounterBottomSVG width="100%" height="100%" />
                </div>
            </div>
        </React.Fragment>
    )
}

export default MintSection

/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, Button, Modal } from 'antd'
import ReactPlayer from 'react-player'
import { FrameNftTopSVG, FrameNftBottomSVG } from '../../assets/svg/frames'

import MintDisplay from './MintDisplay'
import utilitiesImages from './../../assets/images/utilities/index'
import useSCInteractions from './../../hooks/useSCInteractions'
import useDeepCompareEffect from './../../hooks/useDeepCompareEffect'
import useResponsive from './../../hooks/useResponsive'
import MintWaitingVideo from './MintWaitingVideo'
import useDebugInformation from './../../hooks/useDebugInformation'

const ModalMint = ({
    minting,
    data,
    visibleModal,
    mintAmount,
    onCloseModal,
    onEnded,
}) => {
    const [showVideo, setShowVideo] = useState(true)
    const [initMint, setInitMint] = useState(false)
    const [closable, setClosable] = useState(false)
    const [widthModal] = useResponsive({
        base: '90%',
        lg: '95%',
        xl: '1200px',
    })

    useDeepCompareEffect(() => {
        if (!visibleModal) {
            setShowVideo(true)
            setClosable(false)
        }
    }, [visibleModal])
    let content = showVideo ? (
        <MintWaitingVideo
            playing={visibleModal}
            minting={minting}
            onEnded={() => {
                console.log('end')
                setShowVideo(false)
                setClosable(true)
            }}
        />
    ) : (
        <MintDisplay data={data} />
    )
    if (!visibleModal) content = null

    return (
        <Modal
            centered
            closable={closable}
            visible={visibleModal}
            onCancel={onCloseModal}
            width={widthModal}
            maskClosable={false}
            footer={null}
        >
            {content}
        </Modal>
    )
}

export default ModalMint

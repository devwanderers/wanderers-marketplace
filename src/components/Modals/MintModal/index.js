/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Row, Col, Button, Modal } from 'antd'
import ReactPlayer from 'react-player'
import { FrameNftTopSVG, FrameNftBottomSVG } from '../../../assets/svg/frames'

import MintDisplay from './MintDisplay'
import utilitiesImages from '../../../assets/images/utilities/index'
import useDeepCompareEffect from '../../../hooks/useDeepCompareEffect'
import useResponsive from '../../../hooks/useResponsive'
import MintWaitingVideo from './MintWaitingVideo'
import useMediaQuery from './../../../hooks/useMediaQuery'

const MintModal = ({
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

    const isLg = useMediaQuery('(min-width: 1024px)')
    const isXL = useMediaQuery('(min-width: 1280px)')

    const widthModal = useMemo(() => {
        if (isXL) return '1200px'
        if (isLg) return '95%'
        return '90%'
    }, [isLg, isXL])

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

export default MintModal

/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import loadingVideo from '../../assets/images/utilities/LOADING-3D.mp4'
import useDeepCompareEffect from './../../hooks/useDeepCompareEffect'
import useOnScreen from './../../hooks/useOnScreen'

const MintWaitingVideo = ({ minting, onEnded }) => {
    const [playedVideo, setPlayed] = useState(0)
    const containerRef = useRef(null)
    const playerRef = useRef(null)
    const isVisible = useOnScreen(containerRef)

    const restartVideo = () => {
        playerRef.current.seekTo(0)
    }

    const handleLoop = () => {
        if (minting && playedVideo > 3) {
            restartVideo()
        }
    }
    const handleOnProgress = ({ playedSeconds }) => {
        setPlayed(playedSeconds)
    }

    useEffect(() => {
        handleLoop()
    }, [playedVideo])

    useDeepCompareEffect(() => {
        if (isVisible && playedVideo > 0) {
            restartVideo()
        }
    }, isVisible)

    return (
        <div ref={containerRef}>
            <ReactPlayer
                ref={playerRef}
                width="100%"
                height="100%"
                controls={false}
                playing={isVisible}
                url={loadingVideo}
                muted={true}
                onProgress={handleOnProgress}
                onError={(e) => console.log('error', e)}
                onEnded={() => {
                    onEnded()
                }}
            />
        </div>
    )
}

export default MintWaitingVideo

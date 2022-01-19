import { useState } from 'react'
import useEventListener from './useEventListener'

export default function useWindowSize() {
    const { innerWidth, innerHeight, screen } = window
    const [windowSize, setWindowSize] = useState({
        innerWidth,
        innerHeight,
        width: screen?.width,
        height: screen?.height,
    })

    useEventListener('resize', () => {
        const { innerWidth, innerHeight, screen } = window

        setWindowSize({
            innerWidth,
            innerHeight,
            width: screen?.width,
            height: screen?.height,
        })
    })

    return windowSize
}

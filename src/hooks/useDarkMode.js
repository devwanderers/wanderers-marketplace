import { useCallback } from 'react'
import useCookie from './useCookie'
import useDeepCompareEffect from './useDeepCompareEffect'

const useDarkMode = () => {
    const [themeMode, updateCookie] = useCookie('theme', 'light', {
        expires: 365 * 1000,
    })

    useDeepCompareEffect(() => {
        if (themeMode === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [themeMode])

    const switchDarkMode = useCallback(() => {
        console.log('Entro', themeMode)
        if (themeMode === 'light') {
            updateCookie('dark')
        } else {
            updateCookie('light')
        }
    })

    return [themeMode, switchDarkMode]
}

export default useDarkMode

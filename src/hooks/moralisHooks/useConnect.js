import { useEffect } from 'react'
import { useMoralis } from 'react-moralis'

const useConnect = () => {
    const { Moralis, isAuthenticated } = useMoralis()

    useEffect(() => {
        if (isAuthenticated) {
            Moralis.enableWeb3()
        }
    }, [isAuthenticated])
}

export default useConnect

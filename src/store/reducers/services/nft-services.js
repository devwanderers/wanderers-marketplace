export const nftTranformData = (nfts) => {
    return nfts.reduce((acc, n) => {
        const image = n.image.replace(
            /^ipfs?:\/\//,
            'https://nomadzland.mypinata.cloud/ipfs/'
        )
        return [...acc, { ...n, image }]
    }, [])
}

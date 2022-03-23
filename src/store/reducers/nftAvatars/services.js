export const nftTranformData = (nfts) => {
    return nfts.reduce((acc, n) => {
        const image = n.image.replace(
            /^ipfs?:\/\//,
            'https://wanderers.mypinata.cloud/ipfs/'
        )
        return [...acc, { ...n, image }]
    }, [])
}

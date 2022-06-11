export const supportedChainIds =
    process.env.NODE_ENV === 'development' ? [4] : [1]
console.log(supportedChainIds)

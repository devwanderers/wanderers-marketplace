import { createSelector } from 'reselect'

export const nftReducerSelector = createSelector(
    (state) => state.nfts,
    (nfts) => nfts
)

export const nftIdSelector = createSelector(
    nftReducerSelector,
    (nfts) => nfts.nftIds
)

export const nftsSelector = createSelector(
    nftReducerSelector,
    (nfts) => nfts.nfts
)

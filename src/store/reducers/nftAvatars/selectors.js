import { createSelector } from 'reselect'

export const nftAvatarsReducerSelector = createSelector(
    (state) => state.nftAvatars,
    (nftAvatars) => nftAvatars
)

export const nftIdSelector = createSelector(
    nftAvatarsReducerSelector,
    (nftAvatar) => nftAvatar.nftIds
)

export const nftsSelector = createSelector(
    nftAvatarsReducerSelector,
    (nftAvatar) => nftAvatar.nfts
)

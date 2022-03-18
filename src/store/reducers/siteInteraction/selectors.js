import { createSelector } from 'reselect'

export const siteInteractionSelector = createSelector(
    (state) => state.siteInteraction,
    (siteInteractionReducer) => siteInteractionReducer
)

export const visibleWalletDrawerSelector = createSelector(
    siteInteractionSelector,
    (siteInteraction) => siteInteraction.visibleWalletDrawer
)

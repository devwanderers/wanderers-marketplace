import { createSelector } from 'reselect'

export const secondSeasonClaimSelector = createSelector(
    (state) => state.secondSeasonClaim,
    (secondSeasonClaim) => secondSeasonClaim
)

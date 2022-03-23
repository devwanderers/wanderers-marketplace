import { createSelector } from 'reselect'

export const profileReducerSelector = createSelector(
    (state) => state.profile,
    (profile) => profile
)

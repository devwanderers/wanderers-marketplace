import { createSelector } from 'reselect'

export const scInteractionReducerSelector = createSelector(
    (state) => state.scInteraction,
    (scInteraction) => scInteraction
)

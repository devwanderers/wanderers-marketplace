import { createSelector } from 'reselect'

export const placesReducerSelector = createSelector(
    (state) => state.places,
    (places) => places
)

export const getAllCountriesSelector = createSelector(
    placesReducerSelector,
    (places) => places.allCountries
)

export const countriesSelector = createSelector(
    placesReducerSelector,
    (places) => places
)

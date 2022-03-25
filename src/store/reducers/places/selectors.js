import { createSelector } from 'reselect'

export const placesReducerSelector = createSelector(
    (state) => state.places,
    (places) => places
)

export const countriesSelector = createSelector(
    placesReducerSelector,
    (places) => {
        const countries = places.countries
        const _places = places.places
        const countriesArray = Object.keys(countries).reduce((acc, c) => {
            return [...acc, { key: c, ...countries[c] }]
        }, [])
        return { countries, countriesArray, places: _places }
    }
)

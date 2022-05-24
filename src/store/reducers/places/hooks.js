/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLandNfts } from '../nfts/hooks'
import * as actions from './actions'
import {
    countriesSelector,
    placesReducerSelector,
    getAllCountriesSelector,
} from './selectors'

export const usePlaceReducer = () => {
    return useSelector(placesReducerSelector)
}

export const useCountrieSelector = () => {
    const countries = useSelector(countriesSelector)

    return useMemo(() => {
        const _countries = countries.countries
        const _places = countries.places

        const countriesArray = Object.keys(countries).reduce((acc, c) => {
            return [...acc, { key: c, ...countries[c] }]
        }, [])
        return { countries: _countries, countriesArray, places: _places }
    }, [countries])
}

export const useFetchCountries = () => {
    const nfts = useLandNfts()

    const dispatch = useDispatch()
    const { countries, countriesArray, places } = useSelector(countriesSelector)

    const fetchCountries = useCallback(async () => {
        const nftPlacesNames = nfts.reduce(
            (acc, n) => [...acc, n.attributes[0].value],
            []
        )
        dispatch(actions.getContry(nftPlacesNames))
    }, [nfts, dispatch])

    useEffect(() => {
        if (nfts.length > 0) fetchCountries()
    }, [nfts])

    return { countries, countriesArray, places }
}

export const useFetchPlaceSelected = (place) => {
    const { selectedPlace } = usePlaceReducer()

    const dispatch = useDispatch()
    useEffect(() => {
        if (place) dispatch(actions.getPlace(place))
    }, [place])
    return selectedPlace
}

export const useFetchAllCountries = () => {
    const countries = useSelector(getAllCountriesSelector)
    const dispatch = useDispatch()

    const fetchAllCountries = useCallback(() => {
        dispatch(actions.getAllCountries())
    }, [])

    useEffect(() => {
        fetchAllCountries()
    }, [])

    return countries
}

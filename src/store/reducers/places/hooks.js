/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLandNfts } from '../nfts/hooks'
import * as actions from './actions'
import { _useResolveCall } from './../../../hooks/utils/_useResolveCall'
import { placesReducerSelector, getAllCountriesSelector } from './selectors'

export const usePlaceReducer = () => {
    return useSelector(placesReducerSelector)
}

export const useCountrieSelector = () => {
    const countries = useSelector(placesReducerSelector)

    return useMemo(() => {
        const _countries = countries.countries
        const _places = countries.places

        const countriesArray = Object.keys(_countries).reduce((acc, c) => {
            return [...acc, { key: c, ..._countries[c] }]
        }, [])
        return { countries: _countries, countriesArray, places: _places }
    }, [countries])
}

export const useFetchCountries = () => {
    const nfts = useLandNfts()

    const dispatch = useDispatch()
    const { countries, countriesArray, places } = useCountrieSelector()

    const fetchCountries = useCallback(async () => {
        const nftPlacesNames = nfts.reduce(
            (acc, n) => [...acc, n.attributes[1]?.value],
            []
        )

        dispatch(actions.getContry(nftPlacesNames))
    }, [nfts, dispatch])

    useEffect(() => {
        if (nfts.length > 0) fetchCountries()
    }, [nfts])

    return { countries, countriesArray, places }
}

export const useFetchPlaceSelected = (place, country) => {
    const { selectedPlace } = usePlaceReducer()
    const dispatch = useDispatch()

    useEffect(() => {
        if (place && country) dispatch(actions.getPlace({ place, country }))
    }, [place])

    return selectedPlace
}

export const useFetchAllCountries = () => {
    const countries = useSelector(getAllCountriesSelector)
    const dispatch = useDispatch()

    const fetchAllCountries = useCallback(() => {
        dispatch(actions.getAllCountries())
    }, [dispatch])

    useEffect(() => {
        fetchAllCountries()
    }, [])

    return countries
}

export const useUpdateCountry = () => {
    const dispatch = useDispatch()

    const updateCountry = useCallback(
        async (countryId) => {
            try {
                return await dispatch(actions.updateCountry(countryId))
                    .unwrap()
                    .then((r) => {
                        console.log({ r })
                    })
            } catch (error) {
                console.log({ error })
                throw error
            }
        },
        [dispatch]
    )

    const { fetch, ...rest } = _useResolveCall(updateCountry)

    return { updateCountry: fetch, ...rest }
}

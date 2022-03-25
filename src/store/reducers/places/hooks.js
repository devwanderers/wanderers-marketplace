/* eslint-disable no-unused-vars */
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLandNfts } from '../nfts/hooks'
import * as actions from './actions'
import { countriesSelector, placesReducerSelector } from './selectors'

export const usePlaceReducer = () => {
    return useSelector(placesReducerSelector)
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

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
    const { countries, countriesArray } = useSelector(countriesSelector)

    const fetchCountries = useCallback(async () => {
        console.log({ nfts })
        const nftPlacesNames = nfts.reduce(
            (acc, n) => [...acc, n.attributes[0].value],
            []
        )
        console.log({ nftPlacesNames })
        // dispatch(actions.fetchCountries.pending())
        dispatch(actions.getContry(nftPlacesNames))

        // Promise.all(promises)
        //     .then(() => {
        //         dispatch(actions.fetchCountries.fulfilled())
        //     })
        //     .catch((err) => dispatch(actions.fetchCountries.rejected(err)))
    }, [nfts, dispatch])

    useEffect(() => {
        fetchCountries()
    }, [nfts])

    return { countries, countriesArray }
}

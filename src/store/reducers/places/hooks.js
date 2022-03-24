import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from './actions'
import { countriesSelector, placesReducerSelector } from './selectors'

export const usePlaceReducer = () => {
    return useSelector(placesReducerSelector)
}

export const useFetchCountries = () => {
    const dummyIds = ['Spain', 'France', 'United State of America']
    const dispatch = useDispatch()
    const { countries, countriesArray } = useSelector(countriesSelector)

    const fetchCountries = useCallback(async () => {
        dispatch(actions.fetchCountries.pending())
        const promises = dummyIds.reduce((acc, name) => {
            return [...acc, dispatch(actions.getContry(name))]
        }, [])
        Promise.all(promises)
            .then(() => {
                dispatch(actions.fetchCountries.fulfilled())
            })
            .catch((err) => dispatch(actions.fetchCountries.rejected(err)))
    }, [dispatch])

    useEffect(() => {
        fetchCountries()
    }, [])

    return { countries, countriesArray }
}

/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import EditMarker from '../components/EditMarker/EditMarker'
import GlobeFiber from '../components/GlobeFiber'
import {
    useFetchAllCountries,
    useUpdateCountry,
} from './../store/reducers/places/hooks'
import useDebounce from './../hooks/useDebounce'
import { createVector3 } from './../utils/three.utils'

const EditMarkers = (props) => {
    const globe = useRef()
    const [{ markers, selectedMarker, indexMarker }, setMarkers] = useState({
        markers: [],
        selectedMarker: null,
        indexMarker: 0,
    })

    const [initialize, setInitialize] = useState(false)
    const [reload, setReload] = useState(false)
    const countries = useFetchAllCountries()
    const { updateCountry, data, isLoading, error } = useUpdateCountry()

    // Fetch countries
    // Remove countries used by others makers except current marker

    const handleAddMarker = useCallback(
        (marker) => {
            if (countries.length === 0) return
            setReload(true)
            const newMarker = { ...marker, id: `marker-${indexMarker}` }
            setMarkers((state) => ({
                ...state,
                markers: [...state.markers, newMarker],
                selectedMarker: newMarker,
                indexMarker: indexMarker + 1,
            }))
            globe.current.startCameraTransitionToMaker(marker)
        },
        [indexMarker, countries]
    )

    const handleSelectMarker = useCallback((marker) => {
        console.log('selected', { marker })
        setReload(true)
        setMarkers((state) => ({ ...state, selectedMarker: marker }))
        globe.current.startCameraTransitionToMaker(marker)
    }, [])

    const handleSaveCountry = useCallback(
        async (countryId) => {
            const index = markers.findIndex((v) => v.id === selectedMarker.id)
            const country = countries.find((v) => v._id === countryId)

            const markerUpdated = {
                ...selectedMarker,
                data: {
                    id: countryId,
                    country: country.name,
                    image: `https://terramint.fra1.digitaloceanspaces.com/${country.image}`,
                },
            }
            try {
                const { x, y, z } = selectedMarker.point
                if (Object.keys(selectedMarker.data).length > 0) {
                    await updateCountry({
                        params: {
                            countryId: selectedMarker.data.id,
                            body: { xyz: [] },
                        },
                    })
                }
                await updateCountry({
                    params: {
                        countryId: country._id,
                        body: { xyz: [x, y, z] },
                    },
                })

                setMarkers((s) => {
                    return {
                        ...s,
                        markers: [
                            ...s.markers.slice(0, index),
                            markerUpdated,
                            ...s.markers.slice(index + 1, s.markers.length),
                        ],
                        selectedMarker: markerUpdated,
                    }
                })
                setTimeout(() => {
                    globe.current.reloadInitialState()
                }, 400)
            } catch (error) {
                console.log({ error })
            }
        },
        [selectedMarker, countries, markers]
    )

    const handleRemove = useCallback(async () => {
        const index = markers.findIndex((v) => v.id === selectedMarker.id)

        try {
            await updateCountry({
                params: {
                    countryId: selectedMarker.data.id,
                    body: { xyz: [] },
                },
            })
            setMarkers((s) => {
                return {
                    ...s,
                    markers: [
                        ...s.markers.slice(0, index),
                        ...s.markers.slice(index + 1, s.markers.length),
                    ],
                    selectedMarker: { ...s.selectedMarker, data: {} },
                }
            })
            setTimeout(() => {
                globe.current.loadInitialState()
            }, 400)
        } catch (error) {
            console.log({ error })
        }
    }, [selectedMarker, markers])

    useDebounce(
        () => {
            if (reload) setReload(false)
        },
        600,
        [selectedMarker, reload]
    )

    useEffect(() => {
        if (Array.isArray(countries) && countries.length > 0 && !initialize) {
            setInitialize(true)
            let index = 0

            console.log({ countries })
            const dC = countries.reduce((acc, v) => {
                if (!v?.xyz || v?.xyz.length === 0) return acc
                const [x, y, z] = v.xyz
                const id = `marker-${index}`
                index = index + 1
                return [
                    ...acc,
                    {
                        id,
                        point: createVector3(x, y, z),
                        data: {
                            id: v._id,
                            country: v.name,
                            image: `https://terramint.fra1.digitaloceanspaces.com/${v.image}`,
                        },
                    },
                ]
            }, [])

            setMarkers((state) => ({
                ...state,
                selectedMarker: null,
                markers: dC,
                indexMarker: index,
            }))
        }
    }, [countries, initialize])

    const _countries = useMemo(() => {
        if (!countries) return []
        const dM = markers.reduce((acc, v) => {
            if (!v?.data?.id || selectedMarker?.data?.id !== v?.data?.id)
                return acc
            return {
                ...acc,
                [v.data.id]: { id: [v.data.id], country: [v.data.country] },
            }
        }, {})
        const dC = countries.reduce((acc, v) => {
            const index = markers.findIndex((m) => v._id === m?.data?.id)
            if (
                (v?.xyz &&
                    v?.xyz.length > 0 &&
                    selectedMarker?.data?.id !== v._id) ||
                (index !== -1 && selectedMarker?.data?.id !== v._id)
            )
                return acc

            return { ...acc, [v._id]: { id: v._id, country: v.name } }
        }, {})

        const mixing = { ...dC, ...dM }

        return Object.keys(mixing).map((v) => mixing[v])
    }, [countries, markers, selectedMarker])

    return (
        <div className="w-full relative flex flex-row">
            <div className="relative w-8/12 h-full bg-black-1">
                <GlobeFiber
                    ref={globe}
                    edit
                    enableRotation={false}
                    markers={markers}
                    onAddMarker={handleAddMarker}
                    onSelectMarker={handleSelectMarker}
                />
            </div>
            <div className="relative h-full w-4/12">
                {!reload && countries?.length > 0 && (
                    <EditMarker
                        isLoading={isLoading}
                        markers={markers}
                        marker={selectedMarker}
                        countries={_countries}
                        onHandleSelectMaker={handleSelectMarker}
                        onSave={handleSaveCountry}
                        onRemove={handleRemove}
                    />
                )}
            </div>
        </div>
    )
}

export default EditMarkers

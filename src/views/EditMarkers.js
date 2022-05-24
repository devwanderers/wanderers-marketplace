/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import EditMarker from '../components/EditMarker/EditMarker'
import GlobeFiber from '../components/GlobeFiber'
import { useFetchAllCountries } from './../store/reducers/places/hooks'
import useDebounce from './../hooks/useDebounce'
import { createVector3 } from './../utils/three.utils'

const EditMarkers = (props) => {
    const globe = useRef()
    const [{ markers, selectedMarker }, setMarkers] = useState({
        markers: [],
        selectedMarker: null,
    })

    const [reload, setReload] = useState(false)
    const countries = useFetchAllCountries()

    // Fetch countries
    // Remove countries used by others makers except current marker

    const handleAddMarker = useCallback((marker) => {
        setReload(true)
        setMarkers((state) => ({
            ...state,
            markers: [...state.markers, marker],
            selectedMarker: marker,
        }))
        globe.current.startCameraTransitionToMaker(marker)
    }, [])

    const handleSelectMarker = useCallback((marker) => {
        console.log('selected', { marker })
        setReload(true)
        setMarkers((state) => ({ ...state, selectedMarker: marker }))
        globe.current.startCameraTransitionToMaker(marker)
    }, [])

    const handleSaveCountry = useCallback(
        (countryId) => {
            const index = markers.findIndex((v) => v.id === selectedMarker.id)
            const country = countries.find((v) => v._id === countryId)

            const markerUpdated = {
                ...selectedMarker,
                data: {
                    id: country._id,
                    country: country.name,
                    image: `https://terramint.fra1.digitaloceanspaces.com/${country.image}`,
                },
            }

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
        },
        [selectedMarker, countries, markers]
    )

    const handleRemove = useCallback(() => {
        const index = markers.findIndex((v) => v.id === selectedMarker.id)

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
    }, [selectedMarker, markers])

    useDebounce(
        () => {
            if (reload) setReload(false)
        },
        600,
        [selectedMarker, reload]
    )

    useEffect(() => {
        if (Array.isArray(countries)) {
            const dC = countries.reduce((acc, v, index) => {
                if (!v?.xyz || v?.xyz.length === 0) return acc
                const [x, y, z] = v.xyz
                const id = `marker-${index}`
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

            console.log({ dC })
            setMarkers((state) => ({
                ...state,
                selectedMarker: null,
                markers: dC,
            }))
        }
    }, [countries])

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

    console.log({ selectedMarker, markers, _countries, reload, countries })

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

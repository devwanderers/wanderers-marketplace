/* eslint-disable no-unused-vars */
/* eslint-disable no-loss-of-precision */
import React, { useRef, useState, useEffect, useMemo } from 'react'
// import GlobeComponent from './../components/GlobeComponent/index'
// import useResponsive from './../hooks/useResponsive'
import useEventListener from './../hooks/useEventListener'
import useEffectOnce from './../hooks/useEffectOnce'
import { AutoComplete, Input, Select, Button, Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { filterSearch } from './../services/filters'
import { FrameTopSVG, FrameBottomSVG } from '../assets/svg/frames'
import { AnimatePresence, motion } from 'framer-motion'
import CardNftMarket from '../components/Cards/CardNftMarket'
// import { FrameBottomSVG } from './../assets/svg/frames/index'
import { landColors } from './../assets/images/lands/colors/index'
import { landsImages } from './../assets/images/lands/'
import places from './../assets/images/places'
import nfts from '../assets/images/nfts'
import Tabs, { TabPane } from '../components/Tabs/Tabs'
// import { lands, roles } from './../constants/nftsDummy'
import {
    useFetchCountries,
    useFetchPlaces,
    usePlaceReducer,
} from './../store/reducers/places/hooks'
import { useGetLands } from '../store/reducers/nfts/hooks'
import utilitiesImages from './../assets/images/utilities/index'
import GlobeFiber from '../components/GlobeFiber'
import useDebounce from '../hooks/useDebounce'

const MarketView = () => {
    const globeContainerRef = useRef(null)
    const globeRef = useRef(null)
    const searchButtonRef = useRef(null)
    const [globeSizes, setGlobalSizes] = useState({ width: 0, height: 0 })

    const [markers, setMarkers] = useState([])

    // useEffectOnce(() => {
    //     setGlobalSizes({
    //         width: globeContainerRef.current.clientWidth,
    //         height: globeContainerRef.current.clientHeight,
    //     })
    // })

    // useEventListener('resize', () => {
    //     setGlobalSizes({
    //         width: globeContainerRef.current.clientWidth,
    //         height: globeContainerRef.current.clientHeight,
    //     })
    // })

    const { data: nfts } = useGetLands()
    const { countries, countriesArray, places } = useFetchCountries()
    const {
        fetch: { requestCountries },
    } = usePlaceReducer()
    // const [lands, setLands] = useState([])
    const [marker, setMarker] = useState()
    const [searchText, setSearchText] = useState()
    const [selectedText, setSelected] = useState()

    const lands = useMemo(() => {
        if (!requestCountries && nfts.length === 0) return []

        return nfts.map((v) => {
            const place = v.attributes[0].value
            return {
                id: v.tokenId,
                title: v.attributes[0].value,
                nft: v.image,
                country:
                    !requestCountries && nfts.length > 0
                        ? ''
                        : places[place]?.country,
            }
        })
    }, [requestCountries, places, nfts])

    // const markers = useMemo(() => {
    //     return countriesArray.map(({ name, xyz, image }) => ({
    //         coordinates: {
    //             x: xyz[0],
    //             y: xyz[1],
    //             z: xyz[2],
    //         },
    //         label: name,
    //         image,
    //     }))
    // }, [countriesArray])

    const handleOnChangeSelect = (id) => {
        console.log({ id })
        const marker = markers.find((m) => m.id === id)
        console.log({ marker })
        setSelected(marker.id)
        setSearchText(marker.id)

        globeRef.current.startCameraTransitionToMaker(marker)
    }

    const handleOnChangeSelectAuto = (id) => {
        const marker = markers.find((m) => m.id === id)

        setSelected(marker.id)
        setSearchText(marker.id)
    }

    const handleOnClickMarker = (marker) => {
        setSelected(marker.id)
        setSearchText(marker.id)
    }

    const handleOnSearch = (value) => {
        setSearchText(value)
    }

    const onKeyDown = (e) => {
        if (e.code === 'Enter' && selectedText) {
            searchButtonRef.current.focus()
        }
    }

    const onClick = () => {
        if (selectedText) {
            const marker = markers.find((m) => m.id === selectedText)
            globeRef.current.startCameraTransitionToMaker(marker)
        } else if (searchText === '') {
            setSelected('')
        }
    }

    const onClear = () => {
        setSelected('')
        globeRef.current.resetOrbit()
    }

    // const filter = selectedText
    //     ? lands.filter((l) => l.country === selectedText)
    //     : lands

    const filter = useMemo(() => {
        const marker = markers.find((v) => v.id === selectedText)
        return selectedText && marker
            ? lands.filter((l) => l.country === marker.data?.country)
            : lands
    }, [markers])

    const options = useMemo(() => {
        return markers.reduce(
            (acc, m, key) => [...acc, { label: m.id, value: m.id }],
            []
        )
    }, [markers])

    const optionsFilter = useMemo(
        () => filterSearch(searchText, options),
        [searchText, options]
    )

    useDebounce(
        () => {
            if (setSelected === '') globeRef.current.resetOrbit()
        },
        600,
        [setSelected]
    )

    return (
        <div className="w-full bg-blue-4 relative">
            <div
                ref={globeContainerRef}
                className="w-full m-auto relative overflow-hidden"
                style={{ height: '650px' }}
            >
                <React.Suspense fallback={null}>
                    <GlobeFiber
                        ref={globeRef}
                        initialData={[]}
                        // enableRotation={false}
                        onMarkersChange={(markers) => setMarkers(markers)}
                    />
                </React.Suspense>
                {/* {lands.length > 0 ? (
                    <GlobeComponent
                        ref={globeRef}
                        data={markers}
                        width={window.innerWidth}
                        height={650}
                        // disabledRotation
                        // mode={'addMarker'}
                        // onAddMarker={(marker) => {
                        //     console.log({ marker })
                        //     setMarkers([...markers, { ...marker, label: '' }])
                        // }}
                        onClickMarker={handleOnClickMarker}
                    />
                ) : (
                    <div
                        className="w-full h-full "
                        style={{ backgroundColor: '#070f21' }}
                    >
                        <img
                            className="w-auto h-full mx-auto"
                            src={utilitiesImages.eLoading}
                            alt={utilitiesImages.eLoading}
                        />
                    </div>
                )} */}
                <div className="absolute bottom-0 w-full mb-5">
                    <div
                        className="relative flex justify-center items-center m-auto w-10/12 md:w-8/12 lg:w-6/12 2xl:w-4/12"
                        // style={{ maxWidth: '750px' }}
                    >
                        <Input.Group>
                            <Row className="border border-aqua-3 rounded-lg bg-blue-2">
                                <Col
                                    xs={4}
                                    className="bg-blue-3 border border-aqua-3 rounded-l-lg "
                                >
                                    <Select
                                        className="w-full ant-selector-border-0 ant-selector-custom bg-blue-3 text-blue-9"
                                        size="large"
                                        value={selectedText}
                                        onChange={handleOnChangeSelect}
                                    >
                                        {options.map((d) => (
                                            <Select.Option
                                                key={d.value}
                                                value={d.label}
                                            >
                                                {d.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Col>
                                <Col xs={16} className="border-r border-aqua-3">
                                    <AutoComplete
                                        options={optionsFilter}
                                        className="auto-complete-custom absolute h-full ant-select-h-full"
                                        dropdownClassName=""
                                        onSearch={handleOnSearch}
                                        onSelect={handleOnChangeSelectAuto}
                                        style={{ width: '100%' }}
                                        onKeyDown={onKeyDown}
                                        // onKeyUp={onKeyUpAuto}
                                        value={searchText}
                                        onClear={onClear}
                                        allowClear
                                    >
                                        <input
                                            // className="w-6/12"
                                            className="h-full w-full bg-transparent border-0 text-blue-9 pl-5 focus:border-none rounded-none "
                                            size="large"
                                        />
                                    </AutoComplete>
                                </Col>
                                <Col xs={4}>
                                    <button
                                        ref={searchButtonRef}
                                        className="h-full w-full rounded-r-full bg-transparent border-0 text-blue-9"
                                        size="large"
                                        onKeyDown={onKeyDown}
                                        onClick={onClick}
                                        // onKeyUp={onKeyUp}
                                    >
                                        <SearchOutlined />
                                    </button>
                                </Col>
                            </Row>
                        </Input.Group>
                    </div>
                </div>
            </div>
            <div className="">
                {/* <div className=" max-w-1800px mx-auto"></div> */}
                <Tabs
                    tabContainerClassName="max-w-1280px mx-auto px-6 2xl:px-16"
                    panelContainerClassName="py-16 bg-blue-4 "
                >
                    <TabPane
                        tab="Destinations"
                        className="max-w-1280px px-6 2xl:px-16"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                            {filter.map((f, index) => {
                                return (
                                    <div key={`${f.id}-${f.title}`}>
                                        <CardNftMarket
                                            id={f.id}
                                            nft={f.nft}
                                            title={f.title}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default MarketView

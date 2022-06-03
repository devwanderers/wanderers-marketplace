/* eslint-disable no-loss-of-precision */
import React, { useRef, useState, useMemo } from 'react'
import { AutoComplete, Input, Select, Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { filterSearch } from './../services/filters'
import CardNftMarket from '../components/Cards/CardNftMarket'
import Tabs, { TabPane } from '../components/Tabs/Tabs'
// import { lands, roles } from './../constants/nftsDummy'
import {
    useFetchCountries,
    usePlaceReducer,
} from './../store/reducers/places/hooks'
import { useFetchNftLands } from '../store/reducers/nfts/hooks'
import GlobeFiber from '../components/GlobeFiber'
import useDebounce from '../hooks/useDebounce'
import { createVector3 } from '../utils/three.utils'

const MarketView = () => {
    const globeContainerRef = useRef(null)
    const globeRef = useRef(null)
    const searchButtonRef = useRef(null)

    const { nfts } = useFetchNftLands()
    const { places, countriesArray } = useFetchCountries()
    console.log({ places })
    const {
        fetch: { requestCountries },
    } = usePlaceReducer()
    const [searchText, setSearchText] = useState()
    const [selectedText, setSelected] = useState()

    const markers = useMemo(() => {
        if (!countriesArray) return []
        return countriesArray.map((v, index) => {
            const {
                xyz: [x, y, z],
                name,
            } = v
            const id = `marker-${index}-${name}`
            return {
                id,
                point: createVector3(x, y, z),
                data: {
                    id: v._id,
                    country: name,
                    image: `https://terramint.fra1.digitaloceanspaces.com/${v.image}`,
                },
            }
        })
    }, [countriesArray])

    const lands = useMemo(() => {
        if (!requestCountries && nfts.length === 0) return []
        return nfts.map((v) => {
            const place = v.attributes[0]?.value
            return {
                id: v.tokenId,
                title: v.attributes[0].value,
                nft: v.image,
                country: !place ? '' : places[place]?.country,
            }
        })
    }, [requestCountries, places, nfts])

    const handleOnChangeSelect = (id) => {
        const marker = markers.find((m) => m.id === id)
        setSelected(marker.id)
        setSearchText(marker.data.country)
        globeRef.current.startCameraTransitionToMaker(marker)
    }

    const handleOnClickMarker = (marker) => {
        setSelected(marker.id)
        setSearchText(marker.data.country)
    }

    const handleOnSearch = (value) => {
        setSearchText(value)
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13 && selectedText) {
            searchButtonRef.current.focus()
        }
    }

    const onKeyUp = (e) => {
        if (e.code === 'Enter') {
            if (searchText === '') {
                setSelected(undefined)

                globeRef.current.resetOrbit()
            } else if (selectedText) {
                const marker = markers.find((m) => m.id === selectedText)
                globeRef.current.startCameraTransitionToMaker(marker)
            }
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

    const filter = useMemo(() => {
        const marker = markers.find((v) => v.id === selectedText)
        return selectedText && marker
            ? lands.filter((l) => l.country === marker.data?.country)
            : lands
    }, [markers, lands, selectedText])

    const options = useMemo(() => {
        return markers.reduce(
            (acc, m, key) => [...acc, { id: m.id, label: m?.data.country }],
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
                        markers={markers}
                        onSelectMarker={handleOnClickMarker}
                    />
                </React.Suspense>

                <div className="absolute bottom-0 w-full mb-5 z-50">
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
                                                key={d.id}
                                                value={d.id}
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
                                        onSelect={handleOnChangeSelect}
                                        style={{ width: '100%' }}
                                        onKeyDown={onKeyDown}
                                        // // onKeyUp={onKeyUpAuto}
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
                                        onKeyUp={onKeyUp}
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

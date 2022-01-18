/* eslint-disable no-unused-vars */
/* eslint-disable no-loss-of-precision */
import React, { useRef, useState } from 'react'
import GlobeComponent from './../components/GlobeComponent/index'
// import useResponsive from './../hooks/useResponsive'
import useEventListener from './../hooks/useEventListener'
import useEffectOnce from './../hooks/useEffectOnce'
import { AutoComplete, Input, Select, Button, Row, Col, Tabs } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { filterSearch } from './../services/filters'
import { landsImages } from './../assets/images/lands/index'
import { FrameTopSVG, FrameBottomSVG } from '../assets/svg/frames'
import { AnimatePresence, motion } from 'framer-motion'
import CardNftMarket from '../components/Cards/CardNftMarket'

// import { FrameBottomSVG } from './../assets/svg/frames/index'

const { TabPane } = Tabs

const data = [
    {
        coordinates: {
            x: -99.23808626927799,
            y: -6.655961618955434,
            z: -178.0902142475668,
        },
        label: 'Brasil',
        image: landsImages.cristoRedentor,
    },
    {
        coordinates: {
            x: 38.27658558648708,
            y: 82.55040660119347,
            z: -182.5701668425229,
        },
        label: 'Mexico',
        image: landsImages.cristoRedentor,
    },
    {
        coordinates: {
            x: 21.508677345677214,
            y: 134.96997691390598,
            z: -151.4402925276393,
        },
        label: 'USA',
        image: landsImages.cristoRedentor,
    },
]

const lands = [
    {
        id: 'VG',
        city: 'Las Vegas',
        country: 'USA',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        image: landsImages.arai01,
    },
    {
        id: 'LA',
        city: 'Los Angeles',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'USA',
        image: landsImages.cebu01,
    },
    {
        id: 'LA',
        city: 'North Las Vegas',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'USA',
        image: landsImages.drottningholmv01,
    },
    {
        id: 'jacksonVille',
        city: 'Jackson Ville',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Mexico',
        image: landsImages.gotland01,
    },
    {
        id: 'EL',
        city: 'Elko',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Mexico',
        image: landsImages.mapTest,
    },
    {
        id: 'CA',
        city: 'Carson',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Brasil',
        image: landsImages.carson,
    },
    {
        id: 'austin',
        city: 'Austing',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Brasil',
        image: landsImages.austin,
    },
    {
        id: 'maiami',
        city: 'Miami',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        country: 'Brasil',
        image: landsImages.miami,
    },
]

const MarketView = () => {
    const globeContainerRef = useRef(null)
    const globeRef = useRef(null)
    const searchButtonRef = useRef(null)
    const [markers, setMarkers] = useState(data)
    const [globeSizes, setGlobalSizes] = useState({ width: 0, height: 0 })
    const [searchText, setSearchText] = useState()
    const [selectedText, setSelected] = useState()
    const [marker, setMarker] = useState()
    // const [tab, setTab] = useState(1)
    // const [markerSelected, setMarkerSelected] = useState()

    useEffectOnce(() => {
        setGlobalSizes({
            width: globeContainerRef.current.clientWidth,
            height: globeContainerRef.current.clientHeight,
        })
    })

    useEventListener('resize', () => {
        setGlobalSizes({
            width: globeContainerRef.current.clientWidth,
            height: globeContainerRef.current.clientHeight,
        })
    })

    const handleOnChangeSelect = (val) => {
        const marker = markers.filter((m) => m.label === val)[0]
        setSelected(marker.label)
        setSearchText(marker.label)
        globeRef.current.goToMarkerSelected(marker.label)
    }

    const handleOnChangeSelectAuto = (val) => {
        const marker = markers.filter((m) => m.label === val)[0]
        setSelected(marker.label)
        setSearchText(marker.label)
    }

    const handleOnClickMarker = (label) => {
        setSelected(label)
        setSearchText(label)
    }

    const handleOnSearch = (value) => {
        setSearchText(value)
    }

    const onKeyDown = (e) => {
        // console.log(object)
        if (e.code === 'Enter' && selectedText) {
            searchButtonRef.current.focus()
        }
    }

    // const onKeyUpAuto = (e) => {
    //     console.log({ searchText, selectedText })
    //     if (e.code === 'Enter' && searchText === '' && selectedText) {
    //         console.log('set search')
    //         setSearchText(selectedText)
    //     }
    // }

    const onKeyUp = (e) => {
        if (e.code === 'Enter') {
            if (searchText === '') {
                setSelected(undefined)

                globeRef.current.moveCameraToOriginalOrbit()
                // setMarkerSelected(undefined)
            } else if (selectedText)
                globeRef.current.goToMarkerSelected(selectedText)
        }
    }

    const onClick = () => {
        if (selectedText) globeRef.current.goToMarkerSelected(selectedText)
        else if (searchText === '') {
            setSelected(undefined)
            globeRef.current.moveCameraToOriginalOrbit()
        }
    }

    const onClear = () => {
        setSelected(undefined)
        globeRef.current.moveCameraToOriginalOrbit()
    }

    const filter = selectedText
        ? lands.filter((l) => l.country === selectedText)
        : lands

    const options = markers.reduce(
        (acc, m, key) => [...acc, { label: m.label, value: m.label }],
        []
    )
    const optionsFilter = filterSearch(searchText, options)
    // const _markers = data.reduce(
    //     (acc, { label, image }) => ({
    //         ...acc,
    //         [label]: {
    //             label,
    //             image,
    //         },
    //     }),
    //     {}
    // )
    // console.log({ marker, _markers })
    return (
        <div className="w-full bg-blue-10 relative">
            <div
                ref={globeContainerRef}
                className="w-full m-auto relative"
                style={{ height: '650px' }}
            >
                <GlobeComponent
                    ref={globeRef}
                    data={markers}
                    width={window.innerWidth}
                    height={650}
                    onAddMarker={(marker) =>
                        setMarkers([...markers, { ...marker, label: '' }])
                    }
                    onClickMarker={handleOnClickMarker}
                />
                <div className="absolute bottom-0 w-full mb-5">
                    <div
                        className="relative flex justify-center items-center m-auto w-10/12 md:w-8/12 lg:w-6/12 2xl:w-4/12"
                        // style={{ maxWidth: '750px' }}
                    >
                        <Input.Group>
                            <Row className="border border-blue-11 rounded-lg bg-blue-7">
                                <Col
                                    xs={4}
                                    className="bg-blue-8 border border-blue-11 rounded-l-lg "
                                >
                                    <Select
                                        className="w-full ant-selector-border-0 ant-selector-custom bg-blue-8 text-blue-4"
                                        size="large"
                                        value={selectedText}
                                        onChange={handleOnChangeSelect}
                                    >
                                        {options.map((d) => (
                                            <Select.Option
                                                key={d.label}
                                                value={d.value}
                                            >
                                                {d.label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Col>
                                <Col
                                    xs={16}
                                    className="border-r border-blue-11"
                                >
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
                                            className="h-full w-full bg-transparent border-0 text-blue-4 pl-5 focus:border-none rounded-none "
                                            size="large"
                                        />
                                    </AutoComplete>
                                </Col>
                                <Col xs={4}>
                                    <button
                                        ref={searchButtonRef}
                                        className="h-full w-full rounded-r-full bg-transparent border-0 text-blue-4"
                                        size="large"
                                        // onKeyDown={onKeyDown}
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
            {/* <div className="relative"></div> */}

            {/* <div className="">
                <div className="relative max-w-1000px -mt-5 flex justify-center items-center m-auto">
                    <Input.Group>
                        <Row>
                            <Col
                                xs={4}
                                className="pl-4 bg-white  rounded-l-full "
                            >
                                <Select
                                    className="w-full ant-selector-border-0"
                                    size="large"
                                    value={selectedText}
                                    onChange={handleOnChangeSelect}
                                >
                                    {options.map((d) => (
                                        <Select.Option
                                            key={d.label}
                                            value={d.value}
                                        >
                                            {d.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col xs={16}>
                                <AutoComplete
                                    options={optionsFilter}
                                    className="absolute"
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
                                    <Input
                                        // className="w-6/12"
                                        size="large"
                                    />
                                </AutoComplete>
                            </Col>
                            <Col xs={3}>
                                <Button
                                    ref={searchButtonRef}
                                    className="w-full rounded-r-full"
                                    size="large"
                                    // onKeyDown={onKeyDown}
                                    onClick={onClick}
                                    onKeyUp={onKeyUp}
                                >
                                    <SearchOutlined />
                                </Button>
                            </Col>
                        </Row>
                    </Input.Group>
                </div>
            </div> */}
            <div className="w-full bg-blue-8 border-b-2 border-blue-11">
                <div className="max-w-1800px m-auto">
                    <div className="flex flex-row justify-center md:justify-start text-2xl font-saira-condensed pl-5 space-x-5 ">
                        <a className="px-3 pb-2 border-b-4  border-green-0">
                            <div className="pt-4 text-white"> Lands</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-blue-10 relative py-16">
                <div className="absolute inset-0 background-pattern-polka py-10"></div>
                <div
                    className="relative m-auto max-w-1800px px-6 2xl:px-16"
                    style={{ maxWidth: '1800px' }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                        {filter.map((f) => {
                            return (
                                <div key={`${f.country}-${f.city}`}>
                                    <CardNftMarket
                                        image={f.image}
                                        city={f.city}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarketView

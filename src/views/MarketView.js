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

    return (
        <div className="w-full  bg-blue-5">
            <div
                ref={globeContainerRef}
                className="w-full m-auto"
                style={{ height: '600px' }}
            >
                <GlobeComponent
                    ref={globeRef}
                    data={markers}
                    width={globeSizes.width}
                    height={globeSizes.height}
                    onAddMarker={(marker) =>
                        setMarkers([...markers, { ...marker, label: '' }])
                    }
                    onClickMarker={handleOnClickMarker}
                    // selectedMarker={markerSelected}
                />
            </div>

            <div className="">
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
            </div>
            <div className="py-10">
                <div className="max-w-1300px m-auto relative ">
                    <Row
                        gutter={[14, 20]}
                        className="m-0 px-0"
                        style={{
                            marginLeft: '0px',
                            marginRight: '0px',
                        }}
                    >
                        {filter.map((f) => {
                            return (
                                <Col
                                    key={`${f.country}-${f.city}`}
                                    span={12}
                                    md={8}
                                    xl={6}
                                    className=""
                                >
                                    <div className="rounded-lg bg-blue-5 ">
                                        <div className="relative w-full h-64 border-2 p-5 border-green-0 rounded-t-md cursor-pointer">
                                            <div
                                                className="absolute left-0 right-0 px-20"
                                                style={{ top: '-9px' }}
                                            >
                                                <FrameTopSVG />
                                            </div>
                                            <div
                                                className="absolute left-0 right-0 px-8"
                                                style={{
                                                    bottom: '-12px',
                                                }}
                                            >
                                                <FrameBottomSVG />
                                            </div>
                                            <img
                                                src={f.image}
                                                alt={f.image}
                                                className="w-auto h-full m-auto object-cover"
                                            />
                                        </div>
                                        <div className="px-5 pt-5 pb-4 border-2 border-t-0 border-info rounded-b-md cursor-pointer">
                                            <div className="text-center text-xl text-info">
                                                {f.city}
                                            </div>
                                            <div className="text-blue-4">
                                                {f.details}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default MarketView

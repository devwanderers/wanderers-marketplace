/* eslint-disable no-unused-vars */
/* eslint-disable no-loss-of-precision */
import React, { useRef, useState } from 'react'
import GlobeComponent from './../components/GlobeComponent/index'
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
import Tabs, { TabPane } from '../components/Tabs/Tabs'
import { rolesImg } from './../assets/images/roles/index'

// const { TabPane } = Tabs

const data = [
    {
        coordinates: {
            x: -99.23808626927799,
            y: -6.655961618955434,
            z: -178.0902142475668,
        },
        label: 'Brasil',
        image: landColors.redLand,
    },
    {
        coordinates: {
            x: 38.27658558648708,
            y: 82.55040660119347,
            z: -182.5701668425229,
        },
        label: 'Mexico',
        image: landColors.yellowLand,
    },
    {
        coordinates: {
            x: 21.508677345677214,
            y: 134.96997691390598,
            z: -151.4402925276393,
        },
        label: 'USA',
        image: landColors.greenLand,
    },
]

const lands = [
    {
        id: 'EL',
        title: 'Martiniquez',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        image: landsImages.martiniquez,
    },
    {
        id: 'CA',
        title: 'Houston',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        image: landsImages.houston,
    },
    {
        id: 'austin',
        title: 'Mayaguez',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        image: landsImages.mayaguez,
    },
    {
        id: 'VG',
        title: 'Las Vegas',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        image: landsImages.landTest,
    },
    {
        id: 'LA',
        title: 'Los Angeles',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        image: landsImages.humacaco,
    },
    {
        id: 'PR',
        title: 'Puerto Rico',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        image: landsImages.puertoRico,
    },
    {
        id: 'jacksonVille',
        title: 'Fonds Saint Denis',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        image: landsImages.fontdsSaintDenis,
    },
    {
        id: 'maiami',
        title: 'Miami',
        details:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maiores ducimus saepe?',
        image: landsImages.humacaco,
    },
]

const roles = [
    {
        id: 'BRC',
        title: 'AMB Vegas',
        image: rolesImg.bronce,
        country: 'USA',
    },
    {
        id: 'SLV',
        title: 'AMB Los Angeles',
        image: rolesImg.silver,
        country: 'USA',
    },
    {
        id: 'GLD',
        title: 'AMB California',
        image: rolesImg.gold,
        country: 'USA',
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

    const filterRoles = selectedText
        ? roles.filter((l) => l.country === selectedText)
        : roles

    const options = markers.reduce(
        (acc, m, key) => [...acc, { label: m.label, value: m.label }],
        []
    )
    const optionsFilter = filterSearch(searchText, options)
    return (
        <div className="w-full bg-blue-10 relative">
            <div
                ref={globeContainerRef}
                className="w-full m-auto relative overflow-hidden"
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
            <div className="">
                {/* <div className=" max-w-1800px mx-auto"></div> */}
                <Tabs
                    tabContainerClassName="max-w-1800px mx-auto px-6 2xl:px-16"
                    panelContainerClassName="py-16 bg-blue-10 "
                >
                    <TabPane
                        tab="Lands"
                        className="max-w-1800px px-6 2xl:px-16"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                            {filter.map((f) => {
                                return (
                                    <div key={`${f.country}-${f.title}`}>
                                        <CardNftMarket
                                            image={f.image}
                                            title={f.title}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </TabPane>
                    <TabPane
                        tab="Roles"
                        className="max-w-1800px  px-6 2xl:px-16"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                            {filterRoles.map((f) => {
                                return (
                                    <div key={`${f.country}-${f.title}`}>
                                        <CardNftMarket
                                            image={f.image}
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

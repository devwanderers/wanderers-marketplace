import React, { useState } from 'react'
import { Row, Col, Button } from 'antd'
import { FrameNftTopSVG, FrameNftBottomSVG } from '../../assets/svg/frames'
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa'
import useResponsive from './../../hooks/useResponsive'
import { registerToken } from '../../services/wallet'

const example = [
    {
        tokenId: '5',
        tokenUri:
            'https://wanderers.mypinata.cloud/ipfs/QmUe1xnFLh4xiodfBeRUTMcJQTEMJBNbqgMRkevqyDHChR/5.json',
        nftData: {
            name: 'Juan #11',
            description: 'Wanderer ',
            image: 'https://wanderers.mypinata.cloud/ipfs/QmdbYAh4RwHRasoZmWBagzBpuZrSKLQ544JqT7EZzZCrQV',
            dna: '9b64578024cc6c53622161ae85795655487e271b',
            edition: 11,
            date: 1637170748256,
            compiler: 'HashLips Art Engine',
            attributes: [
                {
                    trait_type: 'Fondos',
                    value: 'fondos neon 04',
                    rarity: '60%',
                },
                {
                    trait_type: 'Fondos2',
                    value: 'fondos neon 04',
                    rarity: '60%',
                },
                {
                    trait_type: 'Fondos3',
                    value: 'fondos neon 04',
                    rarity: '60%',
                },
                {
                    trait_type: 'Fondos4',
                    value: 'fondos neon 04',
                    rarity: '60%',
                },
                {
                    trait_type: 'Fondos5',
                    value: 'fondos neon 04',
                    rarity: '60%',
                },
                {
                    trait_type: 'Fondos6',
                    value: 'fondos neon 04',
                    rarity: '60%',
                },
            ],
        },
    },
    {
        tokenId: '4',
        tokenUri:
            'https://wanderers.mypinata.cloud/ipfs/QmUe1xnFLh4xiodfBeRUTMcJQTEMJBNbqgMRkevqyDHChR/5.json',
        nftData: {
            name: 'Wanderers #12',
            description: 'Wanderer ',
            image: 'https://wanderers.mypinata.cloud/ipfs/QmdbYAh4RwHRasoZmWBagzBpuZrSKLQ544JqT7EZzZCrQV',
            dna: '9b64578024cc6c53622161ae85795655487e271b',
            edition: 11,
            date: 1637170748256,
            compiler: 'HashLips Art Engine',
            attributes: [
                {
                    trait_type: 'Fondos1',
                    value: 'fondos neon 04ddd',
                    rarity: '60%',
                },
                {
                    trait_type: 'armas1',
                    value: 'espada negra',
                },
            ],
        },
    },
]

const MintDisplay = ({ data = example }) => {
    const [index, setIndex] = useState(0)
    const [frameTTop] = useResponsive({
        base: '-7px',
        md: '-4px',
        lg: '-5px',
        xl: '-6px',
        xxl: '-9px',
    })
    const [frameBBottom] = useResponsive({
        base: '-8.5px',
        md: '-5.5px',
        lg: '-7px',
        xl: '-8px',
        xxl: '-10px',
    })

    const onHandleNext = () => {
        if (data && index < data.length - 1) {
            setIndex(index + 1)
        }
    }
    const onHandlePrev = () => {
        if (data && index > 0) {
            setIndex(index - 1)
        }
    }
    return (
        <React.Fragment>
            <Row gutter={[20, 10]} className="my-5 ">
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Row>
                        <Col sm={24} className="mb-5">
                            <div className="relative">
                                <div
                                    className="absolute left-0 right-0"
                                    style={{
                                        top: frameTTop,
                                    }}
                                >
                                    <FrameNftTopSVG width="100%" />
                                </div>
                                <div
                                    className="absolute left-0 right-0"
                                    style={{
                                        bottom: frameBBottom,
                                    }}
                                >
                                    <FrameNftBottomSVG width="100%" />
                                </div>
                                <img
                                    className="w-full h-auto"
                                    src={data[index]?.nftData.image}
                                    alt={data[index]?.nftData.image}
                                />
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="bg-green-1 border-2 border-green-3 p-4">
                                <h2 className="text-info text-xl lg:text-2xl font-bold leading-none">
                                    {data[index]?.nftData.name}
                                </h2>
                                <div className="mt-2">
                                    <h3 className="text-green-0 text-base lg:text-lg">
                                        About
                                    </h3>
                                    <p>{data[index]?.nftData.description}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                    <div className="bg-green-1 border-2 border-green-3 h-full p-4">
                        <div className="flex space-x-5 flex-wrap leading-none mb-4">
                            <div>
                                <h3 className="text-green-0 text-base md:text-lg lg:text-xl mb-2">
                                    Class
                                </h3>
                                <p className="text-base lg:text-lg">Renegate</p>
                            </div>
                            <div>
                                <h3 className="text-green-0 text-base md:text-lg lg:text-xl mb-2">
                                    Rarity
                                </h3>
                                <p className="text-base lg:text-lg">
                                    20% Anormaly
                                </p>
                            </div>
                        </div>
                        <hr className="border-green-3 mb-4" />
                        <div>
                            <h3 className="text-green-0 text-base md:text-lg lg:text-xl">
                                Traits
                            </h3>
                            <div className="flex flex-wrap">
                                {data[index] &&
                                    data[index].nftData.attributes.map(
                                        (val) => {
                                            return (
                                                <div
                                                    key={`nft-${data[index].tokenId}-type${val.trait_type}`}
                                                    className=" flex flex-col border-2 border-green-3 rounded-md py-2 px-3 mr-2 mt-2 shadow-inner text-xs xl:text-base"
                                                >
                                                    <div>
                                                        <span className="font-bold  ">
                                                            Type:{' '}
                                                        </span>
                                                        {val.trait_type}
                                                    </div>
                                                    <div>
                                                        <span className=" font-bold">
                                                            Value:{' '}
                                                        </span>
                                                        {val.value}
                                                    </div>
                                                    <div>
                                                        <span className=" font-bold">
                                                            Rarity:{' '}
                                                        </span>
                                                        {val.rarity}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={[20]}>
                <Col span={24} md={8} className="mb-5 md:mb-0">
                    {data?.length > 1 && (
                        <div className="flex flex-row items-center justify-center h-full">
                            <div className="flex-1 flex justify-center">
                                <button
                                    disabled={data && index === 0}
                                    onClick={onHandlePrev}
                                    className="text-3xl text-primary disabled:opacity-70 transform active:scale-75"
                                >
                                    <FaArrowCircleLeft />
                                </button>
                            </div>
                            <div className="flex-1 flex justify-center text-primary">
                                <button
                                    disabled={data && index === data.length - 1}
                                    onClick={onHandleNext}
                                    className="text-3xl disabled:opacity-70 transform active:scale-75"
                                >
                                    <FaArrowCircleRight />
                                </button>
                            </div>
                        </div>
                    )}
                </Col>
                <Col
                    span={24}
                    md={16}
                    className="flex flex-row justify-between space-x-2"
                >
                    {/* <div className="nft-footer flex space-x-10 md:space-x-2"> */}
                    <Button
                        onClick={() => registerToken()}
                        className="flex-1 border-none bg-primary hover:bg-primary
                                            focus:bg-primary text-white hover:text-white focus:text-white"
                        size="large"
                    >
                        Add NFT
                    </Button>
                    <Button
                        className="flex-1 border-none bg-info hover:bg-info
                                            focus:bg-info text-white hover:text-white focus:text-white"
                        size="large"
                    >
                        Marketplace
                    </Button>
                    <Button
                        className="flex-1 border-solid border-1 border-info bg-transparent
                                            text-info hover:border-white hover:bg-info focus:bg-info
                                            hover:text-white focus:text-white"
                        size="large"
                    >
                        Download Image
                    </Button>
                    {/* </div> */}
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default MintDisplay

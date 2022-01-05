import React, { useState } from 'react'
import { Layout, Row, Col, Button } from 'antd'
import { FaDiscord, FaTwitter, FaTelegramPlane } from 'react-icons/fa'
// import brandImages from '../assets/images/brand'
// import logo from '../assets/images/brand/logo.png'
// import { DiscordIcon } from '../components/CustomIcons'
// import { SiDiscord } from 'react-icons/si'
// import GenericCountDown from './../components/CountDowns/GenericCountDown'
import Article from '../components/DisplayText/Article'
import SectionTitle from '../components/Sections/SectionTitle'
import utilitiesImages from '../assets/images/utilities'
import CollectionImage from '../components/DisplayImages/CollectionImage'
import AnimInOutHorizontal from '../components/Animations/AnimInOutHorizontal'
import { useInView } from 'react-intersection-observer'
import AnimateCover from '../components/Animations/AnimateCover'
import { LineWrapper } from './../components/Wrappers/LineWrapper'
import HeaderText from './../components/DisplayText/Header'
import Paragraph from './../components/DisplayText/Paragraph'
// import { IslandSVG } from '../assets/svg/utilities'
import {
    FrameFAQTopSVG,
    FrameFAQBottomSVG,
    FrameCharacterSVG,
    // FrameCounterHeaderSVG,
} from '../assets/svg/frames'
// import FrameCounterHeaderCustom from '../assets/svg/frames/FrameCounterHeaderCustom'
import {
    DownArrowSVG,
    OctagonDiscordSVG,
    OctagonTelegramSVG,
    OctagonTwitterSVG,
} from '../assets/svg/icons'
// import { BackgroundSectionSVG } from '../assets/svg/background'
import RoadMapSVG from './../assets/svg/utilities/RoadMapSVG'
import useWindowDimensions from './../customHooks/useWindowDimensions'
import { returnValueByScreenWidth } from '../services/stylesServices'
// import { sectionsImages } from '../assets/images/sections'
import { RenderMarcoSVG } from './../assets/svg/sections/index'
import { Logo1SVG } from '../assets/svg/brand'
import AnimDisplayFromTop from './../components/Animations/AnimDisplayFromTop'
import SliderIslands from '../components/LandingComponent/SliderIslands'
import MintSection from '../components/Mint/MintSection'
// import ConnectPolygonBridge from '../components/Buttons/ConnectPolygonBridge'

const { Header, Content } = Layout
// const { Countdown } = Statistic

// const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Moment is also OK

const CollectionContainer = ({ children }) => (
    <div className="css-generic w-full flex-row justify-center flex-grow space-x-2 xl:space-x-6">
        {children}
    </div>
)

const LandingPage = () => {
    const { width } = useWindowDimensions()
    const [collapseFaq, setCollapseFAQ] = useState(true)
    const [roadKey, setSelectedKey] = useState(1)

    const collectionConfig = {
        threshold: 0.3,
    }
    const [refSection, showCover] = useInView({
        threshold: 0.1,
    })
    const [refCollection1, showCollection1] = useInView(collectionConfig)
    const [refCollection2, showCollection2] = useInView(collectionConfig)
    const [refCollection3, showCollection3] = useInView(collectionConfig)

    // Height Container Collection
    const heightContainerCollection = returnValueByScreenWidth(width, {
        base: '80px',
        md: '160px',
        xl: '210px',
    })

    const handleCollapseFaq = () => {
        setCollapseFAQ(!collapseFaq)
    }

    return (
        <Layout className="landing-page min-w-minMobileWidth">
            <Header className="bg-transparent z-30 px-5 lg:px-50px">
                <Row className="h-full">
                    <Col xs={19}></Col>
                    <Col
                        xs={24}
                        md={5}
                        className="flex justify-end items-center "
                    >
                        <Button type="link">
                            <FaDiscord
                                className="social-icons"
                                color="#487F8F"
                            />
                        </Button>
                        <Button type="link">
                            <FaTelegramPlane
                                className="social-icons"
                                color="#487F8F"
                            />
                        </Button>
                        <Button type="link">
                            <FaTwitter
                                className="social-icons"
                                color="#487F8F"
                            />
                        </Button>
                        {/* <div className="ml-2 relative -mb-2">
                            <ConnectPolygonBridge />
                        </div> */}
                    </Col>
                </Row>
            </Header>
            <Content>
                <div className="bg-render-mobil xl:bg-render bg-no-repeat bg-cover bg-center -mt-64px pb-1 xl:pb-32 lg:pb-40 relative">
                    <AnimateCover visible={showCover} />
                    <div className="section mx-auto pt-64px mb-20 h-screen relative">
                        {/* <div className="css-generic h-full flex-col justify-between py-4 md:py-6 lg:px-28 xl:px-28 lg:py-10"> */}
                        <div className="css-generic h-full flex-col justify-between py-4 md:py-6 lg:px-0 xl:px-0 lg:py-10">
                            <div className="pt-10 lg:pt-0 w-80 lg:w-96 mx-auto  pb-6">
                                <Logo1SVG width="100%" />
                            </div>
                            <MintSection />
                            {/* <div className="mb-10 z-20">
                                <div className="count-down bg-black-1 bg-opacity-30 mx-auto lg:px-4 pt-5 pb-4 relative z-10">
                                    <GenericCountDown date={deadline} />
                                    <div className="flex text-info text-lg md:text-2xl lg:text-4xl mt-5">
                                        <div className="flex-1">DAYS</div>
                                        <div className="flex-1">HOURS</div>
                                        <div className="flex-1">MINUTES</div>
                                        <div className="flex-1">SECONDS</div>
                                    </div>
                                    <div
                                        className="absolute right-0 left-0 "
                                        style={{
                                            top: returnValueByScreenWidth(
                                                width,
                                                {
                                                    base: '-6px',
                                                    md: '-11px',
                                                    lg: '-10px',
                                                    xl: '-12px',
                                                }
                                            ),
                                        }}
                                    >
                                        <FrameCounterTopSVG width="100%" />
                                    </div>
                                    <div
                                        className="absolute right-0 left-0 "
                                        style={{ bottom: '-3px' }}
                                    >
                                        <FrameCounterBottomSVG
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>
                                </div>
                                <div className="css-generic">
                                    <div className="css-generic px-12 md:px-16 xl:px-20 text-center mx-auto relative">
                                        <div className="absolute right-0 left-0 top-0">
                                            <FrameCounterHeaderCustom width="100%" />
                                        </div>
                                        <HeaderText
                                            base="xl"
                                            md="3xl"
                                            lg="34px"
                                            className="text-white z-10"
                                        >
                                            MINT STARTS
                                        </HeaderText>
                                    </div>
                                </div>
                            </div> */}
                            <div className="text-center z-20">
                                <Button
                                    className="bg-dark bg-opacity-50 h-auto text-primary text-xl md:text-2xl lg:text-3xl xl:text-4xl py-2 px-8"
                                    type="primary"
                                >
                                    JOIN OUR DISCORD
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute right-0 left-0"
                        style={{ bottom: '-1px' }}
                    >
                        <RenderMarcoSVG width="100%" />
                    </div>
                </div>
                <div
                    ref={refSection}
                    className=" bg-blue-5 pt-10 pb-10 lg:pb-24"
                >
                    <div className="section">
                        <Row>
                            <Col xs={24} md={12} className="">
                                <div className="w-full">
                                    <div className="w-full xl:pr-16">
                                        <Article
                                            header="8,728"
                                            subHeader="Unique Wanderers"
                                            headerProps={{
                                                className:
                                                    'mb-1 leading-none text-primary text-center lg:text-left',
                                                base: '4xl',
                                                lg: '89px',
                                            }}
                                            subHeaderProps={{
                                                className:
                                                    'mb-4 font-saira-condensed leading-none text-info font-semibold  text-center lg:text-left',
                                                base: '2xl',
                                                lg: '53px',
                                            }}
                                            paragraphProps={{
                                                className:
                                                    'text-blue-4  text-justify',
                                                base: 'lg',
                                                lg: '23px',
                                            }}
                                            className="max-w-full"
                                        >
                                            <span>
                                                {
                                                    " We’ve created a completely virtual metaverse in which all the tourist destinations offered by our partner Destinare are represented as NFT's within our platform known as Lands or Roles. Such destinations can be owned by you, or a group of adventurers called Wanderers who are also represented as unique NFT's."
                                                }
                                            </span>
                                            <br />
                                            <br />
                                            <span>
                                                There are 8750 unique characters
                                                called wanderers as an initial
                                                offering and other 500 Ultrarare
                                                and special characters aviable
                                                by 0.12 ETH.
                                            </span>
                                            <br />
                                            <br />
                                            <span>
                                                Owning a wanderer gives you
                                                access to the metaverse as well
                                                as exclusive benefits to our
                                                travel partner. Once you mint a
                                                wanderer you start to receive
                                                big benefits such as Tokens,
                                                exclusive promotions in the
                                                travel platform and more.{' '}
                                                <a
                                                    href="#"
                                                    className="underline"
                                                >
                                                    <strong>
                                                        Read the white paper.
                                                    </strong>
                                                </a>
                                            </span>
                                        </Article>
                                    </div>
                                </div>
                            </Col>
                            <Col
                                xs={24}
                                md={12}
                                className="px-12 lg:px-10 xl:px-12 pt-5"
                            >
                                <div className="css-generic relative">
                                    <FrameCharacterSVG width="100%" />
                                    <div className=" absolute top-0 right-0 bottom-0 left-0 pt-16 pb-10 lg:pt-20 lg:pb-16">
                                        <img
                                            className="w-auto h-full object-contain overflow-hidden mx-auto relative"
                                            style={{ bottom: '-3px' }}
                                            src={utilitiesImages.nft}
                                            alt={utilitiesImages.nft}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className=" bg-blue-5 lg:pb-32 css-generic lg:flex-row px-10px xl:px-0">
                    <HeaderText
                        base="4xl"
                        className="block lg:hidden text-primary mb-5 md:mb-10 leading-tight tracking-widest mx-auto"
                    >
                        COLLECTION
                    </HeaderText>
                    <SectionTitle className="hidden lg:flex">
                        COLLECTION
                    </SectionTitle>
                    <div className="css-generic flex-grow pb-5">
                        <div className="css-generic flex-col w-full lg:w-750px xl:w-1000px space-y-2 xl:space-y-4 space ">
                            <div
                                ref={refCollection1}
                                style={{ height: heightContainerCollection }}
                                className="css-generic w-full max-w-full"
                            >
                                <AnimInOutHorizontal visible={showCollection1}>
                                    <CollectionContainer>
                                        <CollectionImage
                                            size={heightContainerCollection}
                                            src={utilitiesImages.nft}
                                        />
                                        <CollectionImage
                                            size={heightContainerCollection}
                                            src={utilitiesImages.nft9}
                                        />
                                        <CollectionImage
                                            size={heightContainerCollection}
                                            src={utilitiesImages.nft5}
                                        />
                                    </CollectionContainer>
                                </AnimInOutHorizontal>
                            </div>
                            <div
                                ref={refCollection2}
                                style={{ height: heightContainerCollection }}
                                className="css-generic w-full max-w-full"
                            >
                                <AnimInOutHorizontal
                                    visible={showCollection2}
                                    side="right"
                                >
                                    <CollectionContainer>
                                        <CollectionImage
                                            size={heightContainerCollection}
                                            src={utilitiesImages.nft1}
                                        />
                                        <CollectionImage
                                            size={heightContainerCollection}
                                            src={utilitiesImages.nft3}
                                        />
                                        <CollectionImage
                                            size={heightContainerCollection}
                                            src={utilitiesImages.nft2}
                                        />
                                        <CollectionImage
                                            size={heightContainerCollection}
                                            src={utilitiesImages.nft4}
                                        />
                                    </CollectionContainer>
                                </AnimInOutHorizontal>
                            </div>
                            <div
                                ref={refCollection3}
                                style={{ height: heightContainerCollection }}
                                className="css-generic w-full max-w-full "
                            >
                                <AnimInOutHorizontal visible={showCollection3}>
                                    <CollectionContainer>
                                        <CollectionImage
                                            size={heightContainerCollection}
                                            src={utilitiesImages.nft6}
                                        />
                                        <CollectionImage
                                            size={heightContainerCollection}
                                            src={utilitiesImages.nft7}
                                        />
                                        <CollectionImage
                                            size={heightContainerCollection}
                                            src={utilitiesImages.nft8}
                                        />
                                    </CollectionContainer>
                                </AnimInOutHorizontal>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-5 pt-10 pb-3 lg:pb-20 border-0">
                    <div className="section">
                        <Row className=" flex-wrap-reverse lg:flex-wrap">
                            <Col
                                xs={24}
                                lg={12}
                                className="hidden lg:flex justify-center "
                            >
                                <div className="w-6/12 md:w-5/12 lg:w-10/12 xl:w-8/12 mx-auto">
                                    <img
                                        className="w-full"
                                        src={utilitiesImages.island}
                                        alt={utilitiesImages.island}
                                    />
                                    {/* <IslandSVG width="100%" /> */}
                                </div>
                            </Col>
                            <Col xs={24} lg={12}>
                                <div className=" lg:pl-5">
                                    <HeaderText
                                        base="4xl"
                                        lg="89px"
                                        className="text-primary leading-tight tracking-widest text-center lg:text-left"
                                    >
                                        NFT
                                    </HeaderText>
                                </div>

                                <LineWrapper
                                    borderHeight="60%"
                                    borderWidth="80%"
                                    decorationBottom="0.7rem"
                                >
                                    <Article
                                        header="Lands"
                                        headerProps={{
                                            className:
                                                'mb-4 font-saira-condensed leading-none text-info font-semibold  text-center lg:text-left',
                                            base: '2xl',
                                            lg: '40px',
                                        }}
                                        paragraphProps={{
                                            className:
                                                'mb-8 text-blue-4 text-justify',
                                            base: 'lg',
                                            lg: '23px',
                                        }}
                                    >
                                        Feel the power!! Once you get this class
                                        of NTF, now you’re the only owner of
                                        this land, it means that every single
                                        booking completed to the equivalent
                                        place in the travel platform will pay
                                        you a commission!
                                    </Article>
                                    <Article
                                        header="Role in Land"
                                        headerProps={{
                                            className:
                                                'mb-4 font-saira-condensed leading-none text-info font-semibold  text-center lg:text-left',
                                            base: '2xl',
                                            lg: '40px',
                                        }}
                                        paragraphProps={{
                                            className:
                                                'mb-10 text-blue-4 text-justify',
                                            base: 'lg',
                                            lg: '23px',
                                        }}
                                    >
                                        As the role in land NFT you and 9 others
                                        will guard the land, by doing so, you
                                        will also be rewarded with a commission
                                        when a booking has been completed, but
                                        in a smaller percentage. In other words,
                                        you’re working for the land owner but
                                        whom will share revenue with you.
                                    </Article>
                                </LineWrapper>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="bg-blue-5 pb-16 relative border-0">
                    <SliderIslands />
                </div>
                <div
                    className="bg-blue-5 bg-earth bg-no-repeat bg-cover pt-12 pb-4 lg:pt-48 lg:pb-48 relative"
                    style={{
                        backgroundPosition: '0% 100%',
                    }}
                >
                    <div className="section">
                        <div className="css-generic flex-grow ">
                            <div className="css-generic items-center">
                                <HeaderText
                                    base="4xl"
                                    lg="89px"
                                    className="text-primary leading-none tracking-widest"
                                >
                                    Wanderers Token
                                </HeaderText>
                            </div>
                            <div className="css-generic"></div>
                            <div className="css-generic flex-row flex-grow max-h-full ">
                                <div className="css-generic hidden lg:flex flex-1"></div>
                                <div className="css-generic flex-1  text-center lg:text-left lg:pl-8">
                                    <HeaderText
                                        base="2xl"
                                        lg="53px"
                                        className="text-info leading-none font-saira-condensed font-semibold"
                                    >
                                        Token
                                    </HeaderText>
                                </div>
                            </div>
                        </div>
                        <div className="css-generic mb-8 lg:mb-20">
                            <Row>
                                <Col xs={24} lg={12}>
                                    <LineWrapper
                                        side="right"
                                        decorationBottom="0.7rem"
                                    >
                                        <Paragraph
                                            className=" text-blue-4 text-justify"
                                            base="lg"
                                            lg="23px"
                                        >
                                            Why a token? We’re not just a common
                                            NFT project, we’re creating an
                                            ecosystem where your NFT’s is more
                                            than Art, we think in our community
                                            and we want to give you a little
                                            piece back for the trust put in the
                                            project. <br /> The token reward you
                                            in the ecosystem and has unique
                                            features that you will love!! The
                                            Wanderers travel token, is the
                                            native currency in the metaverse, it
                                            is based on ERC20 making it highly
                                            diverse and easy to shift
                                            interdomain. Wait for the listing in
                                            Unyswap
                                        </Paragraph>
                                    </LineWrapper>
                                </Col>
                                <Col
                                    xs={24}
                                    lg={12}
                                    className="flex justify-center lg:pl-5"
                                >
                                    <div className="w-6/12 lg:w-full">
                                        <img
                                            className="w-full h-auto"
                                            src={utilitiesImages.wttCoin}
                                            alt={utilitiesImages.wttCoin}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="css-generic text-center lg:text-left">
                            <HeaderText
                                base="4xl"
                                lg="89px"
                                className="text-primary leading-none tracking-widest mb-10 lg:mb-28"
                            >
                                Road Map
                            </HeaderText>
                            <div className="css-generic mx-auto w-full lg:w-8/12">
                                <Article
                                    header="1. Road Map"
                                    subHeader="December 12nd"
                                    headerProps={{
                                        className:
                                            'leading-tight text-info text-center lg:text-left',
                                        base: '3xl',
                                        lg: '40px',
                                    }}
                                    subHeaderProps={{
                                        className:
                                            'leading-tight text-blue-4 font-saira-condensed font-semibold mb-4',
                                        base: 'xl',
                                        lg: '27px',
                                    }}
                                    paragraphProps={{
                                        className:
                                            'mb-8 text-blue-4  text-justify',
                                        base: 'lg',
                                        lg: '23px',
                                    }}
                                >
                                    Unlike many other projects our project has
                                    been created to be in the market for the
                                    long run. That is why our roadmap is more
                                    complex and detailed than most projects. The
                                    team is working tirelessly to accomplish all
                                    the goals set in the roadmap according to
                                    dates. We’ll keep you updated through our
                                    social media channels!
                                </Article>
                            </div>

                            <div className="css-generic max-w-full">
                                <RoadMapSVG
                                    selectedKey={roadKey}
                                    onSelectedKey={setSelectedKey}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-5 pt-10 pb-20 lg:pb-44 lg:pt-20">
                    <div className="section">
                        <div className="css-generic relative bg-blue-6 bg-opacity-40 py-10">
                            <div
                                className="absolute left-0 right-0"
                                style={{ top: '-8px' }}
                            >
                                <FrameFAQTopSVG width="100%" />
                            </div>
                            <div
                                className="absolute left-0 right-0"
                                style={{ bottom: 0 }}
                            >
                                <FrameFAQBottomSVG width="100%" />
                            </div>
                            <div className="css-generic justify-center items-center flex-row">
                                <div
                                    className="css-generic cursor-pointer select-none"
                                    onClick={handleCollapseFaq}
                                >
                                    <HeaderText
                                        lg="89px"
                                        className="text-primary leading-none tracking-widest mr-2"
                                    >
                                        FAQ
                                    </HeaderText>
                                </div>
                                <div
                                    className="css-generic w-10 cursor-pointer"
                                    onClick={handleCollapseFaq}
                                >
                                    <DownArrowSVG />
                                </div>
                            </div>
                            <AnimDisplayFromTop
                                visible={!collapseFaq}
                                className="overflow-hidden css-generic"
                            >
                                <div className="css-generic px-10 lg:px-20 pt-10 ">
                                    <Article
                                        header="How do I mint?"
                                        headerProps={{
                                            className:
                                                'mb-1 leading-none text-info',
                                            base: '2xl',
                                            lg: '3xl',
                                        }}
                                        paragraphProps={{
                                            className:
                                                'text-blue-4  text-justify',
                                            base: 'lg',
                                            lg: '23px',
                                        }}
                                        className="max-w-full"
                                    >
                                        <span>
                                            Lorem ipsum dolor sit amet,
                                            consectetuer adipiscing elit, sed
                                            diam nonummy nibh euismod tincidunt
                                            ut laoreet dolore magna aliquam erat
                                            volutpat.
                                        </span>
                                    </Article>
                                    <br />
                                    <Article
                                        header="Who are The Wanderers?"
                                        headerProps={{
                                            className:
                                                'mb-1 leading-none text-info',
                                            base: '2xl',
                                            lg: '3xl',
                                        }}
                                        paragraphProps={{
                                            className:
                                                'text-blue-4  text-justify',
                                            base: 'lg',
                                            lg: '23px',
                                        }}
                                        className="max-w-full"
                                    >
                                        <span>
                                            Lorem ipsum dolor sit amet,
                                            consectetuer adipiscing elit, sed
                                            diam nonummy nibh euismod tincidunt
                                            ut laoreet dolore magna aliquam erat
                                            volutpat. Ut wisi enim ad minim
                                            veniam, quis nostrud exerci tation
                                            ullamcorper suscipit lobortis nisl.
                                        </span>
                                    </Article>
                                    <br />
                                    <Article
                                        header="How to play and earn?"
                                        headerProps={{
                                            className:
                                                'mb-1 leading-none text-info',
                                            base: '2xl',
                                            lg: '3xl',
                                        }}
                                        paragraphProps={{
                                            className:
                                                'text-blue-4  text-justify',
                                            base: 'lg',
                                            lg: '23px',
                                        }}
                                        className="max-w-full"
                                    >
                                        <span>
                                            Lorem ipsum dolor sit amet,
                                            consectetuer adipiscing elit, sed
                                            diam nonummy nibh euismod tincidunt
                                            ut laoreet dolore magna aliquam erat
                                            volutpat. Ut wisi enim ad minim
                                            veniam, quis nostrud exerci tation
                                            ullamcorper suscipit lobortis nisl.
                                        </span>
                                        <br />
                                    </Article>
                                    <br />
                                    <Article
                                        header="It would be a presale event?"
                                        headerProps={{
                                            className:
                                                'mb-1 leading-none text-info',
                                            base: 'base',
                                            lg: '3xl',
                                        }}
                                        paragraphProps={{
                                            className:
                                                'text-blue-4  text-justify',
                                            base: 'lg',
                                            lg: '23px',
                                        }}
                                        className="max-w-full"
                                    >
                                        <span>
                                            Lorem ipsum dolor sit amet,
                                            consectetuer adipiscing elit, sed
                                            diam nonummy nibh euismod tincidunt
                                            ut laoreet dolore magna aliquam erat
                                            volutpat. Ut wisi enim ad minim
                                            veniam, quis nostrud exerci tation
                                            ullamcorper suscipit lobortis nisl.
                                        </span>
                                    </Article>
                                    <br />
                                    <Article
                                        header="Why Ethereum?"
                                        headerProps={{
                                            className:
                                                'mb-1 leading-none text-info',
                                            base: 'base',
                                            lg: '3xl',
                                        }}
                                        paragraphProps={{
                                            className:
                                                'text-blue-4  text-justify',
                                            base: 'lg',
                                            lg: '23px',
                                        }}
                                        className="max-w-full"
                                    >
                                        <span>
                                            Lorem ipsum dolor sit amet,
                                            consectetuer adipiscing elit, sed
                                            diam nonummy nibh euismod tincidunt
                                            ut laoreet dolore magna aliquam erat
                                            volutpat. Ut wisi enim ad minim
                                            veniam, quis nostrud exerci tation
                                            ullamcorper suscipit lobortis nisl.
                                        </span>
                                    </Article>
                                </div>
                            </AnimDisplayFromTop>
                            {/* {!collapseFaq && <div className=""></div>} */}
                        </div>
                    </div>
                </div>
                <div className="bg-blue-5 pb-20 lg:pb-48">
                    <div className="section">
                        <Row className="mb-12 lg:mb-16">
                            <Col
                                xs={24}
                                lg={7}
                                className="text-center lg:text-left"
                            >
                                <HeaderText
                                    base="4xl"
                                    lg="89px"
                                    className="text-primary leading-none tracking-widest"
                                >
                                    Join
                                </HeaderText>
                                <HeaderText
                                    base="2xl"
                                    lg="53px"
                                    className="text-info font-semibold leading-none font-saira-condensed lg:relative lg:-right-32"
                                >
                                    The community
                                </HeaderText>
                            </Col>
                            <Col xs={24} lg={17} className="pt-4 lg:pt-12">
                                <LineWrapper
                                    side="right"
                                    decorationBottom="0.7rem"
                                >
                                    <Paragraph
                                        base="lg"
                                        lg="23px"
                                        className="text-blue-4 lg:pl-44 text-justify"
                                    >
                                        Become a part of the most important NFT
                                        project. Big things happen when the
                                        community is involved in all phases.
                                        Join us to get the news as soon as they
                                        come out and follow us for our latest
                                        announcements.
                                    </Paragraph>
                                </LineWrapper>
                            </Col>
                        </Row>
                        <div className="css-generic flex-row justify-center space-x-8 lg:space-x-10">
                            <Button
                                type="link"
                                className="h-16 w-16 lg:h-24 lg:w-24 p-0"
                            >
                                <OctagonDiscordSVG width="100%" height="100%" />
                            </Button>
                            <Button
                                type="link"
                                className="h-16 w-16 lg:h-24 lg:w-24 p-0"
                            >
                                <OctagonTelegramSVG
                                    width="100%"
                                    height="100%"
                                />
                            </Button>

                            <Button
                                type="link"
                                className="h-16 w-16 lg:h-24 lg:w-24 p-0"
                            >
                                <OctagonTwitterSVG width="100%" height="100%" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Content>
            <footer className="bg-blue-5 py-12 border-blue-4 border-solid border-t hidden lg:block">
                <div className="section">
                    <div className="css-generic flex-row justify-between">
                        <div className="css-generic flex-grow max-h-full w-6/12 ">
                            <div className="css-generic items-center w-64">
                                <div className="css-generic w-full mb-3 px-8">
                                    <Logo1SVG width="100%" />
                                </div>
                                <HeaderText
                                    base="2xl"
                                    className="text-blue-4 font-semibold font-saira-condensed"
                                >
                                    8,782 unique Wanderers
                                </HeaderText>
                            </div>
                        </div>
                        <div className="css-generic flex-grow max-h-full w-6/12  items-center">
                            <div className="css-generic">
                                <h5 className="text-capitalize text-xl text-blue-4 tracking-wide font-bold mb-2">
                                    Home
                                </h5>
                                <ul className="list-none font-saira-condensed font-semibold">
                                    <li className="mb-2">
                                        <a
                                            className="text-blue-4 hover:text-gray-400"
                                            href="https://whitepaper.swapp.ee/"
                                        >
                                            Terms of service
                                        </a>
                                    </li>
                                    <li className=" mb-2">
                                        <a
                                            className="text-blue-4 hover:text-gray-400"
                                            href="https://app.uniswap.org/#/swap?"
                                        >
                                            Smart Contract
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </Layout>
    )
}

export default LandingPage

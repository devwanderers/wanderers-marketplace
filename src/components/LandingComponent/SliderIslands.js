import React, { useState } from 'react'
import Slider from 'react-slick'
import utilitiesImages from '../../assets/images/utilities'

import NextArrowControl from '../CustomSliderControls/NextArrowControl'
import PrevArrowControl from '../CustomSliderControls/PrevArrowControl'
import HeaderText from '../DisplayText/Header'
import useWindowDimensions from './../../customHooks/useWindowDimensions'

const landImages = [
    {
        id: 1,
        img: utilitiesImages.isla,
        title: '25%',
        percent: 'Country',
    },
    {
        id: 2,
        img: utilitiesImages.isla,
        title: '10%',
        percent: 'City',
    },
    {
        id: 3,
        img: utilitiesImages.isla,
        title: '6%',
        percent: 'Destiny',
    },
    {
        id: 4,
        img: utilitiesImages.isla,
        title: '20%',
        percent: 'Country ambassador',
    },
    {
        id: 5,
        img: utilitiesImages.isla,
        title: '15%',
        percent: 'City ambassador',
    },
    {
        id: 6,
        img: utilitiesImages.isla,
        title: '9%',
        percent: 'Destiny ambassador ',
    },
]

const SliderIslands = () => {
    const [imageIndex, setImageIndex] = useState(0)
    const { width } = useWindowDimensions()
    const sliderLandSettings = {
        dots: false,
        infinite: true,
        lazyLoad: true,
        autoplay: true,
        speed: 300,
        slidesToShow: width < 768 ? 1 : 3,
        centerMode: true,
        centerPadding: 0,
        nextArrow: <NextArrowControl />,
        prevArrow: <PrevArrowControl />,
        beforeChange: (_, next) => setImageIndex(next),
    }
    return (
        <div className="section">
            <div className="css-generic">
                <Slider className="px-12" {...sliderLandSettings}>
                    {landImages.map(({ id, img }, idx) => (
                        <div
                            key={`land-${id}`}
                            className={
                                idx === imageIndex
                                    ? 'landSlide activeSlide'
                                    : 'landSlide'
                            }
                        >
                            <img src={img} alt={img} />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="css-generic items-center mt-5">
                <HeaderText
                    className="leading-tight text-primary tracking-widest"
                    base="3xl"
                    lg="40px"
                >
                    {landImages[imageIndex] && landImages[imageIndex]?.title}
                </HeaderText>
                <HeaderText
                    className="leading-none text-info font-saira-condensed font-semibold"
                    base="xl"
                    lg="27px"
                >
                    {landImages[imageIndex] && landImages[imageIndex]?.percent}
                </HeaderText>
            </div>
        </div>
    )
}

export default SliderIslands

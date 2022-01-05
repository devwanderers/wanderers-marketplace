import React from 'react'
import { Tooltip } from 'antd'

const rects = [
    {
        id: 1,
        rectProps: {
            x: '37.93',
            y: '116.7',
            width: '17.51',
            height: '17.51',
            transform: 'translate(-82.03 59.51) rotate(-45)',
        },
        tooltipProps: {
            placement: 'top',
            text: 'Web 1.0, Community Suppport, Marketing plan, NFT Development',
        },
    },
    {
        id: 2,
        rectProps: {
            x: '177.21',
            y: '119.25',
            width: '17.51',
            height: '17.51',
            transform: 'translate(-43.04 158.74) rotate(-45)',
        },
        tooltipProps: {
            placement: 'bottom',
            text: "Community rewards, airdrops, giveaways & more, Apply to list NTF's in Artion, Token and Backend support Deployment",
        },
    },
    {
        id: 3,
        rectProps: {
            x: '317.44',
            y: '161.14',
            width: '17.51',
            height: '17.51',
            transform: 'translate(-31.59 270.16) rotate(-45)',
        },
        tooltipProps: {
            placement: 'top',
            text: 'Web 2.0 & Marketplace update, NFT minting period',
        },
    },
    {
        id: 4,
        rectProps: {
            x: '458.54',
            y: '193.37',
            width: '17.51',
            height: '17.51',
            transform: 'translate(-13.05 379.37) rotate(-45)',
        },
        tooltipProps: {
            placement: 'bottom',
            text: 'NFT Release, IDO WTT, Token Sale, LAND & ROL presale',
        },
    },
    {
        id: 5,
        rectProps: {
            x: '599.46',
            y: '169.49',
            width: '17.51',
            height: '17.51',
            transform: 'translate(45.11 472.03) rotate(-45)',
        },
        tooltipProps: {
            placement: 'top',
            text: 'First revew shares, LAND & ROL Sale, Start staking periods, CMC Listing, game planning',
        },
    },
    {
        id: 6,
        rectProps: {
            x: '737.63',
            y: '98.72',
            width: '17.51',
            height: '17.51',
            transform: 'translate(135.62 549) rotate(-45)',
        },
        tooltipProps: {
            placement: 'bottom',
            text: 'Comming soon',
        },
    },
]

const RoadMapSVG = ({
    selectedKey = 1,
    onSelectedKey,
    width = '100%',
    height = '100%',
}) => {
    return (
        <div style={{ width, height }}>
            <svg
                id="Capa_1"
                // dataName="Capa 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 780 268.5"
            >
                <text
                    className="font-russo-one"
                    transform="translate(54.67 192.33)"
                    style={{ fontSize: '18px', fill: '#30b29b' }}
                >
                    Launchpad
                </text>
                <polyline
                    points="39.87 116.7 39.87 208.7 113.87 208.7"
                    style={{
                        fill: 'none',
                        stroke: '#81c3e3',
                        strokeMiterlimit: 10,
                    }}
                />
                <text
                    className="font-russo-one"
                    transform="translate(332.89 230.14)"
                    style={{ fontSize: '18px', fill: '#30b29b' }}
                >
                    Wande
                    <tspan
                        x="61.83"
                        y="0"
                        style={{ letterSpacing: '-0.02001953125em' }}
                    >
                        r
                    </tspan>
                    <tspan x="69.75" y="0">
                        ers
                    </tspan>
                    <tspan style={{ fill: '#17b4ea' }}>
                        <tspan x="0" y="21.6">
                            p
                        </tspan>
                        <tspan
                            x="11.34"
                            y="21.6"
                            style={{ letterSpacing: '-0.02001953125em' }}
                        >
                            r
                        </tspan>
                        <tspan x="19.26" y="21.6">
                            eseason
                        </tspan>
                    </tspan>
                </text>
                <polyline
                    points="318.09 162.02 318.09 268 392.09 268"
                    style={{
                        fill: 'none',
                        stroke: '#81c3e3',
                        strokeMiterlimit: 10,
                    }}
                />
                <text
                    transform="translate(615.41 230.14)"
                    className="font-russo-one"
                    style={{ fontSize: '18px', fill: '#30b29b' }}
                >
                    The{' '}
                    <tspan
                        x="38.7"
                        y="0"
                        style={{ letterSpacing: '-0.019965277777777776em' }}
                    >
                        w
                    </tspan>
                    <tspan
                        x="54.18"
                        y="0"
                        style={{ letterSpacing: '-0.00005425347222222222em' }}
                    >
                        ande
                    </tspan>
                    <tspan
                        x="98.37"
                        y="0"
                        style={{ letterSpacing: '-0.019965277777777776em' }}
                    >
                        r
                    </tspan>
                    <tspan x="106.29" y="0">
                        ers
                    </tspan>
                    <tspan style={{ fill: '#17b4ea' }}>
                        <tspan x="0" y="21.6">
                            me
                        </tspan>
                        <tspan
                            x="27.45"
                            y="21.6"
                            style={{ letterSpacing: '-0.019965277777777776em' }}
                        >
                            t
                        </tspan>
                        <tspan
                            x="35.01"
                            y="21.6"
                            style={{ letterSpacing: '-0.010036892361111112em' }}
                        >
                            av
                        </tspan>
                        <tspan
                            x="55.8"
                            y="21.6"
                            style={{
                                letterSpacing: '0.00005425347222222222em',
                            }}
                        >
                            erse
                        </tspan>
                    </tspan>
                </text>
                <polyline
                    points="600.61 162.02 600.61 268 674.61 268"
                    style={{
                        fill: 'none',
                        stroke: '#81c3e3',
                        strokeMiterlimit: 10,
                    }}
                />
                <text
                    transform="translate(192.83 50.01)"
                    className="font-russo-one"
                    style={{ fontSize: '18px', fill: '#30b29b' }}
                >
                    Wande
                    <tspan
                        x="61.83"
                        y="0"
                        style={{ letterSpacing: '-0.02001953125em' }}
                    >
                        r
                    </tspan>
                    <tspan x="69.75" y="0">
                        ers
                    </tspan>
                    <tspan style={{ fill: '#17b4ea' }}>
                        <tspan x="-1.71" y="21.6">
                            communi
                        </tspan>
                        <tspan
                            x="81.45"
                            y="21.6"
                            style={{ letterSpacing: '-0.02001953125em' }}
                        >
                            t
                        </tspan>
                        <tspan x="89.01" y="21.6">
                            y
                        </tspan>
                    </tspan>
                </text>
                <polyline
                    points="178.94 118.37 178.94 20.37 252.94 20.37"
                    style={{
                        fill: 'none',
                        stroke: '#81c3e3',
                        strokeMiterlimit: 10,
                    }}
                />
                <polyline
                    points="460.94 185.37 460.94 87.37 534.95 87.37"
                    style={{
                        fill: 'none',
                        stroke: '#81c3e3',
                        strokeMiterlimit: 10,
                    }}
                />
                <text
                    transform="translate(475.88 119.59) rotate(-0.33)"
                    className="font-russo-one"
                    style={{ fontSize: '18px', fill: '#30b29b' }}
                >
                    Wande
                    <tspan
                        x="61.83"
                        y="0"
                        style={{ letterSpacing: '-0.02001953125em' }}
                    >
                        r
                    </tspan>
                    <tspan x="69.75" y="0">
                        ers
                    </tspan>
                    <tspan style={{ fill: '#17b4ea' }}>
                        <tspan x="0" y="21.6">
                            season 1
                        </tspan>
                    </tspan>
                </text>
                <text
                    transform="translate(631.21 27.14)"
                    className="font-russo-one"
                    style={{ fontSize: '18px', fill: '#30b29b' }}
                >
                    Wande
                    <tspan
                        x="61.83"
                        y="0"
                        style={{ letterSpacing: '-0.02001953125em' }}
                    >
                        r
                    </tspan>
                    <tspan x="69.75" y="0">
                        ers
                    </tspan>
                    <tspan style={{ fill: '#17b4ea' }}>
                        <tspan x="18.18" y="21.6">
                            season 2
                        </tspan>
                    </tspan>
                </text>
                <polyline
                    points="739.46 98.5 739.46 0.5 665.46 0.5"
                    style={{
                        fill: 'none',
                        stroke: '#81c3e3',
                        strokeMiterlimit: 10,
                    }}
                />
                <g style={{ opacity: '0.699997007846832' }}>
                    <path
                        d="M8,136.37s86-33,168-11c136.36,36.59,307.49,113.83,415,58,171.63-89.11,195-86,195-86"
                        transform="translate(-7 -10.25)"
                        style={{
                            fill: 'none',
                            stroke: '#81c3e3',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            strokeWidth: '2px',
                        }}
                    />
                </g>
                {rects.map(({ id, rectProps, tooltipProps }) => (
                    <Tooltip
                        key={`rect-${id}`}
                        color="rgba(0,0, 0, 0.5)"
                        title={() => (
                            <div className="text-xl py-2 px-2">
                                {tooltipProps?.text}
                            </div>
                        )}
                        {...tooltipProps}
                    >
                        <rect
                            onMouseEnter={() => onSelectedKey(id)}
                            {...rectProps}
                            style={{
                                fill:
                                    selectedKey === id ? '#17b4ea' : '#cee8e8',
                            }}
                        />
                    </Tooltip>
                ))}
            </svg>
        </div>
    )
}

RoadMapSVG.propTypes = {}

export default RoadMapSVG

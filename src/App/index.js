import React from 'react'
import Router from '../Router'
// import useConnect from '../hooks/useConnect'
import '../styles/App.less'
// import { Widget } from '@maticnetwork/wallet-widget'

// import LandingPage from '../views/LandingPage'
// import useDeactivateListener from './../hooks/useDeactivateListener'
// import useEffectOnce from './../hooks/useEffectOnce'
// import MarketView from '../views/MarketView'
// import DefaultLayout from './../components/Layouts/DefaultLayout'
// const widget = new Widget({
//     target: '#ethBridge',
//     appName: 'The_wanderers_bridge',
//     autoShowTime: 0,
//     position: 'center',
//     height: 630,
//     width: 540,
//     overlay: false,
//     network: 'mainnet',
//     closable: true,
// })

const App = () => {
    // useConnect()
    // useDeactivateListener()
    // useEffectOnce(() => widget.create())

    return (
        <React.Fragment>
            <Router />
        </React.Fragment>
    )
}

export default App

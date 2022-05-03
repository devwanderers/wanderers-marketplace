import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
// import { MoralisProvider } from 'react-moralis'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

import App from './App'
// import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
import reportWebVitals from './reportWebVitals'
import configureStore from './store/config/index'

const store = configureStore()

function getLibrary(provider) {
    return new Web3(provider)
}

// const MORALIS_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID
// const MORALIS_URL = process.env.REACT_APP_MORALIS_SERVER_URL

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>
                {/* <MoralisProvider serverUrl={MORALIS_URL} appId={MORALIS_ID}> */}
                <Web3ReactProvider getLibrary={getLibrary}>
                    <App />
                </Web3ReactProvider>
                {/* </MoralisProvider> */}
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

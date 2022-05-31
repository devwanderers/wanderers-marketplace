import React from 'react'
import Router from '../Router'

import useConnect from './../hooks/useConnect'
import '../styles/App.less'
// import useResetState from './../hooks/useResetState'

const App = (props) => {
    // useResetState()
    useConnect()

    return <Router />
}

export default App

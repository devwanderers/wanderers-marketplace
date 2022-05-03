import React from 'react'
import Router from '../Router'

import useConnect from './../hooks/useConnect'
import '../styles/App.less'

const App = (props) => {
    useConnect()

    return <Router />
}

export default App

import React from 'react'
import Router from '../Router'

import useConnect from './../hooks/useConnect'
import '../styles/App.less'
// import useResetState from './../hooks/useResetState'
import { useFetchNftAvatars } from './../store/reducers/nftAvatars/hooks'
import { useFetchProfile } from './../store/reducers/profile/hook'

const App = (props) => {
    useConnect()
    useFetchProfile()
    useFetchNftAvatars()

    return <Router />
}

export default App

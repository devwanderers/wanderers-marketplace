import React from 'react'
import Router from '../Router'

import useConnect from './../hooks/useConnect'
import '../styles/App.less'
// import useResetState from './../hooks/useResetState'
import { useFetchNftAvatars } from './../store/reducers/nftAvatars/hooks'
import { useFetchProfile } from './../store/reducers/profile/hook'
// import { useFetchTokenSecondSeasonClaim } from './../store/reducers/secondSeasonClaim/hook'

const App = (props) => {
    useConnect()
    useFetchProfile()
    useFetchNftAvatars()
    // useFetchTokenSecondSeasonClaim()

    return <Router />
}

export default App

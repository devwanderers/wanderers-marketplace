import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import globalTypes from './globalTypes'
import scInteractionReducer from './scInteractionReducer/scInteractionReducer'
import siteInteractionReducer from './siteInteraction/siteInteractionReducer'
import nftAvatars from './nftAvatars/nftAvatarsReducer'
import nfts from './nfts/nftsReducer'
import profile from './profile/profileReducer'
import places from './places/placesReducer'
// import secondSeasonClaim from './secondSeasonClaim/secondSeasonClaimReducer'

const persistKey = 'rootNM'

const persistConfig = {
    key: persistKey,
    storage,
    whitelist: [],
}

const appReducer = combineReducers({
    scInteraction: scInteractionReducer,
    siteInteraction: siteInteractionReducer,
    nftAvatars,
    nfts,
    profile,
    places,
    // secondSeasonClaim,
})

const rootReducer = (state, action) => {
    if (action.type === globalTypes.LOG_OUT) {
        storage.removeItem(`persist:${persistKey}`)
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default persistReducer(persistConfig, rootReducer)

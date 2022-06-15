import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DefaultLayout from '../components/Layouts/DefaultLayout'
import MarketView from './../views/MarketView'
import MarketNftDetailView from './../views/MarketNftDetailView'
import Profile from './../views/Profile'
// import EditMarkers from './../views/EditMarkers'

const AppRouter = (props) => {
    return (
        <Routes>
            <Route path={'/'} element={<DefaultLayout hideFooter />}>
                <Route index element={<MarketView />} />
                {/* <Route path="edit" element={<EditMarkers />} /> */}
                <Route path="detail/:id" element={<MarketNftDetailView />} />
                <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default AppRouter

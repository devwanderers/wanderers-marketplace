import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../actions'
import { visibleWalletDrawerSelector } from '../selectors'

const useWalletDrawer = (props) => {
    const dispatch = useDispatch()

    const visibleWalletDrawer = useSelector(visibleWalletDrawerSelector)
    const openWalletDrawer = useCallback(
        () => dispatch(actions.openWalletDrawer()),
        []
    )

    const closeWalletDrawer = useCallback(
        () => dispatch(actions.closeWalletDrawer()),
        [dispatch]
    )

    return { visibleWalletDrawer, openWalletDrawer, closeWalletDrawer }
}

export default useWalletDrawer

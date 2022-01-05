const INITIAL_STATE = {
    fetching: false,
    address: '',
    web3: null,
    provider: null,
    connected: false,
    chainId: 1,
    networkId: 1,
    assets: [],
    showModal: false,
    pendingRequest: false,
    result: null,
}

export const web3Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case '': {
            console.log('HEllo World')
        }
    }
}

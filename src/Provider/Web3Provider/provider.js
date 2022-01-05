// import { useCallback, useEffect, useReducer } from 'react'
// import Web3 from 'web3'
// import { useLocalStorage } from '../../hooks/useStorage'
// import { Web3Context } from './context'

// const initWeb3 = (provider) => {
//     const web3 = new Web3(provider)

//     web3.eth.extend({
//         methods: [
//             {
//                 name: 'chainId',
//                 call: 'eth_chainId',
//                 outputFormatter: web3.utils.hexToNumber,
//             },
//         ],
//     })
//     return web3
// }

// export const Web3Provider = ({ children }) => {
//     // Debo iniciar la instancia de web3modal
//     // Esta necesita la red a la que esta conectada el usuario, y las opciones de los providers que son los providers de las diferentes carteras a las que se podra conectar el usuario

//     const connectWallet = async () => {
//         // Llamar la funcionde connect de web3Modal  este regresara el provider de la wallet seleccionada
//         // Al tener el provider de la wallet inicializaremos los eventos del provider
//         // Inicializar web3 para hacer traer las cuentas seleccionadas, la red actual y el id de la cadena
//         // Llamar la funcion de dispatch para guardar los datos
//         // Ya obtenido la cuenta podremos llamar a la funcion que nos regresara los assets actuales del usuario
//     }
//     // Si el usuario ya se ha loggeado con anterioridad se llamara automaticamente la funcion de connectWallet para iniciar sesion

//     return (
//         <Web3Context.Provider value={{ connectWallet }}>
//             {children}
//         </Web3Context.Provider>
//     )
// }

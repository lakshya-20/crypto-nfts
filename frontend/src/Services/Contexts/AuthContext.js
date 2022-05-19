import { createContext, useEffect, useReducer } from "react";
import { authStateDisableWeb3, authStateEnableWeb3, authStateFailed, authStateLogin, authStateLogout } from "../Actions/AuthActionCreator";
import { authReducuer } from "../Reducers/AuthReducer";
import Web3 from "web3";
import Toast from "../../Components/Toast";
const axios = require('axios');

export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(authReducuer, {
    isLoading: false,
    errMess: null,
    isWeb3Enabled: false,
    isLoggedin: false,
    address: null,
    formattedAddress: null,
    silverCoins: 0, 
    goldCoins: 0
  })

  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      authDispatch(authStateEnableWeb3());
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
      authDispatch(authStateEnableWeb3());
    }
    else {
      const errMess = "Non-Ethereum browser detected";
      authDispatch(authStateFailed(errMess));
      authDispatch(authStateDisableWeb3());
      Toast("error", errMess);
      throw new Error(errMess);
    }
  }, [])

  const login = async () => {
    if(authState.isWeb3Enabled){
      try{
        const accounts = await window.web3.eth.getAccounts();
        const current_account = accounts[0];
        let response = await axios.get(`http://localhost:5000/api/user/${current_account}/nonce`);
        const nonce = response.data.nonce;
        const signature = await window.web3.eth.personal.sign(
          `I am signing my one-time nonce: ${nonce}`, 
          current_account
        );
        response = await axios.post(`http://localhost:5000/api/user/${current_account}/signature`, {signature});
        localStorage.setItem('jwt', response.data.token);
        authDispatch(authStateLogin(current_account, 0, 0));
        Toast("success", "Successfully Logged in!")
      } catch(err) {
        Toast("error", err.message);
      }
    }
  }

  const logout = () => {
    try{
      authDispatch(authStateLogout());
      localStorage.removeItem('jwt');
      Toast("success", "Successfully Logged out!");
    } catch( error ){
      Toast("error", error.message);
    }
  }

  return (
    <AuthContext.Provider value={{authState, authDispatch, login, logout}}>
      {children}
    </AuthContext.Provider>
  )

}
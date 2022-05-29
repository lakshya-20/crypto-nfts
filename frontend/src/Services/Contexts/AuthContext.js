import { createContext, useEffect, useReducer } from "react";
import { authStateCoinContract, authStateDisableWeb3, authStateEnableWeb3, authStateFailed, authStateLogin, authStateLogout, authStateSetCoins, authStateSetUser } from "../Actions/AuthActionCreator";
import { authReducuer } from "../Reducers/AuthReducer";
import Web3 from "web3";
import Toast from "../../Components/Toast";
import axios from 'axios';
import CoinContract from '../../Assets/ABI/Coin.json';
import { formattedAddress } from "../Utils/user";

export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(authReducuer, {
    isLoading: false,
    errMess: null,
    isWeb3Enabled: false,
    isLoggedin: false,
    address: null,
    formattedAddress: null,
    user: null,
    coinContract: null, 
    silverCoins: 0, 
    goldCoins: 0
  })

  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      authDispatch(authStateEnableWeb3());
      loadCoinContract();
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
      authDispatch(authStateEnableWeb3());
      loadCoinContract();
    }
    else {
      const errMess = "Non-Ethereum browser detected, try installing Metamask";
      authDispatch(authStateFailed(errMess));
      authDispatch(authStateDisableWeb3());
      throw new Error(errMess);
    }
  }, [])

  useEffect(() => {
    if(authState.isWeb3Enabled){
      (async () => {
        const jwt = localStorage.getItem('jwt');
        const user = JSON.parse(localStorage.getItem('user'));
        const accounts = await window.web3.eth.getAccounts();
        const current_account = accounts[0];
        if(jwt && user) {
          authDispatch(authStateLogin(current_account, formattedAddress(current_account)));
          authDispatch(authStateSetUser(user));
        }
      })();
    }
  }, [authState.isWeb3Enabled])

  useEffect(() => {
    if(authState.isLoggedin && authState.coinContract) {
      (async () => {
        await loadUserCoins();
      })();
    }
  }, [authState.isLoggedin, authState.coinContract])

  const loadCoinContract = async () => {
    const networkId = await window.web3.eth.net.getId();
    const coinContract = new window.web3.eth.Contract(CoinContract.abi, CoinContract.networks[networkId].address);
    authDispatch(authStateCoinContract(coinContract));
  }

  const loadUserCoins = async () => {
    const silverCoins = parseInt(await authState.coinContract.methods.balanceOf(authState.address, 1).call());
    const goldCoins = parseInt(await authState.coinContract.methods.balanceOf(authState.address, 0).call());
    authDispatch(authStateSetCoins(silverCoins, goldCoins));
  }
  const login = async () => {
    if(authState.isWeb3Enabled){
      try{
        const accounts = await window.web3.eth.getAccounts();
        const current_account = accounts[0];
        let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${current_account}/nonce`);
        const nonce = response.data.nonce;
        const signature = await window.web3.eth.personal.sign(
          `I am signing my one-time nonce: ${nonce}`,
          current_account
        );
        response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/${current_account}/signature`, {signature});
        localStorage.setItem('jwt', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        authDispatch(authStateLogin(current_account, formattedAddress(current_account)));
        authDispatch(authStateSetUser(response.data.user));
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
      localStorage.removeItem('user');
      Toast("success", "Successfully Logged out!");
    } catch( error ){
      Toast("error", error.message);
    }
  }

  const register = async (name, img) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/${authState.address}/register`, {
        name,
        img
      });
      authDispatch(authStateSetUser(response.data.user));
    } catch(err){
      Toast("error", err.message);
    }
  }

  return (
    <AuthContext.Provider value={{authState, authDispatch, login, logout, register, loadUserCoins}}>
      {children}
    </AuthContext.Provider>
  )

}
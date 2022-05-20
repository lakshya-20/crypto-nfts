import * as ActionTypes from '../Constants/ActionTypes';

export const authReducuer = (state, action) => {
  switch(action.type){
    case ActionTypes.AUTH_STATE_LOADING:
      return {
        ...state, 
        isLoading: true, 
        errMess: null, 
        isLoggedin: false, 
        address: null, 
        formattedAddress: null,
        silverCoins: 0,
        goldCoins: 0,
      }
    case ActionTypes.AUTH_STATE_FAILED:
      return {
        ...state, 
        isLoading: false, 
        errMess: action.payload, 
        isLoggedin: false, 
        address: null, 
        formattedAddress: null,
        silverCoins: 0,
        goldCoins: 0,
      }
    case ActionTypes.AUTH_STATE_LOGIN:
      return {
        ...state, 
        isLoading: false, 
        errMess: null, 
        isLoggedin: true, 
        address: action.payload.address, 
        formattedAddress: action.payload.formattedAddress
      }
    case ActionTypes.AUTH_STATE_LOGOUT:
      return {
        ...state, 
        isLoading: false, 
        errMess: null, 
        isLoggedin: false, 
        address: null, 
        formattedAddress: null, 
        user: null, 
        coinContract: null, 
        silverCoins: 0, 
        goldCoins: 0,
      }
    case ActionTypes.AUTH_STATE_SET_USER:
      return {
        ...state,
        user: action.payload.user,
      }
    case ActionTypes.AUTH_STATE_ENABLE_WEB3:
      return {
        ...state, 
        isWeb3Enabled: true
      }
    case ActionTypes.AUTH_STATE_DISABLE_WEB3:
      return {
        ...state, 
        isWeb3Enabled: false
      }

    case ActionTypes.AUTH_STATE_COIN_CONTRACT:
      return {
        ...state,
        coinContract: action.payload.contract
      }

    case ActionTypes.AUTH_STATE_SET_COINS:
      return {
        ...state,
        silverCoins: action.payload.silverCoins,
        goldCoins: action.payload.goldCoins
      }

    case ActionTypes.AUTH_STATE_INCREASE_SILVER_COIN:
      return {
        ...state,
        silverCoins: state.silverCoins + action.payload.amount
      }
    case ActionTypes.AUTH_STATE_DECREASE_SILVER_COIN:
      return {
        ...state,
        silverCoins: state.silverCoins - action.payload.amount
      }
    case ActionTypes.AUTH_STATE_INCREASE_GOLD_COIN:
      return {
        ...state,
        goldCoins: state.goldCoins + action.payload.amount
      }
    case ActionTypes.AUTH_STATE_DECREASE_GOLD_COIN:
      return {
        ...state,
        goldCoins: state.goldCoins - action.payload.amount
      }
  }
}
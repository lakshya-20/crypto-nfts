import * as ActionTypes from '../Constants/ActionTypes';

export const authStateFailed = (error) => ({
  type: ActionTypes.AUTH_STATE_FAILED,
  payload: error
})

export const authStateEnableWeb3 = () => ({
  type: ActionTypes.AUTH_STATE_ENABLE_WEB3
})

export const authStateDisableWeb3 = () => ({
  type: ActionTypes.AUTH_STATE_DISABLE_WEB3
})

export const authStateLogin = (address, formattedAddress) => ({
  type: ActionTypes.AUTH_STATE_LOGIN,
  payload: { address, formattedAddress }
})

export const authStateLogout = () => ({
  type: ActionTypes.AUTH_STATE_LOGOUT
})

export const authStateSetUser = (user) => ({
  type: ActionTypes.AUTH_STATE_SET_USER,
  payload: { user }
})

export const authStateCoinContract  = (contract) => ({
  type: ActionTypes.AUTH_STATE_COIN_CONTRACT,
  payload: { contract }
})

export const authStateSetCoins = (silverCoins, goldCoins) => ({
  type: ActionTypes.AUTH_STATE_SET_COINS,
  payload: { silverCoins, goldCoins }
})

export const authStateIncreaseSilverCoin = (amount) => ({
  type: ActionTypes.AUTH_STATE_INCREASE_SILVER_COIN,
  payload: { amount }
})

export const authStateDecreaseSilverCoin = (amount) => ({
  type: ActionTypes.AUTH_STATE_DECREASE_SILVER_COIN,
  payload: { amount }
})

export const authStateIncreaseGoldCoin = (amount) => ({
  type: ActionTypes.AUTH_STATE_INCREASE_GOLD_COIN,
  payload: { amount }
})

export const authStateDecreaseGoldCoin = (amount) => ({
  type: ActionTypes.AUTH_STATE_DECREASE_GOLD_COIN,
  payload: { amount }
})
import { useContext } from "react";
import { authStateIncreaseGoldCoin, authStateIncreaseSilverCoin } from "../../Services/Actions/AuthActionCreator";
import { AuthContext } from "../../Services/Contexts/AuthContext";

const SideNav = () => {
  const {authState, authDispatch} = useContext(AuthContext);

  const buySilver = async (amount) => {
    if(authState.coinContract){
      try{
        const response = await authState.coinContract.methods.buySilver(amount).send({
          from: authState.address,
          value: window.web3.utils.toWei(((1/100)*amount).toString(), 'ether'),
        });
        authDispatch(authStateIncreaseSilverCoin(amount));
      } catch(err){
        console.log(err.message);
      }
    }
  }

  const buyGold = async (amount) => {
    if(authState.coinContract){
      try{
        const response = await authState.coinContract.methods.buyGold(amount).send({
          from: authState.address,
          value: window.web3.utils.toWei(((1/10)*amount).toString(), 'ether'),
        });
        authDispatch(authStateIncreaseGoldCoin(amount));
      } catch(err){
        console.log(err.message);
      }
    }
  }


  return (
    <div>
      Side Nav Layout
      <div>
        Silver Coins: {authState.silverCoins}
        <button onClick={() => buySilver(10)}>Mint Silver</button>
      </div>
      <div>
        Gold Coins: {authState.goldCoins}
        <button onClick={() => buyGold(1)}>Mint Gold</button>
      </div>
    </div>
  )
}
export default SideNav;
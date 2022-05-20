import { useContext, useState } from "react";
import { authStateIncreaseGoldCoin, authStateIncreaseSilverCoin } from "../../Services/Actions/AuthActionCreator";
import { AuthContext } from "../../Services/Contexts/AuthContext";
import '../../Assets/Styles/SideNav.Layout.css';
import { BiCoin } from "react-icons/bi";
import { BsStars } from "react-icons/bs"
import {InputGroup, Input, InputGroupText} from 'reactstrap';

const SideNav = () => {
  const {authState, authDispatch} = useContext(AuthContext);

  const buySilver = async (amount) => {
    if(authState.coinContract){
      amount = parseInt(amount);
      try{
        const response = await authState.coinContract.methods.buySilver(amount).send({
          from: authState.address,
          value: window.web3.utils.toWei(((1/100)*amount).toString(), 'ether'),
        });
        authDispatch(authStateIncreaseSilverCoin(amount));
        document.getElementById("silver_coin_input").value = "";
      } catch(err){
        console.log(err.message);
      }
    }
  }

  const buyGold = async (amount) => {
    if(authState.coinContract){
      amount = parseInt(amount);
      try{
        const response = await authState.coinContract.methods.buyGold(amount).send({
          from: authState.address,
          value: window.web3.utils.toWei(((1/10)*amount).toString(), 'ether'),
        });
        authDispatch(authStateIncreaseGoldCoin(amount));
        document.getElementById("gold_coin_input").value = "";
      } catch(err){
        console.log(err.message);
      }
    }
  }


  return (
    <div className="wrapper">
      <div className="user-wrapper">
        <div className="d-flex align-items-center justify-content-between">
          <img 
            src={ authState.user && authState.user.isRegistered?
              authState.user.img
              :
              "https://res.cloudinary.com/dstmsi8qv/image/upload/v1589896899/c1lfv7nmmjva48wia4a7.png"
            }
            width="50px"
            height="50px"
            className="user-image"
          />
          <span>
            <span className="user-name">
            {authState.user && authState.user.isRegistered? authState.user.name : "User"}
            </span>
            <br/>
            <span className="user-label">
              NFTer
            </span>
          </span>
          <span className="user-badge">
            Pro+
          </span>
        </div>
      </div>
      <div className="balance-wrapper">
        <div className="balance-card">
          <span className="balance-heading">
            Your Balance
          </span>
          <p>
            <span className="balance-amount">
              {authState.silverCoins}
            </span>
            <br/>
            <span className="balance-title d-flex align-items-center justify-content-center">
              <BiCoin className="coin-icon coin-silver-icon"/> &nbsp; Silver
            </span>
          </p>
          <p>
            <span className="balance-amount">
              {authState.goldCoins}
            </span>
            <br/>
            <span className="balance-title d-flex align-items-center justify-content-center">
              <BiCoin className="coin-icon coin-gold-icon"/> &nbsp; Gold
            </span>
          </p>
        </div>
      </div>
      <div className="top-up-wrapper">
        <div className="top-up-heading d-flex align-items-center">
          <BsStars/>&nbsp;&nbsp;<span>Top Up Balance</span>
        </div>
        <br/>
        <div>
          <div className="">
            <InputGroup>
              <Input placeholder="Silver" id="silver_coin_input"/>
              <InputGroupText onClick={() => buySilver(document.getElementById("silver_coin_input").value)} type="button">
                Mint
              </InputGroupText>
            </InputGroup>
            <hr/>
            <InputGroup>
              <Input placeholder="Gold" id="gold_coin_input"/>
              <InputGroupText onClick={() => buyGold(document.getElementById("gold_coin_input").value)} type="button">
                Mint
              </InputGroupText>
            </InputGroup>
          </div>
        </div>
        {/* <button onClick={() => buySilver(10)}>Mint Silver</button>
        <button onClick={() => buyGold(1)}>Mint Gold</button> */}
      </div>
    </div>
  )
}
export default SideNav;
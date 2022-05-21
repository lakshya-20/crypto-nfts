import { formattedAddress } from "../../Services/Utils/user";
import { BiCoin } from "react-icons/bi";
import '../../Assets/Styles/NFT.Card.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Services/Contexts/AuthContext";
import { ipfs_json_downloader } from "../../Services/Utils/ipfs";
import axios from "axios";
import {FcCollect} from 'react-icons/fc';
import BuyNFTModal from "../Modals/BuyNFT.Modal";

const NFT = ({tokenId, loadNFTs}) => {
  const { authState } = useContext(AuthContext);
  const [nft_data, set_nft_data] = useState({
    name: "Alt NFT",
    description: "Alt NFT...",
    image: "https://res.cloudinary.com/dstmsi8qv/image/upload/v1589736919/oamn4rld04equ2zptpge.jpg",
    price: {
     "silver": 1,
     "gold": 10
    },
    owner: {
      address: "3423946783462983749283",
      name: "dfjsldkfs",
      img: "https://res.cloudinary.com/dstmsi8qv/image/upload/v1640364233/b9oidx3ztk3lhmkryveo.png"
    }
  });
  const [isBuyNFTModalOpen, setIsBuyNFTModalOpen] = useState(false);
  const toggleIsBuyNFTModalOpen = () => setIsBuyNFTModalOpen(!isBuyNFTModalOpen);

  useEffect(() => {
    (async () => {
      if(authState.coinContract){
        const tokenInfo = await authState.coinContract.methods.getTokenInfo(tokenId).call();
        const nft_data = await ipfs_json_downloader(tokenInfo.uri);
        const response = await axios.get(`http://localhost:5000/api/user/${tokenInfo.owner}`);
        nft_data["owner"] = {
          address: tokenInfo.owner,
          name: response.data.user.name,
          img: response.data.user.img
        }
        nft_data["tokenId"] = tokenId;
        set_nft_data(nft_data);
      }
    })();
  }, [])

  return (
    <div className="nft-card">
      <div className="nft-card-top-wrapper">
        <div className={`nft-card-image-wrapper ${nft_data.owner.address != authState.address? "non-owner-nft": null}`}>
          <div className="nft-buy-button-wrapper">
            <div className="nft-buy-button d-flex justify-content-center align-items-center"
              onClick={toggleIsBuyNFTModalOpen}
              type="button"
            >
              <FcCollect/>
              <BuyNFTModal 
                nft_data={nft_data} 
                isModalOpen={isBuyNFTModalOpen} 
                toggleModal={toggleIsBuyNFTModalOpen}
                loadNFTs={loadNFTs}
              />
            </div>
          </div>
          <img src={nft_data.image} width="230px" height="200px" className="nft-image"/>
        </div>
        <div className="nft-about">
          <div className="d-flex justify-content-between align-items-center">
            <div className="row">
              <span className="nft-heading">{nft_data.name}</span>
              <span className="nft-owner-address">{formattedAddress(nft_data.owner.address)}</span>
            </div>
            <img src={nft_data.owner.img} width="40px" height="40px" className="nft-owner-image"/>
          </div>
        </div>
      </div>
      <div className="nft-card-bottom-wrapper">
        <span className="nft-price-heading">Current Price</span>
        <div className="d-flex justify-content-between align-items-center">
          {nft_data.price["silver"] !=0 ? 
            <span className="nft-price d-flex align-items-center">
              <BiCoin className="coin-icon coin-silver-icon"/> {nft_data.price["silver"]}
            </span>
          :
            null
          }
          {nft_data.price["gold"] !=0 ? 
            <span className="nft-price d-flex align-items-center">
              <BiCoin className="coin-icon coin-gold-icon"/> {nft_data.price["gold"]}
            </span>
          :
            null
          }
        </div>
      </div>
    </div>
  )
}
export default NFT;
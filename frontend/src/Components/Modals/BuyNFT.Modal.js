import { useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { AuthContext } from "../../Services/Contexts/AuthContext";
import {BiCoin} from 'react-icons/bi';
import {TiTick} from 'react-icons/ti';
import {ImCross} from 'react-icons/im';
import '../../Assets/Styles/BuyNFT.Modal.css';
import Toast from "../Toast";

const BuyNFTModal = ({nft_data, isModalOpen, toggleModal, loadNFTs}) => {
  const { authState, loadUserCoins } = useContext(AuthContext);
  const [selectedCoinType, setSelectedCoinType] = useState(null);
  const isSilverEnabled = authState.silverCoins >= nft_data.price.silver;
  const isGoldEnabled = authState.goldCoins >= nft_data.price.gold;

  const buy = async () => {
    try {
      const coinId = selectedCoinType === "silver"? 1: 0;
      await authState.coinContract.methods.buyToken(
        nft_data.owner.address, 
        authState.address, 
        nft_data.tokenId, 
        coinId,
        nft_data.price[selectedCoinType]
      ).send({
        from: authState.address,
      });
      toggleModal();
      await loadUserCoins();
      await loadNFTs();
      Toast("success", "You bought the NFT successfully!");
    } catch(err) {
      Toast("error", "Something went wrong!");
    }
  }

  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={toggleModal} className="modal-dialog-centered">
        <ModalHeader>Buy {nft_data.name}</ModalHeader>
        <ModalBody>
          <div className="col-12 d-flex justify-content-around align-items-center">
            {nft_data.price.silver !=0 ?
              <div 
                className={`
                  col-5 coin-wrapper 
                  ${!isSilverEnabled? "coin-wrapper-disabled": null}
                  ${selectedCoinType === "silver"? "coin-wrapper-selected": null}
                `}
                type={isSilverEnabled? "button": null}
                onClick={() => {
                  if(isSilverEnabled) setSelectedCoinType("silver");
                }}
              >
                <div className="coin-label">
                  <BiCoin className="coin-icon coin-silver-icon"/> &nbsp; Silver
                </div>
                <div className="coin-amount">
                  {nft_data.price.silver}
                </div>
                <div className="coin-balance-status">
                  {isSilverEnabled?
                    <span className="text-success"> <TiTick/> Balance </span>
                  : 
                    <span className="text-danger"> <ImCross/> Low Balance</span>
                  }
                </div>
              </div>
            : null}
            {nft_data.price.gold!=0 ?
              <div 
                className={`
                  col-5 coin-wrapper 
                  ${!isGoldEnabled? "coin-wrapper-disabled": null}
                  ${selectedCoinType === "gold"? "coin-wrapper-selected": null}
                `}
                type={isGoldEnabled? "button": null}
                onClick={() => {
                  if(isGoldEnabled) setSelectedCoinType("gold");
                }}
              >
                <div className="coin-label">
                  <BiCoin className="coin-icon coin-gold-icon"/> &nbsp; Gold
                </div>
                <div className="coin-amount">
                  {nft_data.price.gold}
                </div>
                <div className="coin-balance-status">
                  {isGoldEnabled?
                    <span className="text-success"> <TiTick/> Balance </span>
                  : 
                    <span className="text-danger"> <ImCross/> Low Balance</span>
                  }
                </div>
              </div>
            : null }
          </div>
        </ModalBody>
        <ModalFooter>
          <Button 
            onClick={buy}
            disabled={!selectedCoinType}
          > Buy </Button>
          <Button onClick={() => {
            toggleModal();
            setSelectedCoinType(null);
          }}> Cancel </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
export default BuyNFTModal;
import { useContext, useState } from 'react';
import {Button, Input, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { ipfs_uploader } from '../../Services/Utils/ipfs';
import Loading from '../Loading';
import Toast from '../Toast';
import '../../Assets/Styles/AddNFT.Modal.css';
import { BiCoin } from 'react-icons/bi';
import { AuthContext } from '../../Services/Contexts/AuthContext';
import { generate_nft_id } from '../../Services/Utils/nft';

const AddNFTModal = ({isModalOpen, toggleModal, loadNFTs}) => {
  const { authState } = useContext(AuthContext);
  const [nftData, setNftData] = useState({
    name: "",
    description: "",
    image: {
      isLoading: false,
      url: "",
    },
    price: {
      silver: {
        enabled: false,
        amount: 0,
      },
      gold: {
        enabled: false,
        amount: 0,
      }
    }
  })

  const addNFT = async () => {
    try{
      const data = {
        name: nftData.name,
        description: nftData.description,
        image: nftData.image.url,
        price: {
          "gold": nftData.price.gold.enabled ? nftData.price.gold.amount : 0,
          "silver": nftData.price.silver.enabled ? nftData.price.silver.amount : 0,
        }
      }
      const metadata_uri = await ipfs_uploader(JSON.stringify(data));
      const response = await authState.coinContract.methods.addToken(generate_nft_id(), metadata_uri).send({from: authState.address});
      toggleModal();
      await loadNFTs();
      Toast("success", "NFT would be listed soon");
    } catch(err){
      Toast("error", "Something went wrong!");
    }
  }

  return (
    <Modal isOpen={isModalOpen} toggle={toggleModal} className="modal-dialog-centered">
      <ModalHeader>Add Your NFT</ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-center">
          {nftData.image.isLoading ?
            <Loading pageCenter={false}/>
          : null
          }
          {nftData.image.url ?
            <img src={nftData.image.url} alt="user image" width="60%"/>
          : null
          }
        </div>
        <InputGroup>
          <Input
            type="file"
            onChange={async (e) => {
              setNftData(prevState => ({
                ...prevState,
                image: {
                  isLoading: true,
                }
              }));
              const file = e.target.files[0];
              try{
                const img_url = await ipfs_uploader(file);
                setNftData(prevState => ({
                  ...prevState,
                  image: {
                    url: img_url,
                    isLoading: false,
                  }
                }))
              } catch (err){
                Toast("error", "Error uploading image");
              }
            }}
          />
        </InputGroup>
        <br/>
        <InputGroup>
          <InputGroupText>Name</InputGroupText>
          <Input
            placeholder='NFT name'
            onChange={(e) => setNftData(prevState => ({
              ...prevState,
              name: e.target.value
            }))}
          />
        </InputGroup>
        <br/>
        <InputGroup>
          <InputGroupText>Description</InputGroupText>
          <Input
            placeholder='NFT Description...'
            onChange={(e) => setNftData(prevState => ({
              ...prevState,
              description: e.target.value
            }))}
          />
        </InputGroup>
        <br/>
        <span>Decide price</span>
        <div className='d-flex justify-content-around text-center'>
          <div 
            className={`col-5 add-nft-price-wrapper ${nftData.price.silver.enabled? "add-nft-price-wrapper-selected": null}`}
          >
            <span
              className='add-nft-price-label'
              onClick={() => setNftData(prevState => ({
                ...prevState,
                price: {
                  ...nftData.price,
                  silver: {
                    enabled: !nftData.price.silver.enabled,
                    amount: 0,
                  }
                }
              }))}
              type="button"
            >
              <BiCoin className="coin-icon coin-silver-icon"/> &nbsp; Silver
            </span>
            <br/>
            {nftData.price.silver.enabled ?
              <InputGroup className='add-nft-price-input'>
                <Input
                  placeholder='Price'
                  onChange={(e) => setNftData(prevState => ({
                    ...prevState,
                    price: {
                      ...nftData.price,
                      silver: {
                        ...nftData.price.silver,
                        amount: e.target.value
                      }
                    }
                  }))}
                />
              </InputGroup>
            : null
            }
          </div>
          <div 
            className={`col-5 add-nft-price-wrapper ${nftData.price.gold.enabled? "add-nft-price-wrapper-selected": null}`}
          >
            <span
              className='add-nft-price-label'
              onClick={() => setNftData({
                ...nftData,
                price: {
                  ...nftData.price,
                  gold: {
                    enabled: !nftData.price.gold.enabled,
                    amount: 0,
                  }
                }
              })}
              type="button"
            >
              <BiCoin className="coin-icon coin-gold-icon"/> &nbsp; Gold
            </span>
            <br/>
            {nftData.price.gold.enabled ?
              <InputGroup className='add-nft-price-input'>
                <Input
                  placeholder='Price'
                  onChange={(e) => setNftData({
                    ...nftData,
                    price: {
                      ...nftData.price,
                      gold: {
                        ...nftData.price.gold,
                        amount: e.target.value
                      }
                    }
                  })}
                />
              </InputGroup>
            : null
            }
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={addNFT}>Add</Button>
        <Button onClick={() => {
          setNftData({
            name: "",
            description: "",
            image: {
              isLoading: false,
              url: "",
            },
            price: {
              silver: {
                enabled: false,
                amount: 0,
              },
              gold: {
                enabled: false,
                amount: 0,
              }
            }
          });
          toggleModal();
        }}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}
export default AddNFTModal;
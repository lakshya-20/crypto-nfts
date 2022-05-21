import '../../Assets/Styles/NFT.Card.css';
import {MdOutlineLibraryAdd} from 'react-icons/md';
import AddNFTModal from '../Modals/AddNFT.Modal';
import { useState } from 'react';
const AddNFT = ({loadNFTs}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggelModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  return (
    <div 
      className="add-nft-wrapper d-flex justify-content-center align-items-center" 
      type="button"
      onClick={toggelModal}
    >
      <MdOutlineLibraryAdd className='add-nft-icon'/>
      <AddNFTModal isModalOpen = {isModalOpen} toggleModal={toggelModal} loadNFTs={loadNFTs}/>
    </div>
  )
}

export default AddNFT;
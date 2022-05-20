import '../../Assets/Styles/Main.Layout.css';
import Carousel from "react-multi-carousel";
import NFT from '../../Components/Cards/NFT';
import AddNFT from '../../Components/Cards/AddNFT';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Services/Contexts/AuthContext';
const Main  = () => {
  const {authState} = useContext(AuthContext);
  const [nftIds, setNftIds] = useState([]);
  const [ownerNftIds, setOwnerNftIds] = useState([]);
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  useEffect(() => {
    (async () => {
      if(authState.coinContract) {
        setNftIds(await authState.coinContract.methods.getTokenIds().call());
      }
    })();
  }, [authState.coinContract])

  useEffect(() => {
    (async () => {
      if(authState.isLoggedin && authState.coinContract) {
        setOwnerNftIds(await authState.coinContract.methods.getOwnerTokenIds(authState.address).call());
      }
    })();
  }, [authState.isLoggedin, authState.coinContract])

  return (
    <div className="main-wrapper">
      {authState.isLoggedin? 
        <div className='user-nfts'>
          <span className='user-nfts-heading'>
            Your NFTs
          </span>
          <Carousel responsive={responsive}>
            <AddNFT/>
            {ownerNftIds.map((nftId) => {
              return <NFT key={nftId} tokenId={nftId}/>
            })}
          </Carousel>
          <hr/>
        </div>
      : null}
      <div className='all-nfts'>
        <span className='all-nfts-heading'>
          All NFTs
        </span>
        <div className="row">
          {nftIds.map((nftId) => {
            return <div className='col-3 my-2'><NFT key={nftId} tokenId={nftId}/></div>
          })}
          {nftIds.map((nftId) => {
            return <div className='col-3 my-2'><NFT key={nftId} tokenId={nftId}/></div>
          })}
          {nftIds.map((nftId) => {
            return <div className='col-3 my-2'><NFT key={nftId} tokenId={nftId}/></div>
          })}
        </div>
      </div>
    </div>
  )
}
export default Main;
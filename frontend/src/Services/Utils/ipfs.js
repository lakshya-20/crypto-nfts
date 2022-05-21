import { create } from 'ipfs-http-client';
import Toast from '../../Components/Toast';
const ipfs_client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

export const ipfs_uploader = async (file) => {
  try{
    const response = await ipfs_client.add(file);
    return `https://ipfs.io/ipfs/${response.path}`
  } catch(err){
    Toast("error", "Error connecting to IPFS");
  }
}

export const ipfs_json_downloader = async (url) => {
  try{
    const response = await fetch(url);
    return response.json();
  } catch(err){
    Toast("error", "Error connecting to IPFS");
  }
}
import { create } from 'ipfs-http-client';
const ipfs_client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

export const ipfs_uploader = async (file) => {
  try{
    const response = await ipfs_client.add(file);
    return `https://ipfs.io/ipfs/${response.path}`
  } catch(err){
    console.log(err.message);
  }
}
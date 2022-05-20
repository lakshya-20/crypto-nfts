import { useContext, useEffect } from "react";
import { AuthContext } from "../../Services/Contexts/AuthContext";
import { create } from 'ipfs-http-client'

const TopNav = () => {

  const { authState, login, logout } = useContext(AuthContext);
  const ipfs_client = create({ url: "https://ipfs.infura.io:5001/api/v0" });
  useEffect(() => {
    (async () => {
      const response = await ipfs_client.add(JSON.stringify({
        "name": "John"
      }))
      console.log(response);
      const response2 = await fetch("https://ipfs.io/ipfs/QmZv3SJpSUbb56tDSzc6pvVrc4uXpKEPexj5j5FDr52Jm5");
      if(!response2.ok)
      throw new Error(response2.statusText);

      const json = await response2.json();
      console.log(json)
    })();
    console.log(authState)
  }, [])
  return (
    <div>
      Top Nav Layout
      <br/>
      {authState.isLoggedin?
        <button onClick={logout}>Logout</button>
      :
        <button onClick={login}>Login</button>
      }
      <br/>
    </div>
  )
}
export default TopNav;
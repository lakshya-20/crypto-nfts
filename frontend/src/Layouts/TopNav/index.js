import { useContext } from "react";
import { AuthContext } from "../../Services/Contexts/AuthContext";

const TopNav = () => {

  const { authState, login, logout } = useContext(AuthContext);

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
      {JSON.stringify(authState)}
    </div>
  )
}
export default TopNav;
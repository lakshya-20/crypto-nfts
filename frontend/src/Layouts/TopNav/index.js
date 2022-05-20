import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Services/Contexts/AuthContext";
import '../../Assets/Styles/TopNav.Layout.css';
import RegisterUser from "../../Components/Modals/RegisterUser.Modal";

const TopNav = () => {
  const { authState, login, logout } = useContext(AuthContext);
  const [greeting, setGreeting] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    if(hour >= 0 && hour < 12){
      setGreeting("Good Morning");
    } else if(hour >= 12 && hour < 18){
      setGreeting("Good Afternoon");
    } else if(hour >= 18 && hour < 24){
      setGreeting("Good Evening");
    }
  },[])

  useEffect(() => {
    setIsRegisterModalOpen(authState.isLoggedin && authState.user.isRegistered === false);
  }, [authState])

  return (
    <div className="top-nav-wrapper">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <span className="greeting">{greeting}, {authState.user && authState.user.isRegistered? authState.user.name : ""}</span>
        </div>
        <div>
          {authState.isLoggedin?
            <span 
              onClick={logout}
              type="button"
              className="top-nav-auth-button"
            >
              Logout
            </span>
          :
            <span 
              onClick={login}
              type="button"
              className="top-nav-auth-button"
            >
              Login
            </span>
          }
        </div>
      </div>
      <RegisterUser isModalOpen={isRegisterModalOpen}/>
    </div>
  )
}
export default TopNav;
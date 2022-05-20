import './App.css';
import Main from './Layouts/Main';
import SideNav from './Layouts/SideNav';
import TopNav from './Layouts/TopNav';
import { AuthContextProvider } from './Services/Contexts/AuthContext';

function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        <div className = "d-flex">
          <div className="col-2">
            <div className='col-2 fixed-top'>
              <SideNav/>
            </div>
          </div>
          <div className="col-10 border">
            <div className='col-12 sticky-top'>
              <TopNav/>
            </div>
            <div className='col-12 border'>
              <Main/>
            </div>
          </div>
        </div>
      </AuthContextProvider>
    </div>
  );
}

export default App;

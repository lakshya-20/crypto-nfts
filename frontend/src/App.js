import './App.css';
import Main from './Layouts/Main';
import SideNav from './Layouts/SideNav';
import TopNav from './Layouts/TopNav';
import { AuthContextProvider } from './Services/Contexts/AuthContext';

function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        <div className = "row d-flex">
          <div className="col-3 border">
            <SideNav/>
          </div>
          <div className="col-9 border">
            <div className='col-12'>
              <TopNav/>
            </div>
            <div className='col-12'>
              <Main/>
            </div>
          </div>
        </div>
      </AuthContextProvider>
    </div>
  );
}

export default App;

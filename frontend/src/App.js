import './App.css';
import ErrorBoundary from './Layouts/ErrorBoundary';
import Main from './Layouts/Main';
import SideNav from './Layouts/SideNav';
import TopNav from './Layouts/TopNav';
import { AuthContextProvider } from './Services/Contexts/AuthContext';

function App() {
  return (
    <div className='App'>
      <ErrorBoundary>
        <AuthContextProvider>
          <div className = "d-flex">
            <div className="col-2">
              <div className='col-2 fixed-top'>
                <SideNav/>
              </div>
            </div>
            <div className="col-10">
              <div className='col-12 sticky-top'>
                <TopNav/>
              </div>
              <div className='col-12'>
                <Main/>
              </div>
            </div>
          </div>
        </AuthContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;

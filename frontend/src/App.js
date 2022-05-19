import './App.css';
import Main from './Layouts/Main';
import SideNav from './Layouts/SideNav';
import TopNav from './Layouts/TopNav';

function App() {
  return (
    <div className = "row d-flex">
      <div className="col-2 border">
        <SideNav/>
      </div>
      <div className="col-10 border">
        <div className='col-12'>
          <TopNav/>
        </div>
        <div className='col-12'>
          <Main/>
        </div>
      </div>
    </div>
  );
}

export default App;

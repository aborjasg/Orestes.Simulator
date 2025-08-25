import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Customers from './components/customer'
import PictureMaker from './components/picturemaker'
import ApiServices from './services/ApiServices';

function App() {  
  const [isAPIrunning, setState] = useState<boolean>(false);
  const api = new ApiServices();

  useEffect(() => {
    let state = false;
     api.getToken()
        .then(response =>  {       
          console.log(`App|response=${response}`);                       
          state = response.ok && response.status === 200;
          setState(state);
          console.log(`App|isAPIrunning=${state}`);       
        })
        .catch(error => {
            console.error('Error:', error);
            setState(state);
        });
  }, []);

  return (
    <>
      <div className="table">
        <div className='row'>
          <div className="col" style={{ textAlign: 'center' }}>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>          
            <h1>Orestes.Simulator</h1>        
            { isAPIrunning 
              ? <i>Connected to Orestes.Simulator API services...🎉</i>
              : <p>No access to Orestes.Simulator API services</p>
            }
          </div>
        </div>
        { isAPIrunning ?
        <><div>
          <div style={{ textAlign: 'left' }}>
            <Customers apiService={api}></Customers>
          </div>
        </div>
        <div>
          <div style={{ textAlign: 'left' }}>
            <PictureMaker apiService={api}></PictureMaker>
          </div>
        </div>
        </> : <p></p> }
      </div> 
    </>
  )
}

export default App

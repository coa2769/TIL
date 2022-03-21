import React, { useState } from 'react';
import './App.css';
// import Say from './component/Say';
// import EventPractice from './components/EventPractice';
// import ValidationSample from './components/ValidationSample';
// import ScrollBox from './components/ScrollBox';
// import LifeCycleSample from './components/LifeCycleSample';
// import ErrorBoundary from './components/ErrorBoundary';
import Info from './components/Info';


const App = ()=>{
  const [visible, setVisible] = useState(false);
  return(
    <div>
      <button
        onClick={()=>{
          setVisible(!visible);
        }}>
        {visible ? '숨기기' : '보이기'}
      </button>
      <hr />
      {visible && <Info />}
    </div>
  )
}

export default App;

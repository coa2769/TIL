import React, { Component } from 'react';
import './App.css';
// import Say from './component/Say';
// import EventPractice from './components/EventPractice';
// import ValidationSample from './components/ValidationSample';
import ScrollBox from './components/ScrollBox';

class App extends Component{
  render(){
    return (
      <div>
        <ScrollBox ref={(ref)=>this.scrollBox=ref}></ScrollBox>
        <button onClick={()=>this.scrollBox.scrollToBottom()}>맨 밑으로</button>
      </div>
    )
  }
}

export default App;

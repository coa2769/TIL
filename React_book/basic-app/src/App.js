import React, { Component } from 'react';
import './App.css';
// import Say from './component/Say';
// import EventPractice from './components/EventPractice';
// import ValidationSample from './components/ValidationSample';
// import ScrollBox from './components/ScrollBox';
import LifeCycleSample from './components/LifeCycleSample';
import ErrorBoundary from './components/ErrorBoundary';

function getRandomColor(){
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component{
  state = {
    color : '#000000'
  }

  handleClick = ()=>{
    this.setState({
      color : getRandomColor()
    });
  }

  render(){
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <ErrorBoundary>
          <LifeCycleSample color={this.state.color}></LifeCycleSample>
        </ErrorBoundary>
        {/* <ScrollBox ref={(ref)=>this.scrollBox=ref}></ScrollBox> */}
        {/* <button onClick={()=>this.scrollBox.scrollToBottom()}>맨 밑으로</button> */}
      </div>
    )
  }
}

export default App;

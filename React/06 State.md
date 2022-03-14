# State

props -> 사용자가 컴포넌트를 사용하는 입장에서 중요한 것.

state -> props에 따라 내부 구현에 필요한 데이터 들.



### 사용 이유

- 해당 컴포넌트가 내부적으로 사용하는 상태(변수의 값 등)를 은닉하기 위해 사용



## State 사용법

- `constructor()`는 `render()`보다 먼저 호출된다.
- 변수들의 초기화에 이용하면 좋다.
- state의 값을 하위 컴포넌트로 보낼 때 props를 사용한다.

```react
import React, { Component } from 'react';
import './App.css';

import Subject from './components/Subject';
import TOC from './components/TOC';
import Content from './components/Content';


class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      subject : {title:'WEB', sub:'World Wide Web!'}
    };
  }

  render(){
    return (
      <div className='App'>
          <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          ></Subject>
          <TOC></TOC>
          <Content title="HTML" desc="HTML is HyperText Markup"></Content>
      </div>
    );
  }
  
}

export default App;

```










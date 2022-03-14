# props 란?

상위 컴포넌트에서 하위 컴포넌트로 데이터를 전송하는 방법



이전 예제

```react
import React, { Component } from 'react';
import './App.css';

class Subject extends Component {
  render(){
    return(
      <header>
        <h1>WEB</h1>
        world wide web!
      </header>
    );
  }
}


class App extends Component{
  render(){
    return (
      <div className='App'>
          <Subject title="WEB" sub="world wide web!"></Subject>
          <TOC></TOC>
          <Content></Content>
      </div>
    );
  }
  
}
```



적용 후 예제

```react
import React, { Component } from 'react';
import './App.css';

class Subject extends Component {
  render(){
    return(
      <header>
        <h1>{this.props.title}</h1>
        { this.props.sub }
      </header>
    );
  }
}

class App extends Component{
  render(){
    return (
      <div className='App'>
          <Subject title="WEB" sub="world wide web!"></Subject>
          <TOC></TOC>
          <Content></Content>
      </div>
    );
  }
  
}
```

- 상위 컴포넌트에서 사용 중인 하위 컴포넌트 tag에 속성으로 값을 넣어준다.
- 하위 컴포넌트에서 `this.props.[속성 이름]` 로 해당 값에 접근한다.

- 전송된 props는 하위 컴포넌트에서 값을 변경할 수 없다.(read-only)

### 찾아볼 것

- 템플릿의 html 내에 {}는 무슨 문법인가?
  - 해당 내에 JS 문법을 사용할 수 있다.
# React 프로젝트 폴더 구조

## 초기 폴더 구조

```
⊢− public		
∣	∟_ index.html //컴포넌트들이 빌드 되는 시작점
⊢− src
∣	⊢− App.css	//App 컴포넌트의 디자인
∣	⊢− App.js	//컴포넌트
∣	⊢− App.test.js
∣	⊢− index.css	//시작점은 index.js에서 적용되는 디자인(전체 적용이된다.)
∣	⊢− index.js		//이 프로젝트의 시작점
∣	⊢− App.js
∣	⊢− reportWebVitals.js
∣	∟_ setupTests.js
⊢− .gitignore
⊢− package.json
∟_ README.md
```



## src/index.js 파일 분석

```react
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') //index.html 의 id가 root tag를 가져온다.
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```



## src/App.js 파일  분석

```react
import React, { Component } from 'react';
import './App.css'; //해당 컴포넌트의 css (컴포넌트 파일의 이름과 같이 한다.)

class App extends Component{
  render(){
    return (
      <div className='App'>
          Hello, React !!
      </div>
    )
  }
  
}
```


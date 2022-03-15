# 03월 15일

> React 강의 내용 정리

# 1. React 란?

# 1.1. 왜 리액트를 사용하는 가?

초기 렌더링과 리 렌더링 개념이 중요!!

초기 렌더링 → 리액트에서는 render()가 담당한다. 뷰의 구성과 작동에 대한 객체 반환

컴포넌트 내에 또 다른 컴포넌트가 있을 수 있다.

[ 초기 렌더링 ]

render 함수가 실행될 때 그 내부의 컴포넌트들도 재귀적으로 렌더링한다.

render 함수 → HTML 마크업 →  DOM 요소 생성 → 페이지 생성

[ 리렌더링 ]

업데이트 과정 X ,  조화 과정(reconciliation) O

뷰 변형 X, 새로 만들어서 갈아 끼우기 O

데이터 변환 전 DOM 과 데이터 변환 후 DOM을 비교 후 최소한 요소만 갈아 끼움. (DOM은 트리 구조이다.)

이런 과정을 통해 DOM의 느린 성능을 보완한다.

# 1.2. 리액트 특징

1. Virtual DOM

   실제 DOM을 추상화한 JS 객체

   - DOM : HTML(또는 XML) 문서 구조를 객체로 표현. JS와 CSS 적용. TREE 구조.
     - 웹 브라우저에서 수정된 DOM을 화면에 다시 그리는 것이 느리다.
   - DOM을 최소한으로 조작 & 처리하는 방식으로 개선할 때 쓴 방법이 Virtual DOM

   [ react에서 실제 DOM 업데이트 하는 과정 ]

   1. 데이터르 업데이트하면 전체 UI를 Virtual DOM에 리렌더링
   2. 이전 Virtual DOM과 비교
   3. 바뀐 부분만 실제 DOM에 적용.

2. 오직 뷰만 담당하는 라이브러리.

   - 다른 웹 프레임워크는 MVC또는 MVW등의 구조를 지향하지만 React는 아니다.
   - 그러므로 데이터 모델링, 라우팅 등의 기능을 내장 하지 않아 다른 외부 라이브러리를 사용해야 한다.

---

# 2. React 개발 환경 구축

VS Code의 확장자 중 React 관련

- Reactjs Code Snippetes : 단축 단어로 React 단어 자동 생성할 수 있는 도구.

< 생활코딩 기본React 강의에서 개발환경 구축 관련 내용 정리 >

---

# 3. JSX 문법

# 3.1. JSX 란?

> JS의 확장 문법으로 XML과 매우 비슷하다. 해당 문법은 번들링 과정세어 babel을 통해 JS 코드 형태로 변환된다.

## 3.1.1. 장점

- JS로 작성 했을 때 보다 보기 쉽고 HTML 코드와 비슷하여 익숙하다.

- 컴포넌트를 Tag 처럼 작성하여 구조에 추가할 수 있다.

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom';
  import './index.css';
  import App from './App';
  import reportWebVitals from './reportWebVitals';
  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: <https://bit.ly/CRA-vitals>
  reportWebVitals();
  ```

# 3.2. 문법

## 3.2.1. 감싸인 요소

- Root가 되는 부모요소는 하나여야만 한다.

  - 잘 못된 예

    ```jsx
    import './App.css';
    
    function Basic(){
      return (
        <h1>리액트 안녕!</h1>
        <h2>잘 작동하니?</h2>
      )
    }
    ```

  - 맞는 예

    ```jsx
    function Basic(){
      return (
        <div>
          <h1>리액트 안녕!</h1>
          <h2>잘 작동하니?</h2>
        </div>
      )
    }
    ```

- 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 하는 규칙 때문이다.

- React v16 이상 부터는 div 요소 대신 Fragment 기능을 사용할 수 있다.

  ```jsx
  import React, { Fragment } from 'react';
  
  function Basic(){
    return (
      <Fragment>
        <h1>리액트 안녕!</h1>
        <h2>잘 작동하니?</h2>
      </Fragment>
    )
  }
  
  or
  
  //아래와 같이 Fragment를 표현할 수 있다. 이때는 import로 Fragment를 가져 올 필요 없다.
  function Basic(){
    return(
      <>
        <h1>리액트 안녕!</h1>
        <h2>잘 작동하니?</h2>
      </>
    )
  }
  ```

[ jsx에서 emmet 사용하는 방법]

[VScode + React emmet 사용하기](https://velog.io/@jayjay28/VScode-React-emmet-사용하기)

## 3.2.2. JS 표현

- `{}`로 감싸면 JSX안에서 JS 표현식을 쓸 수 있다.

  ```jsx
  function Basic(){
    const name = '리액트';
    return (
      <Fragment>
        <h1>{name} 안녕!</h1>
        <h2>잘 작동하니?</h2>
      </Fragment>
    )
  }
  ```

## 3.2.3. 조건부 연산자

조건에 따라 다른 내용을 렌더링하려 할 때 두가 지 방법이 있다.

- JSX 밖에서 if문을 사용

- `{}`안에 조건부 연산자를 사용

- 여러줄을 한 그룹으로 작성 할 때 괄호로 감싼다.

  ```jsx
  function Basic(){
    const name = '리액트';
    return (
      <Fragment>
        {name === '리액트' ? (
          <h1>{name} 안녕!</h1>
        ) : (
          <h2>리액트가 아닙니다.</h2>
        )}
      </Fragment>
    )
  }
  ```

## 3.2.4. AND 연산자(&&)를 사용한 조건부 렌더링

특정 조건에서 아무것도 렌더링 하지 않는 상황에서 사용된다.

```jsx
//원본
function Basic(){
  const name = '리액트';
  return (
    <Fragment>
      {name === '리액트' ? <h1>{name} 안녕!</h1> : null}
    </Fragment>
  )
}

//AND 연산자
function Basic(){
  const name = '리액트';
  return (
    <Fragment>
      {name === '리액트' && <h1>{name} 안녕!</h1>}
    </Fragment>
  )
}
```

- 리액트에서 false과 null은 아무것도 랜더링하지 않는다.

## 3.2.5. DOM에 스타일링 적용 방법

- DOM에 스타일을 적용할 때 객체 형태로 넣어주어야 한다.

- 스타일 이름은 카멜 표기법으로 작성한다.

  - ex) background-color → backgroundColor

  ```jsx
  function Basic(){
    const name = '리액트';
    const style = {
      backgroundColor : 'black',
      color : 'aqua',
      fontSize : '48px',
      fontWeight : 'bold',
      padding : 16,
    };
  
    return (
      <div style={style}>{name}</div>
  
    )
  }
  ```

- 인라인으로 스타일 적용하는 방법

  ```jsx
  function Basic(){
    const name = '리액트';
    return (
      <div style={{
        backgroundColor : 'black',
        color : 'aqua',
        fontSize : '48px',
        fontWeight : 'bold',
        padding : 16,
      }}
      >
        {name}
      </div>
  
    )
  }
  ```

## 3.2.6. class 적용

JSX에서는 class 대신 className으로 설정해 주어야 한다.

```jsx
function Basic(){
  const name = '리액트';
  return (
    <div className="react">
      {name}
    </div>

  )
}
```

- v16 이상 부터는 class라고 작성하여도 자동으로 변환 후  warning 문구만 띄워준다.

## 3.2.7. 주석

JSX 내부에서는 {/* .... */} 형식으로 주석을 작성한다.

```jsx
function Basic(){
  const name = '리액트';
  return (
    <div 
    className="react"
    style={{
      backgroundColor : 'black',
      color : 'aqua',
      fontSize : '48px',
      fontWeight : 'bold',
      padding : 16,
    }}
    >
      {/* 주석 작성 */}
      {name}
    </div>

  )
}
```

---

# 4. 컴포넌트

컴포넌트 선언하는 방식에는 두가지가 있다.

### 함수형 컴포넌트

```jsx
import './Basic.css';
import React from 'react';

function Basic(){
  const name = '리액트';
  return (
    <div className="react">{name}</div>
  )
}

export default Basic;
```

- v16.8 업데이트 이후 Hooks 기능으로 state 기능과 라이프사이클 기능을 보완하고 있다.
- `rsc`를 입력한 후 Enter를 치면 함수형 컴포넌트가 자동완성된다.(Reactjs Code Snippet의 기능이다.)

### Class형 컴포넌트

```jsx
import React, { Component } from 'react';

class Basic extends Component{
  render(){
    const name = 'react';
    return <div className='react'>{name}</div>
  }
}

export default Basic;
```

- class형 컴포넌트에서는 state 기능과 라이프사이클 기능을 사용할 수 있다.
- render()가 꼭 있어야 한다.

---

# 5. props

> 상위 컴포넌트가 하위 컴포넌트에게 설정해주는 속성이다. 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전송할 때 사용된다.

# 5.1. 기본 사용방법

## 상위 컴포넌트에서 props 값 지정

```jsx
import './App.css';
import MyComponent from './MyComponent';

const App = () => {
  return (
    <div>
      <MyComponent name="React"></MyComponent>
    </div>
  )
}

export default App;
```

## 하위 컴포넌트에서 props 값 가져오기

### [ 함수형 컴포넌트 ]

```jsx
import React from 'react';

const MyComponent = props => {
    return (
        <div>
            안녕하세요, 제 이름은 {props.name}입니다.
        </div>
    );
};

MyComponent.defaultProps = {
    name : '기본 이름'
};

export default MyComponent;
```

### [ class형 컴포넌트 ]

```jsx
class MyComponent extends Component {
    render(){
        const { name, children } = this.props;
        return(
            <div>
            안녕하세요, 제 이름은 {props.name}입니다.
            </div>
        );
    }
}

MyComponent.defaultProps = {
    name : '기본 이름'
};
```

- 함수에 defaultProps 속성으로 default 값을 지정해 줄 수 있다.

- class 내에 static으로 defaultProps를 선언할 수 있다.

  ```jsx
  class MyComponent extends Component {
      static defaultProps = {
          name : '기본이름'
      };
  
      render(){
  
          return(
              <div>
              안녕하세요, 제 이름은 {props.name}입니다.
              </div>
          );
      }
  }
  ```

- props를 ES6 문법인 비구조화 할당(destructuring assignment)로 더 간단하게 사용할 수 있다.

  - 함수 내에서 적용

    ```jsx
    import React from 'react';
    
    const MyComponent = props => {
    		const { name, children } = props;
        return (
            <div>
                안녕하세요, 제 이름은 {name}입니다.
    						children 값은 {props.children} 입니다.
            </div>
        );
    };
    
    MyComponent.defaultProps = {
        name : '기본 이름'
    };
    
    export default MyComponent;
    ```

  - 함수의 파라미터에서 적용

    ```jsx
    import React from 'react';
    
    const MyComponent = ({ cname, children}) => {
        return (
            <div>
                안녕하세요, 제 이름은 {name}입니다.
    						children 값은 {props.children} 입니다.
            </div>
        );
    };
    
    MyComponent.defaultProps = {
        name : '기본 이름'
    };
    
    export default MyComponent;
    ```

# 5.2. props.children

컴포넌트의 tag 사이 값을 해당 컴포넌트에서 props.children으로 접근이 가능하다.

```jsx
import './App.css';
import MyComponent from './MyComponent';

const App = () => {
  return (
    <div>
      <MyComponent name="React">리액트</MyComponent>
    </div>
  )
}

export default App;
import React from 'react';

const MyComponent = props => {
    return (
        <div>
            안녕하세요, 제 이름은 {props.name}입니다.
						children 값은 {props.children} 입니다.
        </div>
    );
};

MyComponent.defaultProps = {
    name : '기본 이름'
};

export default MyComponent;
```

# 5.3. propTypes

컴포넌트에 필수 props를 지정하거나 props에 타입을 지정할 때 사용된다.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = props => {
    return (
        <div>
            안녕하세요, 제 이름은 {props.name}입니다.
        </div>
    );
};

MyComponent.defaultProps = {
    name : '기본 이름'
};

MyComponent.propTypes = {
    name : PropTypes.string
};

export default MyComponent;
```

- 컴포넌트에 propTypes 속성인 객체를 선언한다.

- class형 내에 static 속성으로 선언 할 수 있다.

  ```jsx
  class MyComponent extends Component {
      static propTypes = {
          name : PropTypes.string,
      };
  
      render(){
  
          return(
              <div>
              안녕하세요, 제 이름은 {props.name}입니다.
              </div>
          );
      }
  }
  ```

- 선언된 객체 안에 props이름과 타입을 지정해준다.

- 필수 props를 지정할 때는 타입을 지정할 때 isRequired를 붙여준다.

  ```jsx
  MyComponent.propTypes = {
      name : PropTypes.string,
      favoriteNumber : PropTypes.number.isRequired,
  };
  ```

### PropTypes 종류

| kind                    | description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| array                   | 배열                                                         |
| bool                    | true/false                                                   |
| func                    | 함수                                                         |
| number                  | 숫자                                                         |
| object                  | 객체                                                         |
| string                  | 문자열                                                       |
| symbol                  | 심벌 개체(ES6)                                               |
| node                    | 렌더링 가능한 모든것(number, string, element, 또는 그것들이 포함된 array/fragment) |
| element                 | React element                                                |
| instanceOf(ClassName)   | JS에서 instanceof로 정의 가능한 클래스 인스턴스              |
| oneOf([…Value])         | 포함된 값들중 하나.(ex: oneOf([‘남자’,’여자’]))              |
| oneOfType([…PropTypes]) | 포함된 PropTypes들중 하나. (ex: oneOfType([PropTypes.string, PropTypes.instanceOf(MyClass)])) |
| arrayOf(PropTypes)      | 해당 PropTypes으로 구성된 배열                               |
| objectOf(PropTypes)     | 주어진 종류의 값을 가진 객체                                 |
| shape({key:PropTypes})  | 해당 스키마를 가진 객체.(ex:shape({name:PropTypes.string,age:PropTypes.number})) |
| exact({key:PropTypes})  | 명확하게 해당 스키마만 존재해야함.                           |

[Typechecking With PropTypes - React](https://reactjs.org/docs/typechecking-with-proptypes.html)
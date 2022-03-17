# 03월 17일

> React 강의 내용 정리

# 6. State

> 컴포넌트 내부에서 바뀔 수 있고 React가 값의 변환을 감지하는 변수를 의미한다. 내부적으로 사용하며 값을 은닉할 수 있다.(외부에서 접근 불가)

# 6.1. 클래스형 컴포넌트의 state

```jsx
import React, { Component } from 'react';

class Counter extends Component{
    constructor(props){
        super(props);
        //state의 초깃값 설정하기
        this.state = {
            number : 0,
						fixedNumber : 0,
        };
    }

    render(){
        const { number } = this.state;
        return(
            <div>
                <h1>{number}</h1>
                <button
                    onClick={()=>{
                        this.setState({number : number + 1});
                    }}
                >
                    +1
                </button>
            </div>
        )
    }
}

export default Counter;
```

- `constructor()`에서 state속성에 변수들을 초기화 한다.

- state를 수정하려면 `setState()`로 수정해야 한다.

- `constructor()`외부에서 state속성을 선언하는 것도 가능하다.

  ```jsx
  import React, { Component } from 'react';
  
  class Counter extends Component{
  		state = {
  			number : 0,
  			fixedNumber : 0,
  		};
  
      render(){ ... }
  }
  
  export default Counter;
  ```

# 6.2. this.setState에 객체 대신 함수 인자 전달하기

- ```
  this.setState()
  ```

   는 비동기적으로 state를 업데이트 된다.

  - state값이 즉시 변경되는 것이 아니기 때문에 아래와 같이 +1이 되는 함수가 두번 호출됐지만 증가하는 값이 1뿐인 문제가 생긴다.

    ```jsx
    onClic={()=>{
    	this.setState({ number : number + 1});
    	this.setState({ number : this.state.number + 1});
    }}
    ```

  - 이를 해결하기 위해 `this.setState()`에 함수 인자를 넣어줍니다.

    - preveState는 기본 상태이고 props는 현재 props를 가리킨다.(props 생략 가능)

    ```jsx
    this.setState((prevState, props)=>{
    	return {
    		//업데이트하고 싶은 내용
    	}
    })
    ```

  - 실제 사용 예제

    ```jsx
    <button
        onClick={()=>{
            //첫번째 호출
            this.setState(prevState=>{
                return {
                    number : prevState.number + 1
                };
            });
    
            //두번째 호출
            this.setState(prevState=>({
                number : prevState.number + 1
            }))
        }}
    >
        +1
    </button>
    ```

# 6.3. this.setState가 끝난 후 특정 작업 실행

`this.setState()` 의 두 번째 파라미터로 callback 함수를 등록하면 state속성의 값을 업데이트 후 해당 callback을 호출한다.

```jsx
<button
    onClick={()=>{
        this.setState(
            {number : number + 1},
            ()=>{
                console.log('방금 setState가 호출되었습니다.');
                console.log(this.state);
            }
        );

    }}
>
    +1
</button>
```

# 6.4. 함수형 컴포넌트에서 state

React 16.8 이후부터 `useState()`를 사용하여 state를 사용할 수 있게 되었다.

해당 과정에서 Hooks을 사용하게 된다.

```jsx
import React, {useState} from "react";

const Say = () => {
    const [message, setMessage] = useState('');
    const onClickEnter = ()=>setMessage('안녕하세요!');
    const onClickLeave = ()=> setMessage('안녕히 가세요!');

    const [color, setColor] = useState('black');

    return (
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            <h1 style={{color}}>{ message }</h1>
            
            <button style={{color : 'red'}} onClick={()=>setColor('red')}>
                빨간색
            </button>
            
            <button style={{color : 'green'}} onClick={()=>setColor('green')}>
                초록색
            </button >
            
            <button style={{color : 'blue'}} onClick={()=>setColor('blue')}>
                파란색
            </button>
        </div>
    )
}

export default Say;
```

- `useState()`에 인자로 상태 초깃값을 넣어준다.
- `useState()`의 반환 값은 배열이며 첫 번째 원소는 현재 상태, 두 번째 원소는 상태를 바꿔주는 함수이다.

# 6.5. state에 관한 주의 사항

- 꼭 세터 함수를 사용하여 값을 업데이트 해줘야 React가 값의 변화를 인식할 수 있다.
- 배열이나 객체는 사본을 만들어 업데이트 후 세터 함수를 이용하여 통째로 업데이트 해준다.

---

# 7. 이벤트 핸들링

# 7.1. 리액트의 이벤트

> DOM 요소들과 상호 작용하는 것을 이벤트(Event)라고 한다.

### React 이벤트의 특징

- 이벤트 이름은 카멜 표기법으로 작성한다.

  - ex) onclick → onClick, onkeyup → onKeyUp

- 이벤트에 함수 형태의 값으로 전달한다.

  - HTML 에서 이벤트에 실행할 코드를 전달한다.

    ```jsx
    <button onclick="myFunction()">Click me</button>
    ```

  - React 예제

    ```jsx
    <button style={{color : 'red'}} onClick={()=>setColor('red')}>
        빨간색
    </button>
    ```

- DOM요소에만 이벤트를 설정할 수 있다.

  - 직접 만든 컴포넌트에는 이런 이벤트를 설정할 수 없다.
  - 단 전달받은 props를 컴포넌트 내부의 DOM 이벤트에 설정할 수는 있다.

- React에서만 지원해주는 이벤트들이 있다.

  [SyntheticEvent - React](https://reactjs.org/docs/events.html)

# 7.2. Event 예제

## input이 한 개일 때

```jsx
import React, { Component } from "react";

class EventPractice extends Component {
    constructor(props){
        super(props);
        this.state = {
            message : '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e){
         this.setState({
             message : e.target.value
         });
     }

     handleClick(e){
         this.setState({
             message : ''
         });
	   }

    render(){
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    value={this.state.message}
                    onChange={ this.handleChange}
                    />
                <button
                    onClick={ this.handleClick}>
                    확인
                </button>
            </div>
        )
    }
}

export default EventPractice;
```

- 함수의 `this`는 호출부에 의해 결정 되므로 `bind()` 로 class를 this로 지정해 줘야 한다.

- 이런 작업이 싫다면 매서드를 화살호 함수로 선언해 줘야 한다.

  ```jsx
  handleChange = (e)=>{
      this.setState({
          message : e.target.value
      });
  }
  
  handleClick = (e)=>{
      this.setState({
          message : e.target.value
      });
  }
  ```

## input이 여러개 일때

아래와 같이 input이 추가될 때마다 새로운 함수를 추가하지 않는 방식으로 이용할 수 있다.

```jsx
import React, { Component } from "react";

class EventPractice extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            message : '',
        }

    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleClick = (e)=>{
        alert(this.state.username + ':' + this.state.message);
        this.setState({
            username : '',
            message : e.target.value
        });
    }

    render(){
        return (
            <div>
                <h1>이벤트 연습</h1>
                <input 
                    type="text"
                    name="username"
                    placeholder="사용자명"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <input 
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해 보세요"
                    value={this.state.message}
                    onChange={ this.handleChange}
                />
                <button
                    onClick={ this.handleClick}>
                    확인
                </button>
            </div>
        )
    }
}

export default EventPractice;
```

- 객체 안에서 key에 변수를 넣고 싶을 때 변수를 []로 감싸면 된다.

  ```jsx
  const name = 'key';
  const object = {
  	[name] : 'value'
  };
  ```

# 7.3. 함수형 컴포넌트로 이벤트 구현

### input이 많지 않을 때

```jsx
import React, { useState } from "react";

const EventPractice = ()=>{
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const onChangeUsername = e=>setUsername(e.target.value);
    const onChangeMessage = e=>setMessage(e.target.value);
    const onClick=()=>{
        alert(username + ':' + message);
        setUsername('');
        setMessage('');
    };

    const onKeyPress = e =>{
        if(e.key === 'Enter'){
            onClick();
        }
    };

    return(
        <div>
            <h1>이벤트 연습</h1>
            <input 
                type="text" 
                name="username"
                placeholder="사용자명"
                value={username}
                onChange={onChangeUsername}
            />
            <input 
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={message}
                onChange={onChangeMessage}
                onKeyPress={onKeyPress}
            />
            <button onClick={onClick}>확인</button>
        </div>
    )

}

export default EventPractice;
```

### input 개수가 늘어날 수 있을 때

```jsx
import React, { useState } from "react";

const EventPractice = ()=>{
    const [ form, setForm ] = useState({
        username : '',
        message : ''
    });
    const { username, message } = form;
    const onChange = e =>{
        const nextForm = {
            ...form, //기존의 form 내용을 이 자리에 족사한 뒤
            [e.target.name] : e.target.value //원하는 값을 덮어 씌우기
        };
        setForm(nextForm);
    };

    const onClick=()=>{
        alert(username + ':' + message);
        setForm({
            username : '',
            message : '',
        });
    };

    const onKeyPress = e =>{
        if(e.key === 'Enter'){
            onClick();
        }
    };

    return(
        <div>
            <h1>이벤트 연습</h1>
            <input 
                type="text" 
                name="username"
                placeholder="사용자명"
                value={username}
                onChange={onChange}
            />
            <input 
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={message}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <button onClick={onClick}>확인</button>
        </div>
    )

}

export default EventPractice;
```

- form이라는 객체에 input 되는 값들을 선언한다.

---

# 8. ref (DOM에 이름 달기)

# 8.1. ref 란?

> DOM에 이름을 다는 방법이다. **DOM을 꼭 직접적으로 건드려야 할 때 사용된다.**

### 컴포넌트에서 id를 사용하면 안되는 이유

컴포넌트는 여러번 사용이 가능하다. 이때 **중복 사용이 불가능한 id**는 잘못된 사용 방법이다. **ref는 전역적으로 작동하지 않으**므로 이런 문제를 해결 할 수 있다.

만약 꼭 id를 사용해야 하는 방황이라면 컴포넌트를 만들 때 id뒷부분에 추가 텍스트를 붙이도록 구현하여 중복 id를 방지해야 한다.

ex) button1, button2, button3....

### ref를 이용한 컴포넌트 간 정보 교환

이는 ref의 잘못된 사용이다. 규정된 방법으로 구현하지 않으면 추후 스파게티 코드가 되어 유지보수가 어려워진다.

# 8.2. ref 사용방법

### 콜백 함수를 통한 ref 설정

```jsx
<input ref={(ref)=>{this.refName = ref}} ></input>
```

- 콜백 함수의 매개변수 ref는 DOM 자신이다.
- this.[ref 이름]으로 DOM에 이름을 달아줄 수 있다.

### createRef를 통한 ref설정

```jsx
import React, { Component } from "react";

class RefSample extends Component{
    refName = React.createRef();

    handleFocus = ()=>{
        this.input.current.focus();
    }

    render(){
        return(
            <div>
                <input ref={this.refName} />
            </div>
        )
    }

}

export default RefSample;
```

- `createRef()`로 ref를 생성한다.
- 이름을 부여할 DOM에 ref 속성으로 생성한 ref을 부여한다.
- this.[ref 이름]으로 해당 DOM에 접근이 가능하다.

# 8.3. 컴포넌트에 ref달기

컴포넌트에 ref를 달면 내부의 매서드와 멤버 변수에 접근 할 수 있다. 이 때문에 내부 멤버 변수인 ref에도 접근할 수 있다.

```jsx
import React, { Component } from 'react';
import './App.css';
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
import React, { Component } from "react";

class ScrollBox extends Component{

    scrollToBottom = ()=>{
        const { scrollHeight, clientHeight } = this.box;
        this.box.scrollTop = scrollHeight - clientHeight;
    }

    render(){
        const style = {
            border : '1px solid black',
            height : '300px',
            width : '300px',
            overflow : 'auto',
            position : 'relative',
        };

        const innerStyle = {
            width : '100%',
            height : '650px',
            background : 'linear-gradient(white, black)'
        }

        return(
            <div
                style={style}
                ref={(ref)=>{this.box=ref}}
            >
                <div style={innerStyle}></div>
            </div>
        );

    }
}

export default ScrollBox;
```
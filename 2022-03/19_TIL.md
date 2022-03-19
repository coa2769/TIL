# 03월 19일

> React 강의 내용 정리

# 9. 컴포넌트 반복

# 9.1. map함수 이용

> JS 배열 객체의 `map()`을 사용하여 반복되는 컴포넌트를 렌더링 할 수 있다.

```jsx
import React from "react";

const IterationSample = ()=>{
    const names = ['눈사람', '얼음', '눈', '바람'];
    const nameList = names.map((name, index) => <li key={index}>{name}</li>);
    return <ul>{nameList}</ul>
}

export default IterationSample;
```

- map함수는 파라미터로 전달된 함수를 사용하여 배열 내 각 요소를 원하는 규칙에 따라 변환 후 새로운 배열을 생성한다.

  [JavaScript Array map()](https://www.w3schools.com/jsref/jsref_map.asp)

  [Array.prototype.map() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

- JSX코드로 된 배열을 새로 생성하여 렌더링 하면된다.

- 이런 컴포넌트 배열을 렝더링할 때 어떤 원소의 변동을 알아보고 위해 `key`속성이 꼭 필요하다.

  - index값은 고유 값이 없을 때만 key 속성으로 사용된다. 그렇지 않으면 배열이 변경될 때 마다 효율적인 리렌더링이 일어나지 않는다.

<aside> 💡 `map`함수 뿐만 아니라 while, forEach 등 여러가지 함수, 반복문을 통해 구현이 가능하다.

</aside>

# 9.2. 실제 예제

```jsx
import React, { useState } from "react";

const IterationSample = ()=>{
    const [ names, setNames ] = useState([
        {id : 1, text : '눈사람'},
        {id : 2, text : '얼음'},
        {id : 3, text : '눈'},
        {id : 4, text : '바람'},
    ])
    const [inputText, setInputText ] = useState('');
    const [nextId, setNextId] = useState(5); //새로운 항목을 추가할 때 사용할 id

    const onChange = e=>setInputText(e.target.value);
    const onClick = ()=>{
        //concat 는 추가된 요소와 함께 새로운 배열 생성
        const nextNames = names.concat({
            id : nextId, //nextId 값을 id로 설정하고
            text : inputText,
        });
        setNextId(nextId + 1); //nextId 값에 1을 더해 준다.
        setNames(nextNames); //names값을 업데이트한다.
        setInputText(''); //inputText를 비운다.
    }

    const onRemove = id =>{
        const nextNames = names.filter(name=>name.id !== id);
        setNames(nextNames);
    }

    const nameList = names.map(name => (
        <li key={name.id} onDoubleClick={()=>onRemove(name.id)}>
            {name.text}
        </li>
    ));
    
    return (
        <>
            <input value={inputText} onChange={onChange} />
            <button onClick={onClick}>추가</button>
            <ul>{nameList}</ul>
        </>
    )
}

export default IterationSample;
```

- 목록에 데이터 추가, 삭제를 하는 코드이다. (요소를 더블 클릭하면 삭제된다.)

- `concat()`는 추가된 요소와 함께 새로운 배열을 생성하는 함수이다.

  [Array.prototype.concat() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

  [JavaScript Array concat()](https://www.w3schools.com/jsref/jsref_concat_array.asp)

- `filter()`는 특정 조건에 맞는 원소만을 뽑아 배열을 생성하는 함수이다.

[Array.prototype.filter() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

[JavaScript Array filter()](https://www.w3schools.com/jsref/jsref_filter.asp)

---

# 10. 컴포넌트의 라이프사이클 메서드

# 10.1. 라이프사이클

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a08916cf-476c-46f2-bc8a-59c0af24f2f0/Untitled.png)

- 마운트, 업데이트, 언마운트로 카테고리를 나눈다.
- Will 접두사가 붙은 메서드는 어떤 작업 전에 실행된다.
- Did 접두사가 붙은 메서드는 어떤 작업 후에 실행된다.

## Mounting

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/caad3cdb-846a-4884-9b67-6a36fadbd3d2/Untitled.png)

DOM 생성 후 웹 브라우저에 출력

- `constructor` : 컴포넌트를 만들 때 마다 호출되는 class 생성자
- `getDerivedStateFromProps` : props에 있는 값을 state에 넣을 때 사용
- `render` : UI 렌더링
- `componentDidMount` : 마운트가 완료된 후 호출.

## Update

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6a1ca28d-e884-4509-b475-8a6f127963cf/Untitled.png)

**[ 업데이트가 일어나는 경우 ]**

- props가 바뀔 때
- state가 바뀔 때
- 부모 컴포넌트가 리렌더링될 때
- this.forceUpdate로 강제 렌더링 할 때

**[ 라이프 사이클 메서드 종류 ]**

- `getDerivedStateFromProps`  : 업데이트 시작 전에 호출. props의 변화에 따라 state값에 변화를 주고 싶을 때 호출된다.
- `shouldComponentUpdate` : 컴포넌트의 리렌더링 여부를 결정하는 메서드. true or false를 반환한다. this.forceUpdate()함수가 호출되면 이 과정을 생략하고 바로 render함수를 호출한다.
- `render` : 컴포넌트를 리렌더링하는 함수
- `getSnapshotGeforeUpdate` : 컴포넌트 변화를 DOM에 반영하기 바로 직전에 호출되는 메서드.
- `componentDidUpdate` : 컴포넌트의 업데이트 작업이 끝난 후 호출되는 메서드.

## Unmount

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9923bc5c-0bed-4623-9453-75f90bf07b69/Untitled.png)

- `componentWillUnmount` : 컴포넌트가 웹브라우저에서 사라지기 전에 호출되는 메서드.

# 10.2. 각 라이프 사이클 메서드들

### constructor()

- 초기 state를 정할 수 있다.

### getDerivedStateFromProps()

v16.3 이후 만들어진 라이프사이클. props로 받아 온 값을 state에 동기화 시키는 용도로 사용된다.

```jsx
static getDerivedStateFromProps(nextProps, prevState){
	if(nextProps.value !== prevState.value){ //조건에 따라 특정 값 동기화
		return { value : nextProps.value };
	}
	
	return null; //state를 변경할 필요가 없다면 null을 반환
}
```

### shouldComponentUpdate()

props또는 state 값이 변경 되었을 때 리렌더링 여부를 결정하는 메서드.

```jsx
shouldComponentUpdate(nextProps, nextState) {...}
```

- true or false 값 반환(true → 리렌더링, false → update중지)
- 새로 설정된 props, state는 nextProps, nextState로 접근 가능.

### render()

- this.props와 this.state에 접근 가능.
- 리액트 요소를 반환한다.
  - null이나 false를 반환하여 아무것도 출력하지 않을 수도 있다.
- 해당 메서드 내에서 직접 setState를 호출하거나 DOM에 접근하면 안된다.

### getSnapshotBeforeUpdate()

v16.3 이후 만들어진 라이프사이클. render에서 만들어진 화면이 브라우저에 실제로 반영되기 직전에 호출된다.

```jsx
getSnapshotBeforeUpdate(prevProps, prevState){
	if(prevState.array !== this.state.array){
		const { scrollTop, scrollHeight } = this.list;
		return { scrollTop, scrollHeight };
	}
}
```

- 해당 함수의 반환 값은 `componentDidMount()`에서 세 번째 매개변수인 snapshot 값으로 전달 받을 수 있다.
- 업데이트 직전에 값을 참고할 때 활용한다.

### componentDidMount()

```jsx
componentDidMount(){...}
```

아래의 상황에서 쓰임

- 라이브러리 또는 프레임워크의 함수를 호출
- 이벤트 등록
- setTimeout, setInterval
- 네트워크 요청 같은 비동기 작업 처리

### componentDidUpdate()

리렌더링 완료 후 호출된다.

```jsx
componentDidUpdate(prevProps, prevState, snapshot){...}
```

- 업데이트 직후 DOM 관련 처리할 때 사용됨.
- prevProps, prevState로 이전에 가졌던 값에 접근할 수 있다.

### componentWillUnmount()

컴포넌트를 DOM에서 제거할 때 실행됨.

```jsx
componentWillUnmout()
```

- 등록한 이벤트, 타이머, 적접 생성한 DOM을 제거할 때 사용한다.

### componentDidCatch()

v16.3 이후 만들어진 라이프사이클. 컴포넌트 렌더링 도중 방샐한 에러를 알려줄 때 실행됨.

```jsx
componentDidCatch(error, info){
	this.setState({
		error : true
	});

	console.log({ error, info });
}
```

- error로 어떤 에러가 발생했는지 알려줌.
- inof로 어디의 코드에서 오류가 발생했는지 알려줌.
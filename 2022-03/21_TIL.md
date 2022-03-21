# 03월 21일

> React 강의 내용 정리

# 11. Hooks

> v16.8에서 도입된 기능으로 함수형 컴포넌트에서 기존에 없었던 기능을 제공하기 위해 추가된 기능으로 내장형 Hook으로 상태 관리, 렌더링 직후 작업 설정 등을 제공할 수 있다.

# 11.1. useState

함수형 컴포넌트에서 state를 사용하기 위해 내장형 Hook인 useState를 이용한다.

```jsx
import React, { useState } from "react";

const Counter = ()=>{
    const [value, setValue] = useState(0);

    return(
        <div>
            <p>
                현재 카운터 값은 <b>{value}</b>입니다.
            </p>
            <button onClick={()=>setValue(value + 1)}>+1</button>
            <button onClick={()=>setValue(value - 1)}>-1</button>
        </div>
    )
}

export default Counter;
```

- `useState()`의 매개변수로 default값을 넣어줄 수 있다.
- 반환된 배열의 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 설정할 수 있는 함수이다.

# 11.2. useEffect

클래스형 컴포넌트의 `componentDidMount()`와 `componentDidUpdate()` 기능을 대신 해준다.

### 렌더링 직후 작업 설정

마운트 또는 리랜더링 완료 직후 실행할 작업을 설정하기 위해 useEffect를 이용한다.

```jsx
import React, { useState, useEffect } from "react";

const Info = ()=>{
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(()=>{
        console.log('렌더링이 완료되었습니다!');
        console.log({
            name,
            nickname,
        });
    });

    const onChangeName = e=>{
        setName(e.target.value);
    };

    const onChangeNickname = e=>{
        setNickname(e.target.value);
    }

    return (
        <div>
            <input type="text" name="name" onChange={onChangeName} />
            <input type="text" name="nickname" onChange={onChangeNickname} />
            <span>이름 : {name}</span>
            <span>닉네임 : {nickname}</span>
        </div>
    )
}

export default Info;
```

마운트 될 때만 실행하고 싶다면 두번째 파라미터에 비어 있는 배열을 넣어주면 된다.

```jsx
useEffect(()=>{
    console.log('렌더링이 완료되었습니다!');
}, []);
```

### 특정 값이 업데이트될 때만 실행하고 싶을

`useEffect()`의 두번째 파라미터인 배열에 검사하고 싶은 props나 state를 넣어주면 된다.

```jsx
useEffect(()=>{
    console.log(name);
}, [name]);
```

### 업데이트 직전 또는 언마운트 되기 전에 실행하고 싶을 때

`useEffect()`의 첫번째 파라미터인 callback함수에서 ‘반환되는 함수’가 업데이트 직전 또는 언마운트 되기 전에 호출된다.

```jsx
useEffect(()=>{
    console.log('effect');
    console.log(name);
    return ()=>{
        console.log('cleanup');
        console.log(name);
    }
});
```

- 이렇게 호출되는 함수는 업데이트 되기 직전의 props, state값을 가지고 있는다.
- 오직 ‘언마운트 될 때만’ 해당 함수를 호출하고 싶다면 `useEffect()`의 두번째 파라미터에 비어있는 배열을 넣으면 된다.
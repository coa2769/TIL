# 03월 27일

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

  ```jsx
  useEffect(()=>{
      console.log('effect');
      console.log(name);
      return ()=>{
          console.log('cleanup');
          console.log(name);
      }
  }, []);
  ```

# 11.3. useReducer

Redux를 함수형 컴포넌트에서 지원해주는 기능이다. (Redux에 대해서는 해당 챕터 참고)

```jsx
import React, { useReducer } from "react";

function reducer(state, action){
    //action.type에 따라 다른 작업 수행
    switch(action.type){
        case 'INCREMENT':
            return { value : state.value + 1};
        case 'DECREMENT':
            return { value : state.value - 1};
        default : 
            //아무것도 해당되지 않을 때 기존 상태 반환
            return state;
    }
}

const Counter = ()=>{
    const [state, dispatch] = useReducer(reducer, { value : 0});

    return(
        <div>
            <p>
                현재 카운터 값은 <b>{state.value}</b>
            </p>
            <button onClick={()=>dispatch({ type : 'INCREMENT'})}>+1</button>
            <button onClick={()=>dispatch({ type : 'DECREMENT'})}>-1</button>
        </div>
    )
}

export default Counter;
```

- useReducer의 첫번째 파라미터는 리듀서 함수이고 두번째 파라미터는 해당 리듀서의 기본 값이다.

- 반환 값으로 state와 dispatch 함수를 반환한다.

  - dispatch함수는 action을 발생시키는 함수로 action값을 파라미터로 넣어주면 된다.

- action에 반드시 type을 지니고 있을 필요 없다.

- input의 state를 관리

  - 여러개의 state를 한번에 관리할 수 있다.

  ```jsx
  import React, { useState, useEffect, useReducer } from "react";
  
  function reducer(state, action){
      return {
          ...state,
          [action.name] : action.value
      }
  }
  
  const Info = ()=>{
      const [state, dispatch] = useReducer(reducer, {
          name : '',
          nickname : ''
      });
  
      const { name, nickname } = state;
  
      const onChange = e=>{
          dispatch(e.target);
      }
  
      return (
          <div>
              <input type="text" name="name" value={name} onChange={onChange} />
              <input type="text" name="nickname" value={nickname} onChange={onChange} />
              <span>이름 : {name}</span>
              <span>닉네임 : {nickname}</span>
          </div>
      )
  }
  
  export default Info;
  ```

# 11.4. useMemo

함수형 컴포넌트 내부에서 발생하는 연산을 최적화한다.

**[최적화 전]**

```jsx
import React, {useState} from "react";

const getAverage = numbers =>{
    console.log('평균값 계산 중...');
    if(numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b)=> a + b);
    return sum / numbers.length;
};

const Average = ()=>{
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    const onChange = e=>{
        setNumber(e.target.value);
    };
    const onInsert = e=>{
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    }

    return(
        <div>
            <input value={number} onChange={onChange} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value, index)=>(
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값 : </b> {getAverage(list)}
            </div>
        </div>
    )
}

export default Average;
```

- 숫자를 등록할 때 뿐만 아니라 input 내용이 수정될 때도 함수가 호출되는 문제가 있다.

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/db22ba9c-e4a4-4be2-bd84-fd165237404d/Untitled.png)

**[최적화 후]**

```jsx
import React, {useState, useMemo} from "react";

const getAverage = numbers =>{
    console.log('평균값 계산 중...');
    if(numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b)=> a + b);
    return sum / numbers.length;
};

const Average = ()=>{
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    const onChange = e=>{
        setNumber(e.target.value);
    };
    const onInsert = e=>{
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    }

    //최적화 할 함수와 값이 바뀌는 것을 판별할 변수를 파라미터로 넣는다.
    const avg = useMemo(()=> getAverage(list), [list]);

    return(
        <div>
            <input value={number} onChange={onChange} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value, index)=>(
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값 : </b> {avg}
            </div>
        </div>
    )
}

export default Average;
```

- 렌더링 과정에서 특정 값이 바뀌었을 때만 연산을 실행한다.

# 11.5. useCallback

리랜더링 할 때 마다 DOM에 등록된 이벤트 핸들러 함수가 새로 생성되는 것을 최적화하기 위해 사용된다. 해당 함수로 이벤트 핸들러 함수를 생성할 수 있다.

```jsx
import React, {useState, useMemo, useCallback} from "react";

const getAverage = numbers =>{
    console.log('평균값 계산 중...');
    if(numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b)=> a + b);
    return sum / numbers.length;
};

const Average = ()=>{
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    const onChange = useCallback(e=>{
        setNumber(e.target.value);
    }, []);

    const onInsert = useCallback(()=>{
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
    }, [number, list]); //number 혹은 list가 바뀌었을 때만 함수 생성

    //최적화 할 함수와 값이 바뀌는 것을 판별할 변수를 파라미터로 넣는다.
    const avg = useMemo(()=> getAverage(list), [list]);

    return(
        <div>
            <input value={number} onChange={onChange} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value, index)=>(
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값 : </b> {avg}
            </div>
        </div>
    )
}

export default Average;
```

- 첫번째 파라미터는 생성하고 싶은 함수, 두번째 파라미터는 배열이다.
  - 해당 배열의 변수의 값이 변하면 함수를 새로 생성한다.
    - 함수가 의존하는 상태 값이 있다면 반드시 작성해줘야한다.
  - 배열이 비어있다면 컴포넌트가 렌더링 될 때 한번만 생성된다.

# 11.6. useRef

함수형 컴포넌트에서 ref를 사용하기 위해 이용되는 기능이다.

```jsx
import React, {useState, useMemo, useCallback, useRef } from "react";

const getAverage = numbers =>{
    console.log('평균값 계산 중...');
    if(numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b)=> a + b);
    return sum / numbers.length;
};

const Average = ()=>{
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');
    const inputEl = useRef(null); //ref

    const onChange = useCallback(e=>{
        setNumber(e.target.value);
    }, []);

    const onInsert = useCallback(()=>{
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
        //ref로 지정된 tag에 포커스 맞추기
        inputEl.current.focus();
    }, [number, list]); //number 혹은 list가 바뀌었을 때만 함수 생성

    //최적화 할 함수와 값이 바뀌는 것을 판별할 변수를 파라미터로 넣는다.
    const avg = useMemo(()=> getAverage(list), [list]);

    return(
        <div>
            <input value={number} onChange={onChange} ref={inputEl} />
            <button onClick={onInsert}>등록</button>
            <ul>
                {list.map((value, index)=>(
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값 : </b> {avg}
            </div>
        </div>
    )
}

export default Average;
```

렌더링과 상관없이 바뀔 수 있는 값인 로컬 변수를 선언할 때도 사용된다.

```jsx
import React, { useRef } from "react";

const RefSample = ()=>{
    const id = useRef(1);
    const setId = (n)=>{
        id.current = n;
    }

    const printId = ()=>{
        console.log(id.current);
    }

    return(
        <div>
            refsample
        </div>
    )
};

export default RefSample;
```

class형 컴포넌트에서는 속성으로 선언이 가능하다.

# 11.7. 커스텀 Hooks 만들기

여러 컴포넌트에서 비슷한 기능이 필요할 경우 이를 Hook으로 작성하여 재사용할 수 있다.

```jsx
import { useReducer } from "react";

function reducer(state, action){
    return{
        ...state,
        [action.name] : action.value
    }
}

export default function useInputs(initialForm){
    const [state, dispatch] = useReducer(reducer, initialForm);
    const onChange = e=>{
        dispatch(e.target);
    };

    return [state, onChange ]
}
import React from "react";
import useInputs from "./useInputs";

const Info = ()=>{

    const [state, onChange] = useInputs({
        name : '',
        nickname : ''
    })

    const { name, nickname } = state;

    return (
        <div>
            <input type="text" name="name" value={name} onChange={onChange} />
            <input type="text" name="nickname" value={nickname} onChange={onChange} />
            <span>이름 : {name}</span>
            <span>닉네임 : {nickname}</span>
        </div>
    )
}

export default Info;
```

다른사람들이 만든 Hook을 라이브러리로 설치하여 이용할 수 도 있다.
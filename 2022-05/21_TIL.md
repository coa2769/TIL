# 05월 21일

> React.js 면접 질문 정리

---

- 해당 URL의 내용을 참조했다. -> https://xiubindev.tistory.com/119

- 질문과 답변이 같이 있음 -> https://velog.io/@dojunggeun/React-interview-questions-15

- # << React.js관련 >>

- 1. Virtual DOM이 무엇인지 설명해주세요. or Virtual DOM 작동 원리에 대해 설명해주세요. ()

- Virtual DOM은 HTML Element를 메모리 상에서 구현한 것으로 컴포넌트를 업데이트 할 때 기존의 DOM 과 비교하여 변경 사항을 알아내는데 사용됩니다. 

- 이렇게 변경 사항만을 업데이트 하므로 효율성을 높일 수 있습니다.

-  

- 2. 클래스형 컴포넌트와 함수형 컴포넌트의 차이에 대해 설명해주세요.

- 클래스형 컴포넌트 란?

- - ES6 문법인 class 를 기반으로 컴포넌트를 구현 방법.
  - 내부 state와 생명주기 메소드(Lifecycle      methods)가 존재한다.

- 함수형 컴포넌트 란?

- - React      16.8 이후 도입된 컴포넌트 구현 방법.
  - State와 생명주기 메소드(Lifecycle      methods)이 없는 대신 hook으로 이 기능을 대체한다.

-  

- 3. 생명 주기 메서드에 대해 설명해주세요.

- Mount, update, unmout 될 때 마다 클래스 컴포넌트에서 주기적으로 호출되는 메서드를 말합니다.

- - componentWillMount: 컴포넌트가 생성된 후 DOM에 렌더링되기 전에 호출됩니다.
  - componentDidMount: 처음으로 렌더링이 끝나고 컴포넌트의 DOM 엘리먼트가 사용 가능할 때 호출됩니다.
  - componentWillReceiveProps:      props가      업데이트 될 때 호출됩니다.
  - shouldComponentUpdate: 새로운 props를 받았을 때 호출되며, 성능 최적화를 위해 리랜더링을 막을 수      있습니다.
  - componentWillUpdate: 새로운 props를 받았고 shouldComponentUpdate가 true를 리턴할 때 호출됩니다.
  - componentDidUpdate: 컴포넌트가 업데이트된 후에 호출됩니다.
  - componentWillUnmount: 컴포넌트가 DOM에서 제거되기 전에 호출되어 이벤트리스너      등을 정리할 수 있게 해줍니다.

-  

- 출처: <https://velog.io/@dojunggeun/React-interview-questions-15> 

-  

- 4. Unmout 생명 주기 일 때 어떤 작업을 하나요?

- 연결했던 이벤트 리스너나 생성한 객체를 제거하는 작업을 주로 합니다.

-  

- 5. 리액트에서 JSX문법이 어떻게 사용되나요?

- JSX는 HTML같은 코드를 작성할 수 있도록 JS 확장한 문법입니다.

- JSX는 컴파일 될 때 함수 호출 방식으로 변환됩니다.

-  

- 이 JSX를 보세요:

-    **<div** **className**="sidebar" **/>**   

-  

- 이것은 아래의 자바스크립트로 변환됩니다:

- | 1      2      3      4 | React**.**createElement**(**    'div'**,**    **{**className**:** 'sidebar'**}**   **)** |
  | ---------------------- | ------------------------------------------------------------ |
  |                        |                                                              |

-   

- 6. useMemo와      useCallback에 대해 설명해주세요.

- https://basemenks.tistory.com/238

- 메모이제이션(memoization) 란?

- 기존에 수행한 연산의 결과값을 어딘가에 저장해두고 동일한 입력이 들어오면 재활용하는 프로그래밍 기법을 말한다. 

- useMemo란?

- 연산 값을 저장해 두었다가 렌더링 과정에서 특정 값이 바뀌었을 때만 재연산을 실행하고 바뀌기 않았다면 저장해둔 값을 반환한다. 

- useCallback 이란?

- 컴포넌트가 렌더링 될 때 마다 내부에 선언된 변수 또는 함수 등도 매번 다시 선언된다. 이렇게 매번 함수를 생성하는 것을 막기 위해 사용된다.

- 특정 값이 바뀌었을 때만 새로운 함수를 반환하는 것이다.

-  

- 7. useEffect에 대해 설명 생명 주기와 함께 설명해주세요.

- 마운트나 리랜더링 완료 직후 실행할 작업을 설정하기 위해 useEffect를 사용합니다.

- - 마운트 될 때만 실행하고 싶다면      useEffect의 두번째 파라미터에 빈 배열을 넣어준다.
  - 특정 값이 업데이트될 때만 실행하고 싶다면      useEffect의 두번째 파라미터에 배열에 해당 state나 props 값을 넣어준다.
  - 업데이트 직전 또는 언마운트 되기 전에 실행하고 싶다면 첫번째 파라미터인 callback함수에서 함수를 반환하면 된다.
  - 언마운트 될 때만 callback함수에서 반환하는 함수를 호출하고 싶다면 두번째 파라미터에 빈 배열을 넣으면 된다.

-  
# 수업소개

### Redux란 ?

한 곳에서 데이터(state)들을 저장.

제공하는 함수로만 저장된 데이터를 읽고, 수정하는 것이 가능하다.

수정이 일어났을 때 해당 데이터(state)를 사용하는 모든 코드에 이를 알려주고 필요한 동작을 하게 해준다.



react에서만 사용 되는 라이브러리가 아니라 JS로 개발되는 모든 프로그램에서 사용 가능하다.



# 리덕스 여행의 지도 : 소개

### 리덕스 지도

<img src="C:\Users\clnme\Desktop\TIL\react redux\00 image\redux(01).png" alt="redux 흐름" style="zoom:200%;" />

[모르는 영어단어 뜻]

reducer : 감속기

subscribe : 구동하다

# 리덕스 여행의 지도 : state와 render 의 관계

[ 지도 적힌 용어들 ]

- store : 정보가 저장되는 곳.

- state : 실제 정보가 저장되는 곳. 개발자는 직접 접근 금지.

- reducer : 개발자가 작성하는 함수. 이 함수를 redux에 제공하여 저장소를 만든다.

  ```js
  function reducer(oldState, action){
      ...
  }
      
  var store = Redux.createStore(reducer);
  ```

- render : ui를 만드는 역활. 개발자가 작성한 코드.

- subscribe : state에 접근하기 위해 redux가 제공하는 함수. state값이 바뀔 때 마다 해당 state와 관련된 render함수를 호출하여 다시 화면을 그리도록 해준다.

  ```js
  store.subscribe(render); //render함수 등록
  ```

- getState : state에 접근하기 위해 redux가 제공하는 함수.

  ```js
  function render(){
      var state = store.getState();
      //...
      document.querySelector('#app').innerHTML = `
      	<h1>WEB</h1>
      	...
      `;
  }
  
  ```

![subscribe & getState](C:\Users\clnme\Desktop\TIL\react redux\00 image\redux(02).png)



# 리덕스 여행의 지도 : action과 reducer

- action : dispatch함수에 매개변수로 전달되는 객체.

  ```html
  <form onsubmit="
  	//..
  	store.dispatch({type : 'create', payload : {title : title, desc : desc}});
  ">
  ```

- dispatch :  state에 접근하기 위해 redux가 제공하는 함수. action을 전달받고 reducer를 통해 state의 값을 수정하고 subscribe를 통해 render함수를 실행하여 화면을 갱신한다.

  - dispatch --> reducer : 현재 state값과 action 객체 전달. 

  - reducer는 변경된  state 값을 반환해준다.

    ```js
    function reducer(state, action){
        if(action.type === 'create'){
            var newContents = oldState.contents.concat();
            var newMaxId = oldState.maxId + 1;
            newContents.push({id : newMaxId, title : action.payload.title});
            return Object.assign({}, state, {
                contents : newContents,
                maxId : newMaxId,
                mode : 'read',
                selectedId : newMaxId
            });
        }
    }
    ```



# Redux가 좋은 가장 중요한 이유

클릭한 색상 버튼에 따라 상자의 색깔이 바뀌는 예제를 Redux가 없을 때와 있을 때 차이에 대해 알아보려 한다.

- Redux가 없때 생길 수 있는 문제

  - 상자의 갯수가 늘어날 수 록 코드가 기하급수 적으로 늘어날 것이다.
  - 각 상자의 색깔을 바꾸는 코드들이 서로에게 연관되어 코드의 수정과 삭제가 복잡해진다.

  ![Redux 없을 때](C:\Users\clnme\Desktop\TIL\react redux\00 image\redux(03).png)

- Redux가 있을 때

  - 각각의 상자는 상태를 바꾸는 코드와 자신을 변경하는 코드만을 가지고 있으면 되므로 작성해야할 코드를 줄일 수 있다.

  - 각각의 상자가 서로 연관되어 있지 않으므로 코드를 수정 삭제했을 대 다른 상자를 수정할 필요가 없어진다.

    ![Redux가 있을 때](C:\Users\clnme\Desktop\TIL\react redux\00 image\redux(04).png)



Redux 자체가 지원하는 Tool로 State가 변화하는 과정을 확인 할 수 있다.

![Redux Tool](C:\Users\clnme\Desktop\TIL\react redux\00 image\redux(05).png)



# Redux가 없다면 

./redux/without-redux.html 참조





# Redux의 적용 : store생성

./redux/with-redux.html 참조







# Redux의 적용 : reducer와 action을 이용해서 새로운  state값 만들기

./redux/with-redux.html 참조

- state를 object.assign로 복제한 객체를 수정하여야 redux가 제공하는 편의 기능들을 모두 사용할 수 있다.
  - 이런 원복 객체를 복제하여 수정하는 것들이 immtable과 관련이 있다.

# Redux의 적용 : state의 변화에 따라서 UI반영하기

./redux/with-redux.html 참조







# Redux 선물 : 시간여행과 로깅

Redux-devTool로 state가 변경되는 과정들을 알 수 있다.







# 실전 Redux : 정적인 웹페이지 만들기

이하 ./redux/main.html 참조









# 실전 Redux : 부품화









# 실전 Redux : store 생성과 state 사용하기









# 실전 Redux : action을 dispatch를 통해서 전달하기









# 실전 Redux : subscribe를 통해서 자동 갱신 되도록 처리











# 실전 Redux : 글생성 기능 구현











# 실전 Redux : 글삭제 기능 구현











# 수업을 마치며


















# 04월 05일

> CSS 레이아웃 관련 정리

# 03 Flexible box Layout - flex

# 3.1. Flexbox 란?

## 3.1.1. Flexbox 특징

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4803d316-e117-40c2-8a0e-87b317df3806/Untitled.png)

- Container에 적용할 수 있는 속성들

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9a3263d3-7065-45cf-adb2-adf501511403/Untitled.png)

  ```css
  .container{
    background : beige;
    height : 100vh;
    display : flex;
    flex-direction : row;
    flex-wrap : wrap;
    
    justify-content : space-between;
    align-items : baseline;
    align-content : center;
  }
  ```

  - display

  - flex-direction : 해당 box내부의 중심축(main axios)를 지정할 수 있다.

  - flex-wrap : 해당 줄에 item이 꽉찼다면 어떻게 처리할 것인가 지정할 수 있다. (기본 값은 nowrap이다.)

  - flex-flow : flex-direction과 flex-wrap을 한번에 지정해준다.

    ```css
    .container{
      background : beige;
      height : 100vh;
      display : flex;
      flex-flow : column wrap;
    }
    ```

  - justify-content : 중심축(main axios)에서 item들을 어떻게 배치할 것인지 지정해준다. (item들의 순서와 정렬을 지정할 수 있다)

  - align-items : 한줄에 있는 item들에 대해 반대축(cross axios) 방향으로 어떻게 배치할 것인지 지정해준다.

  - align-content : 여러 행을 정렬할 때 item들에 대해 반대축(cross axios) 방향으로 각 행을 어떻게 배치할 것인지 지정해준다.

- item에 적용할 수 있는 속성들

  - order : item들의 배치 순서가 바뀐다.

    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/577c36e8-5026-44f5-875d-6436fc049f43/Untitled.png)

  - flex-grow : 부모 Box의 중심축(main axios) 행의 공간을 얼마나 차지하는지 지정해 줄 수 있다. (기본 값은 0이므로 화면 크기를 줄이거나 늘려도 크기가 변하지 않는다.)

  - flex-shrink : 부모 Box가 작아질때(화면 크기를 줄일 때) item들이 어떻게 동작하는지 지정해줄 수 있다.

  - flex-basis :

  - align-self

- 중심축(main axios)과 반대축(cross axios)이 존재한다.

  - item들이 정렬되는 축을 중심축(main axios)
  - 중심축(main axios)에 직각을 반대축(cross axios)라고 한다.

---

# 02 positioning layout - position

# 2.1. position 이란?

top, bottom, left, right로 요소의 위치를 바꾸는 레이아웃이다.

# 2.2. position 에 줄 수 있는 속성

모든 요소는 기본적으로 position의 값이 static이다.

## 2.2.1. relative

원래 위치에서 상대적으로 이동한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/801d288c-38e0-452b-8bed-46508271958c/Untitled.png)

## 2.2.2. absolute

내 부모 요소의 Box를 기준으로 위치를 이동한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f6cc83f5-ed79-418e-b306-1a28f1d42102/Untitled.png)

## 2.2.3. fixed

해당 page를 기준으로 위치를 이동한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/48b8ae78-5295-41cb-97d6-9ef9ee5984e8/Untitled.png)

## 2.2.4. sticky

page를 스크롤할 때 지정한 위치까지 이동하고 멈춘다. 계속 스크롤하여도 지정한 위치에서 이동하지 않는다.

만약 지정한 위치가 없다면 정상적으로 스크롤된다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/446450b9-aba9-4086-a31a-fe72294a810c/Untitled.png)

------

### reference

[position - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position)

---

# 07 block과 inline 속성

# 7.1. Block 이란?

css가 지정한 Box의 크기에 맞춰서 한줄에 하나만을 배치한다.

# 7.2. Inline 이란?

컨텐츠의 크기에 맞춰서 요소의 크기를 조절한다. css로 설정한 크기에 대한 모든 속성을 무시한다.

# 7.3. Inline-block 이란?

컨텐츠 크기와 상관없이 css가 지정한 Box의 크기에 맞춰서 한줄에 나란히 배치한다.

# 7.4. 예제 적용 화면
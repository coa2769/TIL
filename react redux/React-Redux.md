# 수업 소개

![React Redux를 사용했을 때 구조](C:\Users\clnme\Desktop\TIL\react redux\00 image\react-redux(01).png)

[ react만으로 애플리케이션을 개발 했을 때 문제점 ]

- 서로 무조건 연결되어 있어야 한다.
- 자신에게 필요없는 정보도 전달 된고 이로 인해 리렌더링된다.
- 





# 수업 계획





# redux 없는 react 컴포넌트 구조 만들기







# redux없는 react 컴포넌트 상태 연결하기





# redux를 도입

./react-redux 프로젝트 참조

- store.js에서 store를 생성한다.

  



# react 컴포넌트에서 redux에 종속된 기능을 제거

./react-redux 프로젝트 참조

react 컴포넌트들이 store에 종속되어 부품으로써 작동하지 못하기 때문에 store를 사용하는 컴포넌트를 감싸는 container컴포넌트를 만든다.



기존 ui 출력과 연관된 컴포넌트를 프리젠테이션 컴포넌트

프리젠테이션 컴포넌트를 감싸고 redux와 관련된 처리를 하는 container 컴포넌트

로 분리하여 개발한다.



# 컴포넌트의 재사용성을 높이기 위해 container 컴포넌트 도입

./react-redux 프로젝트 참조









# React Redux가 필요한 이유

./react-redux 프로젝트 참조

-  container 컴포넌트를 만드는 것들을 더 간결한 코드로 작업하기 위해서 사용한다.









# connect & provider

./react-redux 프로젝트 참조







# mapStatePrps

./react-redux 프로젝트 참조

DisplayNumber컴포넌트는 state수정에 따라 render함수를 호출해야 하므로 해당 해당 함수를 사용한다.







# mapDispatchToProps

./react-redux 프로젝트 참조

AddNumber컴포넌트는 state수정이 이루어지므로 해당 함수를 사용한다.





# 수업을 마치며






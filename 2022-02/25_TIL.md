# 02월 25일

> 'Docker에 node.js 서버 구축' 관련 내용 정리

## Docker에 node.js 서버 구축

### 1. Docker 란?

아래 두 스크립 보기

[[Docker\] Docker는 무엇인가(Environment Disparity)](https://ebbnflow.tistory.com/200?category=842625)

[[Docker\] Windows Docker와 Virtual Box](https://ebbnflow.tistory.com/204?category=842625)

### 2. Docker 사용법

1. DockerFile 작성 : 어플리케이션 구동을 위해 필요한 것들을 작성.
   - 필요 파일
   - install dependencies(프레임워크, 라이브러리)
   - 환경변수
   - 구동을 위한 스크립트
2. image 생성 : DockerFile로 작성한 대로 구성된 환경의 image.
3. Container 구동 : 만들어진 image를 구동할 수 있는 고립된 환경.

#### 2.1. DockerFile 작성

### 3. Docker 배포

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b0956e7f-c2f8-44e2-b805-2bbc663ea08c/Untitled.png)

1. 생성한 image를 Container Registry에 등록
2. 등록된 image를 Server에서 내려 받아 구동한다.(이 때 server에는 Docker가 설치되어 있어야 한다.)

##### Container Registry 종류

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9bf83159-7d39-44f1-902f-32efebbe1a93/Untitled.png)

------

### Reference

[도커 한방에 정리 🐳 (모든 개발자들이 배워보고 싶어 하는 툴!) + 실습](https://www.youtube.com/watch?v=LXJhA3VWXFA&ab_channel=드림코딩by엘리)
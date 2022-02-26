# 02월 26일

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

#### 2.1. DockerFile 작성 방법

```docker
FROM node:16-alpine 

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY index.js .

ENTRYPOINT [ "node", "index.js" ]
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7f07c7ef-bffe-48ff-8b07-ab1985fa08d1/Untitled.png)

- Layer 구조로 되어 있다. (높은 Layer일 수록 더 자주 변경되는 것이 위치한다.)
  - 변경된 Layer 위에 있는 모든 Layer가 다시 빌드 되기 때문이다.

##### Dockerfile 문법

- From
  - base image를 선택한다.
  - Defualt는 가장 기본적인 리눅스 이미지 이다.
  - node같은 대중적인 엔진또는 프레임워크의 경우 이미 설치된 이미지가 있기도 하므로 검색해 보자.
- WORKDIR
  - 해당 이미지 안에서 어떤 경로의 폴더에서 아래의 명령어를 실행 할 것인지 설정한다.
  - ADD, COPY, CMD, ENTRYPOINT, RUN 등의 명령어가 있다.
- COPY
  - 나열된 파일, 폴더를 해당 이미지에서 WORKDIR로 지정한 경로에 복사한다.
- RUN
  - 해당 이미지의 WORKDIR로 지정한 경로에서 명령어를 실행한다.
  - npm install대신 npm ci를 사용한 이유는?
    - npm ci는 package-lock.json에 명시된 버전의 패키지만 설치하지만 npm install은 최신 버전의 패키지를 가져오기 때문이다.
- ENTRYPOINT
  - 엔진이나 파일을 실행하는 명령어
    - 예제에서는 node와 index.js를 실행하고 있다.

##### Dockerfile 빌드

```
docker build -f Dockerfile -t fun-docker .
```

- -f : 어떤 Dockerfile을 사용할 것인지 지정해 준다.
- -t : 빌드된 image의 이름을 지정해준다.
- ‘ . ‘ : Dockerfile를 빌드할 때 필요한 파일들이 어느 경로에 있는지 지정한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/337a33de-0731-47ee-a3c8-0936515306ab/Untitled.png)

#### 2.2. Container 실행

```
docker run -d -p 8080:8080 fun-docker
```

- -d : (detached) Container는 백그라운드에서 실행하고 터미널은 해당 명령어 실행에서 빠져나온다.

- -p : host machine의 port와 Container의 port를 연결해준다.

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ba30e31c-a620-47ec-b3f2-a7cfa363abc2/Untitled.png)

- 예제 실행

  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8e714bfe-4b9c-4049-a270-43fe5769e130/Untitled.png)

### 3. Docker 배포

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b0956e7f-c2f8-44e2-b805-2bbc663ea08c/Untitled.png)

1. 생성한 image를 Container Registry에 등록
2. 등록된 image를 Server에서 내려 받아 구동한다.(이 때 server에는 Docker가 설치되어 있어야 한다.)

##### Container Registry 종류

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9bf83159-7d39-44f1-902f-32efebbe1a93/Untitled.png)

------

### Reference

[도커 한방에 정리 🐳 (모든 개발자들이 배워보고 싶어 하는 툴!) + 실습](https://www.youtube.com/watch?v=LXJhA3VWXFA&ab_channel=드림코딩by엘리)

dockerfile reference

[Dockerfile reference](https://docs.docker.com/engine/reference/builder/)

best fokerfiles
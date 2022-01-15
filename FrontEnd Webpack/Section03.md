# NPM 지역 설치 명령어와 제거 명령어 - uninstall

> npm uninstall [라이브러리 이름]

- 패키지를 삭제하는 명령어



# NPM 전역 설치 명령어 - install --global

> npm install [라이브러리 이름]  --global

- 시스템 레벨의 전역으로 설치된다.
- 특정 프로젝트의 `node_modules`에 설치되지 않는다.



# 전역으로 설치된 라이브러리 경로 확인

```sh
# window
%USERPROFILE%\AppData\Roaming\npm\node_modules

# mac
/usr/local/lib/node_modules
```

- --g 옵션으로 설치할 시 해당 경로에 라이브러리 폴더가 생성된다.



# 지역 설치와 전역(--global) 설치 비교 정리

- 전역 설치는 시스템 레벨에서 사용할 JS 라이브러리를 설치할 때 사용된다.

- 라이브러리가 설치되면 CMD에서 라이브러리 이름을 입력하면 명령어로 인식한다.

  ```sh
  npm install glup -global
  
  glup
  ```



# 지역 설치 명령어 옵션 --save-dev(-D)

```shell
npm install [라이브러리 명] --save-prod
npm install [라이브러리 명] --save-dev
npm i [라이브러리 명] -D
```

- 지역 설치 옵션에는 --save-prod와 --save-dev 두가지가 있다.

  - 두 명령어는 package.json에서 각각 다른 영역에 선언된다.

    - --save-prod는 dependencies(배포용)

    - --save-dev는 devDependencies(개발용)

      ```json
      {
        "name": "npm",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "",
        "license": "ISC",
        "dependencies": {
          "jquery": "^3.6.0"
        },
        "devDependencies": {
          "vue": "^2.6.14"
        }
      }
      ```

- --save-dev는 -D로 축약할 수 있다.

- install은 i로 축약할 수 있다.

# dependencies와 devDependencies의 차이점

- dependencies(배포용)는 애플리케이션의 화면이나 로직에 연관된 라이브러리들이 주로 선언된다.
  - react, vue, angular, jquery
- devDependencies(개발용)는 개발을 할 때 보조해주는 라이브러리들이 주로 선언된다.
  - ex) webpack, js-compress, sass



# 개발용 라이브러리와 배포용 라이브러리 구분하기

- 프로젝트를 빌드할 때 devDependencies에 선언된 라이브러리들을 같이 빌드되어 배포되지 않는다.
  - 개발 보조에만 쓰이고 화면에 직접 영향을 주지 않기 때문에 배포시에는 필요없기 때문이다.






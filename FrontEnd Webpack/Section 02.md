# Node.js와 NPM 소개
- Node 12.16.1 이상의 버전을 사용해야 한다.

# NPM 소개
> 명령어로 JS의 라이브러리를 관리해주는 도구. (패키지 매니저)

- npm 에서 JS 라이브러리를 검색하여 설치 후 이용가능하다.


# NPM 시작하기
- node.js를 설치할 때 npm도 같이 설치된다.


# NPM 초기화 명령어 - init
- 프로젝트에 대해 정의한다.
- 명령어 완료후 `package.json` 파일이 생성된다.
```bash
package name: (npm)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to C:\Users\clnme\Desktop\TIL\FrontEnd Webpack\npm\package.json:

{
  "name": "npm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
```
- npm init -y
    - 기본 값 그대로 바로 `package.json`이 생성된다.

# NPM 설치 명령어 - install
특정 라이브러리를 설치하는 명령어.
- `node_modules` 폴더가 생성된다.
    - 설치된 라이브러리는 `node_modules` 폴더 아래에 생성된다.
- `package.json`의 dependencies에 설치된 라이브러리가 버전과 함께 표시된다.
```json
"dependencies": {
    "jquery": "^3.6.0"
}
```

# NPM을 사용하는 이유와 첫 번째 장점
- 이 프로젝트에서 쓰이는 라이브러리 목록과 버전을 한 눈에 확인할 수 있다.

# NPM의 두 번째 장점
- 해당 라이브러리의 페이지에 가서 CDN으로 불러오지 않아도 명령어로 설치만 하면 사용이 가능하다.


# NPM 배운 내용 정리
- 위 내용들 정리하는 강의




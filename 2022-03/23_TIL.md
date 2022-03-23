# 03월 23일

> React + Typescript 프로젝트 생성 

# React + Typescript 개발 환경 구축

# Create React App의 template 이용

Create React App 에서 Typescript로 된 프로젝트 template을 제공한다. 이를 명령어를 통해 가져올 수 있다.

```bash
create-react-app [프로젝트 명] --template typescript
```

- tsconfig.json에 “baseUrl”을 추가하여 절대 경로를 지정해준다. (추후 개발에 도움이 된다)

  ```bash
  {
    "compilerOptions": {
      "target": "es5",
      "lib": [
        "dom",
        "dom.iterable",
        "esnext"
      ],
      "baseUrl": "./src", 
      "allowJs": true,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "noFallthroughCasesInSwitch": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx"
    },
    "include": [
      "src"
    ]
  }
  ```

------

### reference

[Getting Started | Create React App](https://create-react-app.dev/docs/getting-started#creating-a-typescript-app)

[[React\] create-react-app & Typescript 초기 세팅법 완벽 정리](https://koras02.tistory.com/106)
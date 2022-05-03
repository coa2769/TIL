# 04월 06일

> React-Router v5

# 13. Router v5

# 13.1. Router 버전에 대해

2022년 04월 06일 현재 React 버전이 이미 v6으로 업데이트 된 후이다. 하지만 여러 예제코드들의 사용하고 다른 라이브러리들과의 호환을 생각하여 v5를 사용하려 한다.

# 13.2. 설치

아래의 두 패키지를 설치한다.

```bash
npm i react-router

npm i react-router-dom
```

# 13.3. 사용법

```tsx
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import App from './layouts/App/index'

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? '<https://sleact.nodebird.com>' : '<http://localhost:3090>';

render(
  <BrowserRouter>
      <App />
  </BrowserRouter>,
  document.querySelector('#app'),
);
import loadable from '@loadable/component';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Workspace = loadable(() => import('@layouts/Workspace'));
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));

const App = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/login" />
    </Route>
    <Route path="/login" component={LogIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/workspace/:workspace" component={Workspace} />
  </Switch>
);
```

- `<BrowserRouter>` : 최상위 컴포넌트를 감싼다.
- `<Switch>` : /일때, /하위 경로일 때 모두 화면에 출력되지 않도록 한다.
- `<Route exact path='/' ...>` : excat는 해당 라우터와 경로가 일부분 같을 때 중복 출력되지 안도록해준다. ex) /route1 , /route1/index 를 중복 출력하지 않는다.

------

### reference
# 04월 11일

> React-Router v5

---

# 13. Router v5

# 13.1. Router 버전에 대해

2022년 04월 06일 현재 React 버전이 이미 v6으로 업데이트 된 후이다. 하지만 여러 예제코드들의 사용하고 다른 라이브러리들과의 호환을 생각하여 v5를 사용하려 한다.

# 13.2. 설치

아래의 두 패키지를 설치한다.

```bash
npm i react-router

npm i react-router-dom
```

# 13.3. Router 사용

```tsx
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import NumberBaseball from './NumberBaseball';
import RSP from './RSP';
import Lotto from './Lotto';

import App from './layouts/App';

render(
  <BrowserRouter>
    <Route path="/number-baseball" component={NumberBaseball} />
    <Route path="/rock-scissors-paper" component={RSP} />
    <Route path="/lotto-generator" component={Lotto} />
  </BrowserRouter>,
  document.querySelector('#app'),
);
```

- ```
  <BrowserRouter>
  ```

   : 최상위 컴포넌트를 감싼다. 라우터를 사용하기 위해 꼭 필요하다.

  - React-Router v3에 있던 HashRouter는 더이상 사용되지 않는다.

- `<Route>` : 라우팅될 페이지를 선언한다.

# 13.4. Link 사용

```tsx
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import NumberBaseball from './NumberBaseball';
import RSP from './RSP';
import Lotto from './Lotto';

import App from './layouts/App';

render(
  <BrowserRouter>
    <div>
      <Link to="/number-baseball">숫자야구</Link>
      <Link to="/rock-scissors-paper">가위바위보</Link>
      <Link to="/lotto-generator">로또생성기</Link>
    </div>

    <div>
      <Route path="/number-baseball" component={NumberBaseball} />
      <Route path="/rock-scissors-paper" component={RSP} />
      <Route path="/lotto-generator" component={Lotto} />
    </div>
  </BrowserRouter>,
  document.querySelector('#app'),
);
```

- ```
  <Link>
  ```

   : React-Router에서 <a> 대신 쓰인다. Reload되지 않고도 페이지를 이동할 수 있기 때문에 사용된다.

  - React-Router는 실제로 페이지를 서버에서 새로 가져오지 않는다. 다만 URL을 변경해 주고 페이지가 라우팅 되는 것 처럼 보이게 해준다.

# 13.5. params

```tsx
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import GameMatcher from './GameMatcher ';

import App from './layouts/App';

render(
  <BrowserRouter>
    <div>
      <Link to="/game/number-baseball">숫자야구</Link>
      <Link to="/game/rock-scissors-paper">가위바위보</Link>
      <Link to="/game/lotto-generator">로또생성기</Link>
    </div>

    <div>
			<Route path="/game/:type" component={GameMatcher } />
    </div>
  </BrowserRouter>,
  document.querySelector('#app'),
);
//GameMatcher.tsx
import React from 'react';
import NumberBaseball from './NumberBaseball';
import RSP from './RSP';
import Lotto from './Lotto';

const GameMatcher = (props)=>{
  
  if(props.match.params.name === 'number-baseball') return <NumberBaseball/>
  else if(props.match.params.name === 'rock-scissors-paper') return <RSP/>
  else if(props.match.params.name === 'lotto-generator') return <Lotto/>

  return null;
}
```

- 주소 중에서 앞에 

  ```
  :
  ```

   가 붙은 것을 params라고 한다. 해당 값은 동적으로 바뀔 수 있다.ㅜ

  - ex) /game/number-baseball, /game/rock-scissors-paper, /game/lotto-generator

- params가 있는 주소에 연결된 컴포넌트에서 props로 history, location, match 가 전달된다.

  - history : 페이지를 넘나든 내역을 가지고 있다. 페이지를 넘나들 수 있는 함수를 가지고 있다.
    - ex) go(), goBack(), goForward() 등의 함수
  - match : 라우터 주소에 대한 정보가 들어있다.
    - ex) params, path, url
  - location : 현재 페이지의 주소에 대한 정보가 들어 있다.
  - 라우터에 연결되지 않은 컴포넌트에서 해당 props를 사용하고 싶다면 `react-router-dom`의 `withRouter` 훅을 사용하자.(Routerv5에서 사용할 수 있는지 확인 필요)

# 13.6. querystring

```tsx
localhost:8080/game/lotto-generator?query=10&hello=zerocho&by=react
```

- URL에서 `?` 이후의 내용들을 querystring이라고 한다.

- `[key]=[vale]` 형태이며 `&`로 여러 키값을 이어붙일 수 있다.

- `props.location.search` 에 해당 값이 들어 있다.

- URLSearchParams()함수로 querystring에 쉽게 접근할 수 있다.

  ```tsx
  let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
  ```

# 13.7. Switch

```tsx
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

- ```
  <Switch>
  ```

   : 주소가 일치하는 한 경로만을 출력되도록 하고 싶을 때 사용된다. 해당 tag 아래에 Route들을 나열하면 된다.

  - 상위 주소만 일치해도 출력되는 문제가 생긴다.

- `exact` : 해당 주소와 완벽하게 같을 때만 출력되도록 하는 속성이다.(Switch로 해결되지 않을 때 사용된다.)

### reference

[React Router: Declarative Routing for React](https://v5.reactrouter.com/web/guides/quick-start)

---


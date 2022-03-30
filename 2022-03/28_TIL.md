# 03월 28일

> React 강의 내용 정리

---

# 12. Router

> react-router v6 를 기준으로 작성했다.

# 12.1. 사용방법

1. 라이브러리 설치

```bash
npm i react-router-dom
```

아래의 공식문서 참조

[React Router](https://reactrouter.com/docs/en/v6/getting-started/tutorial)

1. BrowserRouter 컴포넌트를 가져와 라우팅할 위치에 사용한다.

   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { BrowserRouter } from 'react-router-dom'; //+
   import './index.css';
   import App from './App';
   import reportWebVitals from './reportWebVitals';
   
   ReactDOM.render(
     <React.StrictMode>
       {/* BrowserRouter 추가 */}
       <BrowserRouter> 
         <App /> 
       </BrowserRouter>
     </React.StrictMode>,
     document.getElementById('root')
   );
   
   // If you want to start measuring performance in your app, pass a function
   // to log results (for example: reportWebVitals(console.log))
   // or send to an analytics endpoint. Learn more: <https://bit.ly/CRA-vitals>
   reportWebVitals();
   ```

   - HTML5의 Histroy API를 사용하지 않고도 주소를 변경할 수 있다.
   - 현재 주소와 간련된 정보를 props로 쉽게 조회할 수 있다.

2. 만든 페이지를 Route 컴포넌트로 특정 주소에 연결.

   ```jsx
   <Routes>
   	<Route path="주소규칙" element={ 보여 줄 컴포넌트 JSX } />
   </Routes>
   ```

   ```jsx
   import './App.css';
   import { Routes, Route } from 'react-router-dom'
   import Home from './Home.js';
   import About from './About.js';
   
   function App() {
     return (
       <div className="App">   
           <Routes>
             <Route path='/' element={<Home />} />
             <Route path='/about' element={<About />} />
           </Routes>
       </div>
     );
   }
   
   export default App;
   ```

   - Route컴포넌트는 꼭 Routes컴포넌트의 직속 자식으로 사용되어야 한다.

### Link컴포넌트를 사용하여 다른 페이지로 이동하는 링크 출력

<a>는 페이지를 이동할 때 브라우저에서 페이지를 불러오기 때문에 React-Router에서는 사용할 수 없다. 그러므로 <a>를 대신하여 Link 컴포넌트를 사용한다.

Link컴포넌트는 페이지를 다시 불러오는 것을 막고 History API를 통해 브라어저 주소의 경로만 바꿀 수 있다.

```jsx
<Link to="경로">링크 이름</Link>
import React from 'react';
import { Link } from 'react-router-dom';

const Home = ()=>{
    return(
        <div>
            <h1>홈</h1>
            <p>홈, 그 페이지는 가장 먼저 보여지는 페이지.</p>
            <Link to="/about">소개</Link>
        </div>
    )
}

export default Home;
```

# 12.2. URL 파라미터와 쿼리스트링

둘다 페이지 주소에서 유동적인 값을 넣을 때 사용한다.

## 12.2.1. URL 파라미터

```jsx
/profile/[특정 id 또는 이름]
```

주소의 경로에 유동적인 값을 넣는 형태이다. ID또는 이름을 사용하여 특정 데이터를 조회할 때 사용한다.

### 예제

```jsx
import { useParams } from "react-router-dom";

const data ={
    velopert :{
        name : '김민준',
        description : '리액트를 좋아하는 개발자',
    },
    gildong : {
        name : '홍길동',
        description : '고전 소설 홍길동전의 주인공',
    },
};

const Profile = ()=>{
    const params = useParams();
    const profile = data[params.username];

    return(
        <div>
            <h1>사용자 프로필</h1>
            {profile?(
                <div>
                    <h2>{profile.name}</h2>
                    <p>{profile.description}</p>
                </div>
            ):(
                <p>존재하지 않는 프로필입니다.</p>
            )}
        </div>
    )
}

export default Profile;
```

- `useParams()`라는 Hook을 사용하여 파라미터를 객체 형태로 조회할 수 있다.

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = ()=>{
    return(
        <div>
            <h1>홈</h1>
            <p>홈, 그 페이지는 가장 먼저 보여지는 페이지.</p>
            <Link to="/about">소개</Link>

            <li>
                <Link to="/about">소개</Link>
            </li>
            <li>
                <Link to="/profiles/velopert">velopert의 프로필</Link>
            </li>
            <li>
                <Link to="/profiles/gildong">gildong의 프로필</Link>
            </li>
            <li>
                <Link  to="/profiles/void">존재하지 않는 프로필</Link>
            </li>
        </div>
    )
}

export default Home;
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Home.js';
import About from './About.js';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">   
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/profiles/:username' element={<Profile />}></Route>
          
        </Routes>
    </div>
  );
}

export default App;
```

- URL 파라미터에서 유동적인 값에는 `:`를 사용하여 설정한다. (한 파라미터에서 중복 사용가능)

## 12.2.2. 쿼리스트링

```jsx
/articles?page=1&keyword=react
```

주소의 뒷부분에 ? 문자열 이후에 key=value로 값을 정의하고 & 로 구분한다. 키워드 검색, 페이지네이션 , 정렬 방식 등 데이터 조회에 필요한 옵션을 전달할 때 사용한다.

### 쿼리스트링을 문자열로 가져오기

```jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const About = ()=>{
		//http://localhost:3000/about?detail=true&mode=1 로 접속했을 때 쿼리스트링을 출력                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    const location = useLocation();
    
    return(
        <div>
            <h1>소개</h1>
            <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
            <p>쿼리스트링 : {location.search}</p>
        </div>
    )
}

export default About;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4044c698-9d1b-4ccf-af04-a51d12d66d83/Untitled.png)

- useLocation()이라는 Hook은 현재 보고 있는 페이지의 정보를 지니고 있다.
  - pathname : 현재 주소의 경로(쿼리스트링 제외)
  - search : 쿼리스트링 값
  - hash : 주로 Histroy API가 지원되지 않는 구형 브라우저에서 사용되는 해시 라우터의 값.
  - state : 페이지로 이동할때 임의로 넣을 수 있는 상태 값
  - key : `location`객체의 고유 값, 페이지가 변경될때마다 갱신된다.

### 쿼리스트링을 객체로 가져오기

```jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const About = ()=>{
    const [ searchParams, setSearchParams ] = useSearchParams();
    const detail = searchParams.get('detail');
    const mode = searchParams.get('mode');

    const onToggleDetail = ()=>{
        setSearchParams({mode, detail : detail === 'true' ? false : true});
    };

    const onIncreaseMode = ()=>{
        const nextMode = mode === null ? 1 : parseInt(mode) + 1;
        setSearchParams({ mode: nextMode, detail });
    }

    return(
        <div>
            <h1>소개</h1>
            <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
            <p>detail : {detail}</p>
            <p>mode : {mode}</p>
            <button onClick={onToggleDetail}>Toggle detail</button>
            <button onClick={onIncreaseMode}>mode + 1</button>
        </div>
    )
}

export default About;
```

- useSearchParams()가 반환한 배열의 첫번째 원소는 쿼리파라미터 객체, 두번째 원소는 특정 쿼리파라미터를 업데이트할 수 있는 함수를 반환한다.
  - 쿼리파라미터 객체는 get함수로 값을 조회할 수 있다.

# 12.3. 중첩된 라우트

```jsx
import { useParams } from "react-router-dom";

const Article = ()=>{
    const { id } = useParams();
    return(
        <div>
            <h2>게시글 {id}</h2>
        </div>
    )
}

export default Article;
import { Link, Outlet } from "react-router-dom";

const Articles = ()=>{
    return(
        <div>
            <Outlet></Outlet>
            <ul>
                <li>
                    <Link to="/articles/1">게시글 1</Link>
                </li>
                <li>
                    <Link to="/articles/2">게시글 2</Link>
                </li>
                <li>
                    <Link to="/articles/3">게시글 3</Link>
                </li>
            </ul>
        </div>
    )
}

export default Articles;
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Home.js';
import About from './About.js';
import Profile from './pages/Profile';
import Articles from './pages/Articles';
import Article from './pages/Article';

function App() {
  return (
    <div className="App">   
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/profiles/:username' element={<Profile />}></Route>
          <Route path='/articles' element={<Articles />}>
            <Route path=':id' element={<Article />}></Route>
          </Route>
          
        </Routes>
    </div>
  );
}

export default App;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/839c53cb-345a-48db-b3c6-ee9fd56cb1f3/Untitled.png)

- Route컴포넌트의 자식으로 Route컴포넌트가 온 것을 중첩된 라우트라고 한다.
- Menu나 Navigation이 있는 페이지에서 메인 컨텐츠의 내용만 변경하고 싶을 때 사용한다.
  - Menu나 Navigation이 있는 컴포넌트를 부모로 메인 컨텐츠가 있는 컴포넌트를 자식으로 배치한다.
  - 자식 컴포넌트를 출력하고 싶은 위치에 <Outlet>을 배치한다.

## 12.3.1. 공통 레이아웃 컴포넌트

페이지끼리 공통적으로 보여줘야 하는 레이아웃이 있을 때도 사용된다.

아래의 예제는 Home, About, Profile페이지에서 상단 헤더를 공통으로 보여준다.

```jsx
import { Outlet } from "react-router-dom";

const Layout = ()=>{
    return(
        <div>
            <header style={{background : 'lightgray', padding : 16, fontSize : 24}}>
                Header
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Home.js';
import About from './About.js';
import Profile from './pages/Profile';
import Articles from './pages/Articles';
import Article from './pages/Article';
import Layout from './Layout';

function App() {
  return (
    <div className="App">   
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/profiles/:username' element={<Profile />}></Route>
          </Route>
          <Route path='/articles' element={<Articles />}>
            <Route path=':id' element={<Article />}></Route>
          </Route>
          
        </Routes>
    </div>
  );
}

export default App;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d261d054-6ffa-4be7-b107-bf6c4361955b/Untitled.png)

## 12.3.2. Route컴포넌트의 index props

index라는 props는 path=”/”와 같은 뜻으로 상위 라우트의 경로와 일치하지만 이후 경로가 주어지지 않았은 라우트를 설정할 때 사용한다.

```jsx
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Home.js';
import About from './About.js';
import Profile from './pages/Profile';
import Articles from './pages/Articles';
import Article from './pages/Article';
import Layout from './Layout';

function App() {
  return (
    <div className="App">   
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} /> 
            <Route path='/about' element={<About />} />
            <Route path='/profiles/:username' element={<Profile />}></Route>
          </Route>
          <Route path='/articles' element={<Articles />}>
            <Route path=':id' element={<Article />}></Route>
          </Route>
          
        </Routes>
    </div>
  );
}

export default App;
```

# 12.4. 리액트 라우터 부가기능

## 12.4.1. useNavigate

Link 컴포넌트를 사용하지 않고 다른 페이지로 이동을 해야하는 상황에 사용되는 Hook이다.

```jsx
import { Outlet, useNavigate } from "react-router-dom";

const Layout = ()=>{
    const navigate = useNavigate();

    const goBack = ()=>{
        //이전 페이지로 이동
        navigate(-1);
    }

    const goArticles = ()=>{
        navigate('/articles');
    }

    return(
        <div>
            <header style={{background : 'lightgray', padding : 16, fontSize : 24}}>
                <button onClick={goBack}>뒤로가기</button>
                <button onClick={goArticles}>게시글 목록</button>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;
```

- `navigate()`의 매개변수로 숫자를 줄 수 있다.

  - 음수 값은 뒤로가기를 몇번 할 것인가를 나타낸다.
  - 양수 값은 앞으로가기를 몇번 할 것인가를 나타낸다.

- `navigate()`의 옵션으로 replace를 줄 수 있는데 이 옵션은 이동할 때 현재 페이지를 페이지 기록에 남기지 않는다.

  ```jsx
  navigate('/articles', { replace : true });
  ```

## 12.4.2. NavLink

링크 경로와 현재 라우트 경로가 일치하는 경우특정 스타일 또는 CSS 클래스 적용하는 컴포넌트이다.

```jsx
<NavLink style={({isActive}) => isActive ? activeStyle : undefined } />

<NavLink className={({isActive}) => isActive ? activeStyle : undefined } />
```

- style 또는 className을 설정할 때 { isActive : boolean }을 파라미터로 전달받는 함수 타입의 값을 전달한다.

### 예제

해당 링크로 넘어가면 activeStyle이 적용된다.

```jsx
import { NavLink, Link, Outlet } from "react-router-dom";

const Articles = ()=>{
    const activeStyle = {
        color : 'green',
        fontSize : 21,
    };

    return(
        <div>
            <Outlet></Outlet>
            <ul>
                <li>
                    <NavLink
                        to="/articles/1"
                        style={({ isActive }) =>(isActive ? activeStyle : undefined) }
                    >게시글 1</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/articles/2"
                        style={({ isActive }) =>(isActive ? activeStyle : undefined) }
                    >게시글 2</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/articles/3"
                        style={({ isActive }) =>(isActive ? activeStyle : undefined) }
                    >게시글 3</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Articles;
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/688fcca0-4f8f-49fc-bf8c-9ff25249e6a6/Untitled.png)

실제로 비슷한 작업을 하게 된다면 현재 NavLink를 다른 컴포넌트로 감싼 다음 사용하는 것을 권장한다.

```jsx
import { NavLink, Outlet } from "react-router-dom";

const Articles = ()=>{
    return(
        <div>
            <Outlet></Outlet>
            <ul>
                <ArticleItem id={1} />
                <ArticleItem id={2} />
                <ArticleItem id={3} />
            </ul>
        </div>
    )
}

const ArticleItem = ({id})=>{
    const activeStyle = {
        color : 'green',
        fontSize : 21,
    };

    return (
        <li>
            <NavLink
                to={`/articles/${id}`}
                style={({ isActive }) =>(isActive ? activeStyle : undefined) }
            >게시글 {id}</NavLink>
        </li>
    )
}

export default Articles;
```

## 12.4.3. NotFound 페이지 만들기

NotFound페이지는 사전에 정의되지 않는 경로에 사용자가 진입했을 대 보여주는 페이지이다.

Route 컴포넌트의 path props가 * (wildcard 문자, 아무 텍스트나 매칭한다는 뜻)로 작성하면 일치하는 라우트가 없다면 해당 화면으로 넘어가도록 한다.

```jsx
const NotFound = ()=>{
    return (
        <div
            style={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                fontSize : 64,
                position : 'absolute',
                width : '100%',
                height : '100%',
            }}
        >
            404
        </div>
    )
}

export default NotFound;
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Home.js';
import About from './About.js';
import Profile from './pages/Profile';
import Articles from './pages/Articles';
import Article from './pages/Article';
import Layout from './Layout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">   
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/profiles/:username' element={<Profile />}></Route>
          </Route>
          <Route path='/articles' element={<Articles />}>
            <Route path=':id' element={<Article />}></Route>
          </Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
    </div>
  );
}

export default App;
```

## 12.4.4. Navigate 컴포넌트

해당 컴포넌트가 출력되는 순간 to  props에 지정된 페이지로 이동한다. 즉 페이지를 리다이렉트 하고 싶을 때 사용한다.

```jsx
const Login = ()=>{
    return <div>로그인 페이지</div>
}

export default Login;
import { Navigate } from "react-router-dom";

const MyPage = ()=>{
		//로그인 여부 판별
    const isLoggedIn = false;

    if(!isLoggedIn){
        return <Navigate to={"/login"} replace={true} />
    }

    return <div>마이 페이지</div>
}

export default MyPage;
```

- replace props가 true이면 이동할 때 현재 페이지를 기록하지 않으므로 뒤로가기를 누르며 2페이지 전으로 이동한다.

------

### reference

React Router v6 관련 내용

[React Router v6 튜토리얼](https://velog.io/@velopert/react-router-v6-tutorial)

[React Router v6 업데이트 정리](https://velog.io/@ksmfou98/React-Router-v6-업데이트-정리)

[React Router v5 → v6 빠르게 훑어보기](https://www.youtube.com/watch?v=CHHXeHVK-8U&ab_channel=MinjunKim)

---


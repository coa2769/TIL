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

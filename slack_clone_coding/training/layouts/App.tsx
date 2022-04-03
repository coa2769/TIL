import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import loadable from '@loadable/component';

const LogIn = loadable(()=> import('@pages/LogIn'));
const SignUp = loadable(()=> import('@pages/SignUp'));

const App = () => {
  return (
    <Routes>
      {/* router v6에서 redirect 적용하는 방법 */}
      <Route path='/' element={<Navigate replace to="/login"/>}></Route>
      <Route path='/login' element={<LogIn/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
    </Routes>
  );
};

export default App;

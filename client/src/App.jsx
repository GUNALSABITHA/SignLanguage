import { useState } from 'react';
import { Routes , Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

function App() {

  return (
    <Routes>
      <Route path='/'>
          <Route index element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
      </Route>
    </Routes>
  )
}

export default App

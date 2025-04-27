import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom' ;
import Landing from './Pages/Landing-page/Landing';
import Login from './Pages/Login-page/Login';
import SignUp from './Pages/Sign-up-page/SignUp';
import Home from './Pages/Home/Home';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/home' element={<Home/>} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
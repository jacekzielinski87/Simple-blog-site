import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { useState } from 'react';
import {signOut} from 'firebase/auth';
import {auth} from './Firebase-config';
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import Login from './pages/Login';


function App() {
   const [isAuth, setIsAuth] = useState(false);

   

   const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname ='/login';
    })
   };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {!isAuth ? ( <Link to="/login">Login</Link> 
        ) : ( 
          <>
          <Link to="/addpost">Create Post</Link>
          <button onClick={signUserOut}>Log out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth}/>}/>
        <Route path='addpost' element={<AddPost isAuth={isAuth}/>}/>
        <Route path='login' element={<Login setIsAuth={setIsAuth}/>}/>
      </Routes>
    </Router>
  )
}

export default App

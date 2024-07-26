import { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import CartView from './pages/CartView';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser(){
    localStorage.clear();
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(typeof data !== undefined)
      if(typeof data !== undefined){
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });
      } else {
        setUser({
          id: null,
          isAdmin: null
        });
      }
    })
  }, [])

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="*" element={<Error />} />
              <Route path="/products" element={<Products />}/>
              <Route path="/products/:productId" element={<ProductView />}/>
              <Route path="/cart" element={<CartView />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/logout" element={<Logout />}/>
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  )
}

export default App

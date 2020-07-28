//npm install materialize-css@next
//npm i react-router-dom
import {Loader} from './components/Loader'
import React from 'react';
import 'materialize-css';
import { UseRoutes } from './routes';
import {BrowserRouter as Router} from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import 'materialize-css'
import { AuthContext } from './context/AuthContext';
import {NavBar} from './components/NavBar'

function App() {
  const {token,login,logout,userId,ready} = useAuth()
  const isAuth = !!token;//boolean
  const routes = UseRoutes(isAuth);

  if(!ready){
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{token,login,logout,userId,isAuth}}>
      <Router>
        {isAuth && <NavBar/>}
        <div className="container">
          {routes}
        </div>
      </Router> 
    </AuthContext.Provider>
  );
}

export default App;

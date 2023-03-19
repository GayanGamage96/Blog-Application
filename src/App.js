import Header from "./components/Header";
import React,{useEffect} from "react";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlog from "./components/UserBlog";
import BlogInfo from "./components/BlogInfo";
import AddBlog from "./components/AddBlog";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from './data';

function App() {
const dispatch = useDispatch()

  const isLoggedIn = useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem('userId')){
             dispatch(authActions.login());
    }
  
  }, [dispatch])
  
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          { !isLoggedIn ? <Route path='/auth' element ={<Auth/>} /> :
          <>
          <Route path='/blogs' element ={<Blogs/>} />
          <Route path='/blogs/add' element ={<AddBlog />} />
          <Route path='/myblogs' element ={<UserBlog/>} />
          <Route path='/myblogs/:id' element ={<BlogInfo />} /></>}
          
        </Routes>

      </main>


    </React.Fragment>
  );
}

export default App;

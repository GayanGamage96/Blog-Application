import Header from "./components/Header";
import React from "react";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlog from "./components/UserBlog";
import BlogInfo from "./components/BlogInfo";
import AddBlog from "./components/AddBlog";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/auth' element ={<Auth/>} />
          <Route path='/blogs' element ={<Blogs/>} />
          <Route path='/blogs/add' element ={<AddBlog />} />
          <Route path='/myblogs' element ={<UserBlog/>} />
          <Route path='/myblogs/id' element ={<BlogInfo />} />
          
        </Routes>

      </main>


    </React.Fragment>
  );
}

export default App;

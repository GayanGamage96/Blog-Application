import React, { useState } from 'react'
import {
    AppBar,
    Typography,
    Toolbar,
    Box,
    Button,
    Tabs,
    Tab,
  } from "@mui/material";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../data';


const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.isLoggedIn)
  const [value, setValue] = useState();
  return (
   <AppBar 
   position='sticky'
   sx={{background:'#00695c'}} >
    <Toolbar>
        <Typography variant='h6'>
            Blog App
        </Typography>
        {isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight={'auto'} >
          <Tabs 
          textColor='inherit'
          value={value} 
          onChange={(e,val)=>setValue(val)} >

            <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
            <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />

          </Tabs>

        </Box>}



        <Box display="flex" marginLeft="auto" >

          {!isLoggedIn &&  <Button 
          LinkComponent={Link} to="/auth"
          variant='string'
          sx={{margin:1, borderRadius:10,color:'white' }} >Login</Button>}
          
          {!isLoggedIn &&  <Button 
          LinkComponent={Link} to="/auth"
           variant='string'
          sx={{margin:1, borderRadius:10, color:'white'}} >SignUp</Button>}
         
         {isLoggedIn && (
         <Button
         onClick={()=>dispatch(authActions.logout())}
          LinkComponent={Link} to="/auth" 
           variant='contained'
          sx={{margin:1, borderRadius:10, color:'white'}} >Log Out</Button>)}
        </Box>
    </Toolbar>
   </AppBar>
  )
}

export default Header
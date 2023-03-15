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

const Header = () => {
  const [value, setValue] = useState();
  return (
   <AppBar 
   position='sticky'
   sx={{background:'#00695c'}} >
    <Toolbar>
        <Typography variant='h4'>
            Blog App
        </Typography>
        <Box display="flex" marginLeft={"auto"} marginRight={'auto'} >
          <Tabs 
          textColor='inherit'
          value={value} 
          onChange={(e,val)=>setValue(val)} >

            <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
            <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />

          </Tabs>

        </Box>



        <Box display="flex" marginLeft="auto" >
          <Button 
          LinkComponent={Link} to="/auth"
          variant='contained'
          sx={{margin:1, borderRadius:10,color:'white' }} >Login</Button>
          <Button 
          LinkComponent={Link} to="/auth"
           variant='contained'
          sx={{margin:1, borderRadius:10, color:'white'}} >SignUp</Button>
          <Button
          LinkComponent={Link} to="/auth" 
           variant='contained'
          sx={{margin:1, borderRadius:10, color:'white'}} >Log Out</Button>
        </Box>
    </Toolbar>
   </AppBar>
  )
}

export default Header
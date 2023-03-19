import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { authActions } from '../data';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false)
  const [inputs, setInputs] = useState({
    name: "", email: "", password: ""
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const sendRequest = async (type = "login") => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password

    }).catch(err => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    if (isSignUp) {
      sendRequest('signup').then((data)=>localStorage.setItem("userId",data.user._id))
      .then(() => dispatch(authActions.login()))
      .then(data => console.log(data)).then(()=>navigate('/blogs'))
    }
    else {
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
      .then(() => dispatch(authActions.login()))
      .then(data => console.log(data))
      .then(()=>navigate('/blogs'))
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display='flex'
          flexDirection='column'
          alignItems={"center"}
          justifyContent={'center'}
          padding={3}
          margin='auto'
          marginTop={5}
          borderRadius={10} >
          <Typography variant='h4' padding={3} textAlign='center'
          >
            {isSignUp ? "SignUp" : "Login"}</Typography>

          {isSignUp &&
            <TextField
              name='name'
              onChange={handleChange}
              value={inputs.name}
              placeholder='User Name'
              margin='normal' />}

          <TextField
            name='email'
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder='E-mail'
            margin='normal' />

          <TextField
            name='password'
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder='Password'
            margin='normal' />

          <Button type='submit' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }} color='success'  >Submit</Button>

          <Button onClick={() => setIsSignUp(!isSignUp)} variant='string' sx={{ borderRadius: 3, marginTop: 3 }}>Change {isSignUp ? "Login" : "Signup"} </Button>

        </Box>

      </form>
    </div>
  )
}

export default Auth;

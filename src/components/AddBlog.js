import {
  Typography,
  InputLabel,
  Box,
  TextField,
  Button
} from "@mui/material";
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const AddBlog = () => {
  
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title: "", description: "", image: ""
  });

  const handleChange = (e) =>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const sendRequest = async () =>{
    const res = await axios.post('http://localhost:5000/api/blog/add',{
      title:inputs.title,
      description:inputs.description,
      image:inputs.image,
      user:localStorage.getItem("userId")
    }).catch(err=>console.log(err))
    const data = await res.data;
    return data;
  }



  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(inputs)
    sendRequest().then((data)=>console.log(data)).then(()=>navigate('/blogs'))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}  >
        <Box
          border={3}
          borderColor='green'
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"70%"}
        >
          <Typography 
          
          fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}>Post Your Blog</Typography>

          <InputLabel  sx={{marginBottom:1,marginTop:2, fontSize:'25px',fontWeight:'bold'}} >Title</InputLabel>

          <TextField onChange={handleChange} name="title" value={inputs.title} margin="normal" variant="outlined" />

          <InputLabel  sx={{marginBottom:1,marginTop:2, fontSize:'25px',fontWeight:'bold'}}>Description</InputLabel>

          <TextField onChange={handleChange} name="description" value={inputs.description} margin="normal" variant="outlined" />

          <InputLabel  sx={{marginBottom:1,marginTop:2, fontSize:'25px',fontWeight:'bold'}}>ImageURL</InputLabel>

          <TextField onChange={handleChange} name="image" value={inputs.image}  margin="normal" variant="outlined"/>

          <Button sx={{marginTop:2,borderRadius:3}} variant='contained' color="success" type="submit"  >Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog

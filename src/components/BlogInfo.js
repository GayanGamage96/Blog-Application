import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const BlogInfo = () => {
  const navigate =useNavigate()
  const [inputs, setInputs] = useState({});

  const handleChange = (e) =>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const [blog, setBlog] = useState();
const id = useParams().id;
console.log(id);
const fetchDetails = async () =>{
   const res = await axios
   .get(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err))
   const data = await res.data;
   return data;
}
  useEffect(() => {
    fetchDetails().then((data)=>{
      setBlog(data.blog)
      setInputs({title:data.blog.title, description:data.blog.description
      })
    })
      
  },[id])
  console.log(blog);
  const sendRequest = async () =>{
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    }).catch(err=>console.log(err));

    const data = await res.data;
    return data;
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(inputs)
    sendRequest().then(data=>console.log(data)).then(()=>navigate('/myblogs/'))
  }
  
  return (
    <div> 
      {inputs && 
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
      <Typography fontWeight={"bold"}
        padding={3}
        color="grey"
        variant="h2"
        textAlign={"center"}>Post Your Blog</Typography>

      <InputLabel sx={{marginBottom:1,marginTop:2, fontSize:'25px',fontWeight:'bold'}} >Title</InputLabel>

      <TextField onChange={handleChange} name="title" value={inputs.title} margin="normal" variant="outlined" />

      <InputLabel sx={{marginBottom:1,marginTop:2, fontSize:'25px',fontWeight:'bold'}}>Description</InputLabel>

      <TextField onChange={handleChange} name="description" value={inputs.description} margin="normal" variant="outlined" />

      

      <Button sx={{marginTop:2,borderRadius:3}} variant='contained' color="success" type="submit"  >Submit</Button>
    </Box>
  </form>}</div>
  )
}

export default BlogInfo
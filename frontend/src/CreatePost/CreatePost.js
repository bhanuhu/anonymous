import { Box, Stack, Button, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Inside = () => {
    const navigate = useNavigate();
    

  const [data, setData] = useState([]);
    const [values,setvalues]=useState({
        title:'',
        desc:''
    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("values: ", values);
        if (values.title !== "" && values.desc !== "") {
          const {title, desc} = values;


  
    const res = await fetch('https://anonymous-backend-yuuk.onrender.com/api/createPost', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          description: values.desc,
          
        }),
      });
    const data = await res.json();

    if (data.status == 400 || !data) {
      console.log("unable to get data from the database");
    } else {
      console.log("result: ",res.status);
      
    //   setData(data.result);
    }
    setvalues({title:'',desc:''})
  };}
  
  const allposthandler=()=>{
    navigate('/inside')
  }
  const commenthandler=()=>{
    navigate('/commented')
  }
  const replyhandler=()=>{
    navigate('/replied')
  }
  const createhandler=()=>{
    navigate('/createpost')
  }
  const handleChange = (e) => {
    setvalues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <Box>
      <Stack direction="row" sx={{ ml: "25%", mt: "5%" }}>
        <Stack>
          <Button
          onClick={allposthandler}

            variant="filled"
            sx={{ color: "#8C8C8C", backgroundColor: "#0D0D0D", mb: "5%" }}
          >
            {" "}
            All Post
          </Button>
          <Button
          onClick={commenthandler}

            variant="filled"
            sx={{ color: "#8C8C8C", backgroundColor: "#0D0D0D", mb: "5%" }}
          >
            {" "}
            Commented Post
          </Button>
          <Button
          onClick={replyhandler}

            variant="filled"
            sx={{ color: "#8C8C8C", backgroundColor: "#0D0D0D", mb: "25%" }}
          >
            Replied Post
          </Button>
          <Button
          onClick={createhandler}

            variant="filled"
            sx={{
              color: "#8C8C8C",
              backgroundColor: "#0D0D0D",
              mb: "5%",
              borderWidth: 1,
              borderColor: "#8C8C8C",
            }}
          >
            {" "}
            Create Post
          </Button>
        </Stack>
        <Box
          sx={{
            ml: "15%",
            mr: "-15%",
            backgroundColor: "#0D0D0D",
            width: 450,
            pl: "2%",
            pr: "5%",
            pt: "2%",
            borderRadius:5
          }}
        >
          <Typography sx={{ color: "white ", mb: "2%" }}>Create Post </Typography>

          <Box
        sx={{
          color: "#8C8C8C",
          backgroundColor: "#191919",
          pl: "10%",
          pr: "10%",
          width: 400,
          borderRadius: 5
          ,mb:'4%'

        }}
      >
      <Stack>
      <TextField name='title' style={{borderColor:'white',border:'1px solid white',borderRadius:50}} sx={{mt:'5%',mb:'3%',input: { color: "white", borderColor: "white" }, label: { color: "white" }}} value={values.title} InputProps={{ style: { borderRadius: 50, bordercolor: "white",color:'white' } }} onChange={handleChange} label='Post Title..'></TextField>
      <TextField name='desc'style={{borderColor:'white',border:'1px solid white',borderRadius:50}} sx={{input: { color: "white", borderColor: "white" }, label: { color: "white" }}} value={values.desc} InputProps={{ style: { borderRadius: 50,color: "white" } ,border:{color:'white'}}} onChange={handleChange} label='Describe Your Post..'></TextField>
      <Button variant="contained" onClick={handleSubmit}  sx={{backgroundColor:'#404040',color:'white' , borderRadius:5,mt:'4%',mb:'4%'}}>
      <Box >Submit</Box>
      </Button>
      </Stack>
       
      </Box>

        </Box>
      </Stack>
    </Box>
  )}
export default Inside;
import { Box, Stack, Button, Typography ,TextField} from "@mui/material";
import { useEffect, useState } from "react";
import Card from './Card1';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
  

const Inside = () => {
  const navigate = useNavigate();
  const [flag, setflag] = useState(false);

  const { id } = useParams();
  const [data, setData] = useState(null);
  const[load,setload]=useState(false)

  const fetchData = async () => {
    console.log(id);
    const res = await fetch(`/api/getSinglePosts?id=${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();

    if (data.status == 400 || !data) {
      console.log("unable to get data from the database");
    } else {
      console.log("result: ", data.result);
      setData(data.result);
      setflag(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, [load]);
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
  const [comment,setcomment]=useState('')
  const handleChange=(e)=>{
    setcomment(e.target.value)
  }
  const handlesubmit=async (e)=>{
    e.preventDefault();
    console.log(comment);
        const res = await fetch('/api/addComment', {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id:id,
            name:localStorage.getItem('name'),
            comment:comment,
         }),
        });
        const data = await res.json();
    
        if (data.status == 400 || !data) {
          console.log("unable to get data from the database");
        } else {
          console.log("resu: ");
          setcomment('')
          setload(!load)
        }


  }
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
            overflowY:'scroll',maxHeight:'50%',
            position:'absolute'
          }}
        >
          
          {data  ? (
            <Box sx={{backgroundColor:'#191919' , borderRadius:5,m:'3%',p:'3%'}}>
            <Box>
            <Typography sx={{ color: "white ", mb: "2%" }}>All Post </Typography>
          <Typography variant="h5" sx={{ color: "#8C8C8C" }}>
            {data.title}
        </Typography>
        <Typography variant="h6" align="center"
        style={{ wordWrap: "break-word" }} sx={{ color: "#8C8C8C" ,maxWidth:'100%',mb:'2%'}}>
            {data.description}
        </Typography>
        <Typography variant="body" sx={{ color: "#8C8C8C" ,mt:'7%',fontStyle: 'italic'}}>
        {data.comment.length} Comments {data.reply.length} Reply
        </Typography>
        <Typography sx={{ color: "#8C8C8C" }}>Comments</Typography>
        <Stack direction='row'>
        <TextField name='title' style={{borderColor:'white',border:'1px solid white',borderRadius:50}} sx={{mt:'5%',mb:'3%',input: { color: "white", borderColor: "white" }, label: { color: "white" }}} value={comment} InputProps={{ style: { borderRadius: 50, bordercolor: "white",color:'white' } }} onChange={handleChange} label='Write Comment here..'></TextField>

        <Button onClick={handlesubmit}>Add Comment</Button></Stack>
            </Box>
        {data.comment.map((el, ind)=>{
            return <Card postid={id} commentid={el._id} name={el.name} comment={el.comment}/>
    
            })}
            </Box>
          ) : (
            <>123</>
          )}
            
        </Box>
      </Stack>
    </Box>
  );
};
export default Inside;
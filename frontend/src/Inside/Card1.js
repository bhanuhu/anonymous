import { Box,Typography ,Button,Stack,TextField} from "@mui/material";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
const Card=(props)=>{
    const[load,setload]=useState(false)
    const[addreply,setaddreply]=useState('')
  const navigate=useNavigate();
  const handleclick=()=>{
      console.log(props.id)
  }
  const[reoly,setreply]=([]);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const fetchData = async () => {
    console.log(id);
    const res = await fetch('/getReply', {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        commentID:props.commentid,
        postID:props.postid,
     }),
    });
    const data = await res.json();

    if (data.status == 400 || !data) {
      console.log("unable to get data from the database");
    } else {
      console.log("result 2: ",props.commentid, data.result);
      setData(data.result);
      ;
    }
  };
  
  const handleChange=(e)=>{
    setaddreply(e.target.value)
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    console.log(addreply);
        const res = await fetch('/addReply', {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            postid:props.postid,
            commentid:props.commentid,
            name:localStorage.getItem('name'),
            comment:addreply,
         }),
        });
        const data = await res.json();
    
        if (data.status == 400 || !data) {
          console.log("unable to get data from the database");
        } else {
          console.log("resu: ");
          setaddreply('')
          setload(!load)
        }
      
    
  }
  useEffect(() => {
    fetchData();
  }, [load]);
    return(
      
      <Box
        sx={{
          color: "#8C8C8C",
          backgroundColor: "#191919",
          pl: "10%",
          pr: "10%",
          width: '80%',
          borderRadius: 5,
          ml:'1%',
          mb:'1%',
          
        }}
      >
        
        <Stack direction='row' sx={{}}>
        <Box>
        <Typography align="left" sx={{ color: "#8C8C8C" ,minWidth:'250%',mr:'1%',ml:'-38%',pl:'-2%'}}>{props.name}:</Typography>
        </Box>
       
        <Typography align="left"style={{ wordWrap: "break-word" }} sx={{ color: "#8C8C8C" ,maxWidth:'80%',ml:'7%',mr:'5%'}}>{props.comment}</Typography>
        
        </Stack>
        <Stack direction='row'>
        <TextField name='title' style={{borderColor:'white',border:'1px solid white',borderRadius:50}} sx={{mt:'5%',mb:'3%',input: { color: "white", borderColor: "white" }, label: { color: "white" }}} value={addreply} InputProps={{ style: { borderRadius: 50, bordercolor: "white",color:'white' } }} onChange={handleChange} label='Write comment here..'></TextField>

        <Button onClick={handleSubmit}>Reply</Button>
        </Stack>
        {data?(
        data.map((el , ind)=>{
            return  (<Stack direction='row' sx={{ml:'5%'}}>
        <Box>
        <Typography align="left" sx={{ color: "#8C8C8C" ,minWidth:'250%',mr:'1%',ml:'-38%',pl:'-2%'}}>{el.name}:</Typography>
        </Box>
       
        <Typography align="left"style={{ wordWrap: "break-word" }} sx={{ color: "#8C8C8C" ,maxWidth:'80%',ml:'7%',mr:'5%'}}>{el.comment}</Typography>

        </Stack>);
    
            })
            ):(<></>)
        }



        </Box>)
}
export default Card;
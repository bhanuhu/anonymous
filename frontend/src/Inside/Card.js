import { Box,Typography ,Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Card=(props)=>{
  const navigate=useNavigate();
  const handleclick=()=>{
      console.log(props.id)
      navigate(`../${props.id}`);
  }


    return(<Button onClick={handleclick}>
      
      <Box
        sx={{
          color: "#8C8C8C",
          backgroundColor: "#191919",
          pl: "10%",
          pr: "10%",
          width: 400,
          borderRadius: 5,
        }}
      >
        <Typography sx={{ color: "#8C8C8C" }}>
          {props.title}
        </Typography>
        <Typography sx={{ color: "#8C8C8C" }}>
        {props.comment} Comment {props.reply} Reply
        </Typography>
      </Box></Button>)
}
export default Card;
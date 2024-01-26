import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { TextField,Stack ,createStyles} from '@mui/material';
import First from './First';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.2)' }}
  >
    •
  </Box>
);

export default function OutlinedCard() {
  const navigate = useNavigate();
  const eventhandler=()=>{
    navigate('/inside')

  }
    
  return (
    <Box sx={{ maxWidth: 215 ,textAlign:'center',mt:'3%'}}>
      <Card variant="outlined" sx={{ alignItems:'center',borderColor:'#191919',ml:'300%',mr:'-400%'}}>
      <CardContent sx={{backgroundColor:'#191919'}}>
      <VerifiedOutlinedIcon sx={{color:'white',fontSize:'3rem',mt:'7%'}}/>
      <Typography sx={{color:'white',mt:'5%'}} variant='h4'>
      Account Created
      </Typography>
      <Typography sx={{color:'white',mb:'15%',mt:'5%'}} variant='h4'>
      Successfully
      </Typography>
      <Button variant="contained" onClick={eventhandler} sx={{backgroundColor:'#404040' , borderRadius:5,mt:'4%',mb:'15%'}}>
            <Box >Create Your First Post</Box>
            <img  alt="" src="/login-label.svg" />
            <ArrowForwardIcon/>
            </Button>


    </CardContent>
      </Card>
    </Box>
  );
}

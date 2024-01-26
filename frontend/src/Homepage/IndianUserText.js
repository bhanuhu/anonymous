import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Box, Stack,Button, Typography,Link } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';


const IndianUserText = () => {
  const navigate = useNavigate();

  const onclickhandler=()=>{
    navigate('../create')

  }
  const onclickhandler1=()=>{
    navigate('../sign')
    
  }


  return (
      <Box sx={{backgroundColor:'black'}}>
        <Box  sx={{textAlign:'center'}}> 
        
        <Button variant="outlined" sx={{borderRadius:5 , borderColor:'#292929' ,mt:'5%'}}>
            <Stack direction='row'>
                <RocketLaunchIcon sx={{color:'white', borderColor:'white',borderWidth:1 ,borderRadius:2}}/>
                <Typography sx={{color:'white'}}>For Indian Users Only</Typography>
            </Stack>
        </Button>
          
          <Typography variant='h2' sx={{color:'white' , textAlign:'center',mt:'3%'}}>
            Start posting anonymously 
          </Typography>
          <Typography variant='h2' sx={{color:'white' , textAlign:'center'}}>
            where no one will judge.
          </Typography>
          <Typography variant='h6' sx={{color:'white' , textAlign:'center',mt:'2%'}}>
            Welcome to Stranger discussion forum
          </Typography>
          
        </Box>
        <Box sx={{textAlign:'center'}}>
          
        <Button onClick={onclickhandler} variant="contained" sx={{backgroundColor:'#404040' , borderRadius:5,mt:'4%'}}>
            <Box >Create Your Account</Box>
            <img  alt="" src="/login-label.svg" />
            <ArrowForwardIcon/>
            </Button>
        <Box sx={{mt:'1%', mb:'1%'}}>
        <Link href="#" underline="none" onClick={onclickhandler1} sx={{color:'white'}}>
            {'Already have account?'}
        </Link>
        
        <Link href="#" underline="always" onClick={onclickhandler1} sx={{color:'white'}}>
            {'Login'}
        </Link>
          
        </Box>
        </Box>
      </Box>
  );
};

export default IndianUserText;
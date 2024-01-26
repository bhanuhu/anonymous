import { Box, Stack, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Card from './Card';
import { useNavigate } from 'react-router-dom';


const Inside = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch('https://anonymous-backend-yuuk.onrender.com/api/getposts', {
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
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
          }}
        >
          <Typography sx={{ color: "white ", mb: "2%" }}>All Post </Typography>

          {data.length > 0 ? (
            data.map((el, ind) => {
              return (
                <Card
                  title={el.title}
                  comment={el.comment.length}
                  reply={el.reply.length}
                  id={el._id}
                />
              );
            })
          ) : (
            <></>
          )}

        </Box>
      </Stack>
    </Box>
  );
};
export default Inside;
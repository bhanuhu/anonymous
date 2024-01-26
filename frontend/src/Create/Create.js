import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { TextField, Stack, createStyles } from "@mui/material";
import First from "./First";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.2)" }}
  >
    •
  </Box>
);

export default function OutlinedCard() {
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("values: ", values);
    if (values.name !== "" && values.email !== "") {
      const { name, email } = values;

      const res = await fetch("https://anonymous-backend-yuuk.onrender.com/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin" : "*", 
          "Access-Control-Allow-Credentials" : true 
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });
      console.log(res);
      console.log(res.data);
      const data = await res.json();
      console.log("status: ", res.status);

      if (res.status === 201) {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        //navigate to OTP FOR SIGN IN and Email sent to entered Email id
        
        navigate('../first');
      } else if (res.status === 403) {
        console.log(data);
        alert(data);
      } else {
        console.log(data);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 215, textAlign: "center", mt: "3%" }}>
      <Card
        variant="outlined"
        sx={{
          alignItems: "center",
          borderColor: "#191919",
          ml: "300%",
          mr: "-400%",
        }}
      >
        <CardContent sx={{ backgroundColor: "#191919" }}>
          <RocketLaunchIcon
            sx={{ color: "white", fontSize: "3rem", mt: "7%" }}
          />
          <Typography sx={{ color: "white", mb: "15%", mt: "5%" }} variant="h4">
            Create Your Accont
          </Typography>

          <Stack>
            <TextField
              label="Enter Your Name"
              InputProps={{ style: { borderRadius: 50, bordercolor: "white" } }}
              name="name"
              required
              onChange={handleChange}
              style={{borderColor:'white',border:'1px solid white',borderRadius:50}}
              sx={{
                input: { color: "white", borderColor: "white" },
                label: { color: "white" },
                border: { color: "white" },
                mb: "5%",
              }}
            />
            <TextField
              label="Enter Email ID"
              InputProps={{ style: { borderRadius: 50, bordercolor: "white" } }}
              name="email"
              required
              onChange={handleChange}
              style={{borderColor:'white',border:'1px solid white',borderRadius:50}}
              sx={{
                input: { color: "white", borderColor: "white" },
                label: { color: "white" },
                border: { color: "white" },
                mb: "10%",
              }}
            />

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: "#404040", borderRadius: 5, mt: "4%" }}
            >
              <Box>Continue</Box>
              <img alt="" src="/login-label.svg" />
              <ArrowForwardIcon />
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
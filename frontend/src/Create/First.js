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
  const [otp, setOtp] = useState(0);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("values: ", otp);
    if (otp !== "") {
      const res = await fetch('/otpVerificationForSignup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
          otp: otp,
        }),
      });

      const data = await res.json();
      console.log("status: ", res.status);

      if (res.status === 201) {
        alert("user verified");
        
        navigate('./created');
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
            <Typography sx={{ color: "white", mt: "-2%" }}>
              Please verify your email ID to continue.{" "}
            </Typography>
            <Typography sx={{ color: "white", mb: "2%" }}>
              We have sent an OTP to {localStorage.getItem("email")}
            </Typography>
            <TextField
              label="Enter OTP"
              name="otp"
              onChange={handleChange}
              required
              InputProps={{ style: { borderRadius: 50, bordercolor: "white" } }}
              sx={{
                input: { color: "white", borderColor: "white" },
                label: { color: "white" },
                border: { color: "white" },
                mb: "5%",
                mt: "3% ",
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
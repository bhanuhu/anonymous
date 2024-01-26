require("dotenv").config();
const express = require("express");
require("./db/conn");
const router = require("./routes/router");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
// app.use((req, res, next) => {
//   const contentLength = req.headers["content-length"];
//   console.log(`Request size: ${contentLength} bytes`);
//   next();

// });

// app.get("/", (req, res) => {
//   res.status(200).json("server start");
// });

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is successfully working at port ${PORT}`);
});

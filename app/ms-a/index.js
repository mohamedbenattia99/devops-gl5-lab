const express = require("express");
const axios = require("axios");

const userRouter = require('./routes');

const app = express();
const port = 3001;
/*
const msbHost = process.env.MSB_HOST || "localhost";
const msbPort = parseInt(process.env.MSB_PORT) || 3000;
*/
app.use(require('./routes'))


/*
app.get("/ms-b", (req, res) => {
    console.log(`http://${msbHost}:${msbPort}`)
  axios.get(`http://${msbHost}:${msbPort}`).then((response) => {
    res.send(response.data);
  });
});
*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
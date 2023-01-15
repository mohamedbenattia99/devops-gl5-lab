const express = require("express");
const app = express();
const port = 3002;

const getProfile = require('./controller')


app.get('/profile', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  await getProfile()
  .then(posts => res.json(posts))
  .catch(err => {
      if (err.status) {
          res.status(err.status).json({ message: err.message })
      } else {
          res.status(500).json({ message: err.message })
      }
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
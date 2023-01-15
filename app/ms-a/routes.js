const express = require('express');
const router = express.Router()
const getProjects = require('./model')


/* All posts */
router.get('/projects', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    await getProjects()
    .then(posts => res.json(posts))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})


module.exports = router;
const express = require('express');
const dbUtils = require('../dbUtils');
var router = express.Router();
router.post('/', function(req, res) {
    console.log(req.body);
    dbUtils.upload(req.body);
    res.send('respond with a resource'); // TODO
});

module.exports = router;
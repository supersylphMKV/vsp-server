const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('main', { title: 'Unity Virtual Space' });
});

module.exports = function(){
    return router;
};
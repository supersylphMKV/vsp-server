const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    var loaderData = req.query;
    var userName = loaderData.userName || '';
    res.render('main', { title: 'Unity Virtual Space', userName : userName});
});

module.exports = function(){
    return router;
};
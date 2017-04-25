var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


//router.get('/', function(req, res) {
router.post('/', function(req, res) {	
	var htmlData = req.body.html;

	var fileName = 'public/generated/webskin_export.html';
	var stream = fs.createWriteStream(fileName);

		//replace strings in HTMLDATA
	htmlData = htmlData.replace('#USI-DOCTYPE', '<!doctype html>');
	htmlData = htmlData.replace('#USI-HTML', '<html>');
	htmlData = htmlData.replace('#.USI-HTML', '</html>');
	htmlData = htmlData.replace('#USI-HEAD', '<head>');
	htmlData = htmlData.replace('#.USI-HEAD', '</head>');
	htmlData = htmlData.replace('#USI-BODY', '<body>');
	htmlData = htmlData.replace('#.USI-BODY', '</body>');

	stream.once('open', function(fd) {
	  stream.end(htmlData);
	});

  	res.sendStatus(200);	
});

module.exports = router;
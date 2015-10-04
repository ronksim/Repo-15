// var Controller = require('./../server/controllers/controller.js');
var kids = require('./../server/controllers/kids.js')
var express = require('express');
var router = express.Router();


module.exports = function(app){
    app.post('/add_kid',function(req,res){
    	kids.add_kid(req,res)
    });

    app.get('/get_organisations',function(req,res){
    	res.json({name: 'Meera'});
    	// kids.get_organisations(req,res)
    });
}



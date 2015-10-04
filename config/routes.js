// var Controller = require('./../server/controllers/controller.js');
var kids = require('./../server/controllers/kids.js');
var sponsors = require('./../server/controllers/sponsors.js');
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

    app.post('/add_sponsor',function(req,res){
                console.log(req.body);
    	sponsors.add_sponsor(req,res)
    });

    app.post('/login',function(req,res){
     	sponsors.login(req,res)
    });

    app.get('/get_kids',function(req,res){
        kids.get_kids(req,res)
    });

}



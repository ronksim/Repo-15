
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SponsorSchema = new mongoose.Schema({
  name : String,
  email : String,
  password : String,
  status : {type: Boolean, default: false },
  created: {type: Date, default: Date.now }
 
});

mongoose.model('Sponsor', SponsorSchema);



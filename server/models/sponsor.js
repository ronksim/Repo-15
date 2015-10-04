
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SponsorSchema = new mongoose.Schema({
  first_name: String,
  last_name : String,
  email : String,
  password : String,
  contact_number : Number,
  address : String,
  city : String,
  state : String,
  country : String,
  zipcode : Number,
  created: {type: Date, default: Date.now }
 
});

mongoose.model('Sponsor', SponsorSchema);



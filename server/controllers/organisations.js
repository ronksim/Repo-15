var mongoose = require('mongoose');
var organisation = mongoose.model('Organisation');

module.exports = (function(){
	return {
		add_organisation: function(req, res){
			var newOrg = new organisation(req.body);
			newOrg.save(function(err, result){
				if(err){
					console.log('error adding');
				} else {
					console.log('successfully added an organisation');
					res.redirect('');
				}
			});
		},

		login: function(req,res){
			organisation.find({},function(err,results){
				if(err){
					console.log('error');
				}else{
					for(var i=0;i<results.length;i++){
						if(results[i].email == req.body.email){
							console.log('found user');
							res.json(results[i]);
						}else{
							console.log('user not found');
						}
					}
				}
			})
		}
	};
})();



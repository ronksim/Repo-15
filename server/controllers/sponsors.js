var mongoose = require('mongoose');
var sponsor = mongoose.model('Sponsor');

module.exports = (function(){
	return {
		add_sponsor: function(req, res){
			console.log(req.body);
			var newsponsor = new sponsor(req.body);
			newsponsor.save(function(err, result){
				if(err){
					console.log('error adding');
				} else {
					console.log('successfully added an sponsor');
					res.json({message: 'success'});
				}
			});
		},

		login: function(req,res){
			sponsor.find({},function(err,results){
				if(err){
					console.log('error');
				}else{
					var exists = false;
					for(var i=0;i<results.length;i++){
						if(results[i].email == req.body.email){
							exists = true;
							var index = i;
						} 
					}
					if (exists) {
						console.log("found user");
						res.json(results[index])
					} else {
						console.log("user not found");
						res.json({error: true})
					}

				}
			})
		}
	};
})();



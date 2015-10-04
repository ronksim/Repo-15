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
		}
	};
})();



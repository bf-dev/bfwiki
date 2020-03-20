const User = require("./schema/user")
exports.getName = function(req){
	console.log(((req.session.user == undefined) ? false : req.session.user.Username))
	return ((req.session.user == undefined) ? false : req.session.user.Username)
} 
exports.getUser = async function(username){
	const result = await User.findOne({Username: username})
	console.log(result)
	return ((result == null) ? false : result)
}
const moment = require("moment")
const chalk = require("chalk")

function time() {
	return moment().format("YYYY-MM-DD HH:mm:ss")                            
}

exports.info = function(data){
	console.info(`[INFO] ${time()} : ${data}`)
}
exports.error = function(data){
	console.error(chalk.red(`[ERROR] ${time()} : ${data}`))
}

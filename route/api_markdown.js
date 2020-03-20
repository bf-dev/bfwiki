
const markdown = require("../util/markdown")
module.exports = function (app){
	app.get("/api/markdown", async (req, res) => {
		res.json({done:true,result:markdown(req.query.data)})
	})
}
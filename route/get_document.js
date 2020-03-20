const Document = require("../util/schema/document")
const getUser = require("../util/getUser")
const config = require("../config")
module.exports = function(app) {
	app.get("/w/:document", async (req, res) => {
		const GetDocument = await Document.findOne({Title: req.params.document})
        
		if(GetDocument == null){var DocumentData = `없는 문서입니다. [[${config.address}/edit/${req.params.document}|생성]]하실래요?"`}
		else{var DocumentData = GetDocument.Data}
		//DocumentData = "[math(y=ax+b)]"
		const data = {data:DocumentData,title:`${req.params.document}`,username:getUser.getName(req),protect:true,menu:[[`edit/${req.params.document}`,"편집"]]}
		res.render("index.html",data)
	})
}
const express = require("express")
const app = express()
const log = require("./util/logger")
const config = require("./config")
const nunjucks  = require("nunjucks")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const fs = require("fs")
const Document = require("./util/schema/document")
const History = require("./util/schema/history")
const User = require("./util/schema/user")
const getDocument = require("./util/getDocument")
const session = require("express-session")
mongoose.connect(config.db, {useNewUrlParser: true})
nunjucks.configure("view", {autoescape: true,express:app})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static("./static"))

app.use(session({
	key: "sid",
	secret: "bfdevsecret",
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
	}
}))

//require('./route/get_document')(app);

fs.readdir("./route/", (err, files) => {
	files.forEach(file => {
		try{
			console.log(file)
			require(`./route/${file}`)(app)
		}catch(err){
			log.error(err)
		}
	})
})


app.get("/sessionCheck", async (req, res) => {
	res.json(req.session.user)
})
app.get("/", (req, res) => {
	res.redirect(`/w/${config.frontpage}`)
})
app.get("/test/:document", async (req, res) => {
	const a = await getDocument.editDocument("블플위키:대문","테스트 내용입니다.","알 수 없음","")
	res.json(a)
})
app.get("/remove/:document", async (req, res)=>{
	await Document.deleteOne({Title: req.params.document})
	res.send("OK")
})
app.get("/historyremove/:document", async (req, res)=>{
	await History.deleteOne({Title: req.params.document})
	res.send("OK")
})
app.get("/get", async (req, res)=>{
	res.json(await Document.find({Title: "블플위키:대문"}))
})
app.get("/getUser", async (req, res)=>{
	res.json(await require("./util/schema/user").find())
})
app.listen(config.port,"0.0.0.0",() => log.info(`서버가 켜졌습니다 (${config.port})`))
exports.app = app
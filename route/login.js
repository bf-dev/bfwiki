const User = require("../util/schema/user")
const getUser = require("../util/getUser")
module.exports = function(app){ 
	app.get("/login", async (req, res) => {
		const Content = `
    <form action="/login" method="post">
        ${(req.query.err == undefined) ? "" : `<span style="color:red;position:relative;bottom:12px;">${req.query.err}</span><br>`}
        사용자 이름
        <input type="text" name="username">
        비밀번호
        <input type="password" name="password"><br>
        <div>
        <input id="save" style="width:70px;" class="login_button" type="submit" value="로그인">
        <input id="save" style="width:70px;" class="login_button" type="button" onclick="redirect('/register')" value="가입">
        </div>
    </form>
`
    
		const data = {data:Content,title:"로그인",username:getUser.getName(req)}
		res.render("index.html",data)
	})
	app.post("/login", async (req, res) => {
		const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress
		const result = await User.findOne({Username: req.body.username, Password: req.body.password})
		if(result == null){return res.redirect("/login?err=아이디나 비밀번호를 틀렸습니다.")}
		if(!((await getUser.getUser(req.body.username)).IPList.includes(ip))){console.log(ip)}
		req.session.user = {
			Username: req.body.username,
		}
		res.redirect("/")
	})
}
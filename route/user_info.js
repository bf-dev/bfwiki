const getUser = require("../util/getUser")
const moment = require("moment")
module.exports =  function (app){
	app.get("/user", async (req, res) => {
		const user_name = getUser.getName(req)
		if(!user_name){return res.redirect("/login?err=로그인이 필요한 작업입니다.")}
		const user = await getUser.getUser(user_name)
		const content = 
        `
		<ul class="user_info_ul menu_ul">
		<li>가입일자 : ${moment(user.CreatedDate).format("YYYY-MM-DD HH:mm:ss")}</li>
		<li>메일주소 : ${user.Email}</li>
		<li>권한 목록 : ${user.ACL.join(", ")}</li>
        </ul>
        `
		const data = {data:content,title:user_name,username:getUser.getName(req),menu:[['logout', "로그아웃"],['change_password', "비밀번호 변경"]] }
		res.render("index.html",data)
	})
}
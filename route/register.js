const User = require('../util/schema/user')
const getUser = require("../util/getUser")
//const Mail = 
var List = []
async function registerAccount(email, username, password){
    const user = new User();
    user.CreatedDate = new Date()
    user.Username = username
    user.Password = password
    user.ACL = ["any"]
    user.Email = email
    user.Skin = "bfdev"
    user.IPUser = false
    user.IPList = []
    user.Ban = false
    return await user.save()
}
function checkEmailinList(mail){
    for (item of List){
        if(item[0] == mail){return item[1]}
    }
    return false
}
module.exports = function (app){

    app.get('/register', async (req, res) => {
        const Content = `
        <form action="/register" method="post">
                    ${(req.query.err == undefined) ? "" : `<span style="color:red;position:relative;bottom:12px;">${req.query.err}</span><br>`}
                    메일 주소
                    <input id="email" type="text" name="email"><input class="emailsendbtn" id="save" style="width:70px;margin:3px 11px;" class="login_button" type="button" onclick="send_email()
                    " value="인증"><br>
                    인증 코드(5분동안 유효)
                    <input id="code" type="text" name="code">
                    사용자 이름
                    <input type="text" name="username">
                    비밀번호
                    <input type="password" name="password"><br>
                    비밀번호 확인
                    <input type="password" name="password_check"><br>
                    <div>
                    <input id="save" style="width:70px;" class="login_button" type="submit" value="가입">
                    </div>
        </form>
    `
        const data = {data:Content,title:`가입`,username:getUser.getName(req)}
        res.render("index.html",data)
    })

    app.post('/email', async (req, res) => {
        List.push([req.body.email,require('../util/mail').sendCode(req.body.email)])
        setTimeout(()=>{
            List.forEach((value,index)=>{
                try{
                    if(req.body.email == value[0]){List[index] = null}
                }catch(e){
                    pass
                }
            })
        },5*60*1000)
        res.send("OK")
    })
    setInterval(()=>{List = List.filter(function(e) { return e !== 'seven' })},1000)
    app.post('/register', async (req, res) => {
        const check = checkEmailinList(req.body.email)
        const result = await User.findOne({Username: req.body.username})
        if(!check){return res.redirect("/register?err=이메일을 인증하세요.")}
        if(check != req.body.code){return res.redirect("/register?err=인증번호가 틀렸습니다.")}
        if(req.body.username == ""){return res.redirect("/register?err=사용자 이름을 입력하세요")}
        if(req.body.password == ""){return res.redirect("/register?err=비밀번호를 입력하세요")}
        if(req.body.password_check == ""){return res.redirect("/register?err=비밀번호 확인을 입력하세요")}
        if(req.body.password_check != req.body.password){return res.redirect("/register?err=비밀번호와 비밀번호 확인이 다릅니다.")}
        if(req.body.password >= 8){return res.redirect("/register?err=비밀번호는 8자 이상이여야 합니다.")}
        if(result != null){return res.redirect("/register?err=이미 존재하는 계정 이름입니다.")}

        await registerAccount(req.body.email,req.body.username,req.body.password)
        req.session.user = {
            Username: req.body.username
        };

        //if(result == null){return res.redirect('/login')}
        return res.redirect("/")
    })
}
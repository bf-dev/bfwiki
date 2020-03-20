const Document = require("../util/schema/document")
const markdown = require("../util/markdown")
const getUser = require("../util/getUser")
const getACL = require("../util/getACL")
const getDocument = require("../util/getDocument")
async function checkPermission(req,type){
	//type: String 
	if(getUser.getName(req)){
		var UserACL = (await getUser.getUser(getUser.getName(req))).ACL //유저의 ACL 구하기
	}else{
		var UserACL = ["any"] //비로그인 유저의 경우 any 권한만 부여
	}
	const DocumentACL = (await getACL.getDocumentACL(req.params.document))[type] //문서의 ACL 구하기
	const Match = DocumentACL.filter(x => UserACL.includes(x)).length != 0
	return Match //일치하는 권한이 없을 때 false, 있을때는 true
}
module.exports = function (app){
	app.get("/edit/:document", async (req, res) => {
		const GetDocument = await Document.findOne({Title: req.params.document})
		const DocumentData = (GetDocument == null) ? "" : GetDocument.Data 
		var edit_content = 
		`
		${(req.query.err == undefined) ? "" : `<span style="color:red;position:relative;bottom:12px;">${req.query.err}</span><br>`}
		<form action="/edit/${req.params.document}" method="post">
            <textarea rows="25" id="content" placeholder="이곳에 내용을 입력해주세요." name="content">${DocumentData}</textarea>
            <input placeholder="사유" name="cause" type="text" style="width:calc(100% - 10px);padding:3px;margin-bottom:5px;position:relative;right:10px;" ><br>
            <button id="save" type="submit">저장</button>
            <button id="save" type="button" onclick="preview()">미리보기</button>
        </form>
        <div id="preview">
        </div>
		`
		if(!await checkPermission(req,"Read")){var edit_content = '<span style="color:red;position:relative;bottom:12px;">읽을 권한이 없어 편집할수 없습니다.</span><br></br>'}
		const data = {data:edit_content,title:`${req.params.document}`,username:getUser.getName(req)}
		res.render("index.html",data)
	})
	app.post("/edit/:document", async (req, res) => {
		const GetDocument = await Document.findOne({Title: req.params.document})
		const DocumentStatus = (GetDocument == null) 
		if(!await checkPermission(req,"Read")){return res.redirect(`/edit/${req.params.document}?err=읽을 권한이 없습니다.`)}
		if(!await checkPermission(req,"Edit")){return res.redirect(`/edit/${req.params.document}?err=편집 권한이 없습니다.`)}
		if(req.body.content == ""){return res.redirect(`/edit/${req.params.document}?err=문서 내용이 없습니다.`)}
		if(!DocumentStatus){if(req.body.content == GetDocument.Data){return res.redirect(`/edit/${req.params.document}?err=문서 내용이 같습니다.`)}}
		await getDocument.editDocument(req.params.document, req.body.content, getUser.getName(req), req.body.cause)
		res.redirect(`/w/${req.params.document}`)
	})
}
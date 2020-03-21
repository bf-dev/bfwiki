const Document = require("./schema/document")
const getUser = require("../util/getUser")
exports.getDocumentACL = async function (documentName){
    const before = await Document.findOne({Title: documentName})
    const check = (before == null)
    const result = check ? {ACL_Read:[],ACL_Edit:[],ACL_Remove:[],ACL_Move:[],ACL_Discuss:[],ACL_EditRequest:[]}:before
    
    const namespace = documentName.split(":")[0]
    console.log(0,result,documentName)
    if(namespace == "블플위키"){
        return {
            Read:((result.ACL_Read.length == 0) ? ["any"]:result.ACL_Read),
            Edit:((result.ACL_Edit.length == 0) ? ["any"]:result.ACL_Edit),
            Remove:((result.ACL_Remove.length == 0) ? ["member"]:result.ACL_Remove),
            Move:((result.ACL_Move.length == 0) ? ["member"]:result.ACL_Move),
            Discuss:((result.ACL_Discuss.length == 0) ? ["any"]:result.ACL_Discuss),
            EditRequest:((result.ACL_EditRequest.length == 0) ? ["any"]:result.ACL_EditRequest),
        }
    }else if(namespace == "틀"){
        return {
            Read:((result.ACL_Read.length == 0) ? ["any"]:result.ACL_Read),
            Edit:((result.ACL_Edit.length == 0) ? ["member"]:result.ACL_Edit),
            Remove:((result.ACL_Remove.length == 0) ? ["member"]:result.ACL_Remove),
            Move:((result.ACL_Move.length == 0) ? ["member"]:result.ACL_Move),
            Discuss:((result.ACL_Discuss.length == 0) ? ["any"]:result.ACL_Discuss),
            EditRequest:((result.ACL_EditRequest.length == 0) ? ["any"]:result.ACL_EditRequest),
        }
    }else if(namespace == "파일"){
        return {
            Read:((result.ACL_Read.length == 0) ? ["any"]:result.ACL_Read),
            Edit:((result.ACL_Edit.length == 0) ? ["any"]:result.ACL_Edit),
            Remove:((result.ACL_Remove.length == 0) ? ["member"]:result.ACL_Remove),
            Move:((result.ACL_Move.length == 0) ? ["member"]:result.ACL_Move),
            Discuss:((result.ACL_Discuss.length == 0) ? ["any"]:result.ACL_Discuss),
            EditRequest:((result.ACL_EditRequest.length == 0) ? ["any"]:result.ACL_EditRequest),
        }
    }else if(namespace == "사용자"){
        return {
            Read:((result.ACL_Read.length == 0) ? ["any"]:result.ACL_Read),
            Edit:((result.ACL_Edit.length == 0) ? [`user:${documentName.split(":")[1]}`,"admin"]:result.ACL_Edit),
            Remove:((result.ACL_Remove.length == 0) ? [`user:${documentName.split(":")[1]}`,"admin"]:result.ACL_Remove),
            Move:((result.ACL_Move.length == 0) ? [`user:${documentName.split(":")[1]}`,"admin"]:result.ACL_Move),
            Discuss:((result.ACL_Discuss.length == 0) ? ["any"]:result.ACL_Discuss),
            EditRequest:((result.ACL_EditRequest.length == 0) ? ["member"]:result.ACL_EditRequest),
        }
    }else if(namespace == "휴지통"){
        return {
            Read:((result.ACL_Read.length == 0) ? ["admin"]:result.ACL_Read),
            Edit:((result.ACL_Edit.length == 0) ? ["admin"]:result.ACL_Edit),
            Remove:((result.ACL_Remove.length == 0) ? ["admin"]:result.ACL_Remove),
            Move:((result.ACL_Move.length == 0) ? ["admin"]:result.ACL_Move),
            Discuss:((result.ACL_Discuss.length == 0) ? ["admin"]:result.ACL_Discuss),
            EditRequest:((result.ACL_EditRequest.length == 0) ? ["admin"]:result.ACL_EditRequest),
        }
    }else if(namespace == "위키운영"){
        return {
            Read:((result.ACL_Read.length == 0) ? ["admin"]:result.ACL_Read),
            Edit:((result.ACL_Edit.length == 0) ? ["admin"]:result.ACL_Edit),
            Remove:((result.ACL_Remove.length == 0) ? ["admin"]:result.ACL_Remove),
            Move:((result.ACL_Move.length == 0) ? ["admin"]:result.ACL_Move),
            Discuss:((result.ACL_Discuss.length == 0) ? ["admin"]:result.ACL_Discuss),
            EditRequest:((result.ACL_EditRequest.length == 0) ? ["admin"]:result.ACL_EditRequest),
        }
    }else{
        return {
            Read:((result.ACL_Read.length == 0) ? ["any"]:result.ACL_Read),
            Edit:((result.ACL_Edit.length == 0) ? ["any"]:result.ACL_Edit),
            Remove:((result.ACL_Remove.length == 0) ? ["member"]:result.ACL_Remove),
            Move:((result.ACL_Move.length == 0) ? ["member"]:result.ACL_Move),
            Discuss:((result.ACL_Discuss.length == 0) ? ["any"]:result.ACL_Discuss),
            EditRequest:((result.ACL_EditRequest.length == 0) ? ["any"]:result.ACL_EditRequest),
        }
        
    }
}
exports.checkPermission = async function (req,type){
    //type: String 
    
	if(getUser.getName(req)){
		var UserACL = (await getUser.getUser(getUser.getName(req))).ACL //유저의 ACL 구하기
	}else{
		var UserACL = ["any"] //비로그인 유저의 경우 any 권한만 부여
	}
	const DocumentACL = (await exports.getDocumentACL(req.params.document))[type] //문서의 ACL 구하기
	const Match = DocumentACL.filter(x => UserACL.includes(x)).length != 0
	return Match //일치하는 권한이 없을 때 false, 있을때는 true
}
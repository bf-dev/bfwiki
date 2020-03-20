const Document = require("./schema/document")
const History = require("./schema/history")



exports.editDocument = async function(title, data, user, comment){
	const result = await Document.findOne({Title: title})
	const result_history = await History.find().sort("Rev").findOne({Title:title})//One({Title: title})
	const check = (result == null)
	if(check){
		const NewDocument = new Document()
		NewDocument.Title = title
		NewDocument.Data = data
		NewDocument.ACL_Read = []
		NewDocument.ACL_Edit = []
		NewDocument.ACL_Remove = []
		NewDocument.ACL_Move = []
		NewDocument.ACL_Discuss = []
		NewDocument.ACL_EditRequest = []
		NewDocument.LastEdit = new Date()
		await NewDocument.save()
		const NewHistory = new History()
		NewHistory.Title = title
		NewHistory.Rev = 1
		NewHistory.Length = data.length
		NewHistory.Comment = comment
		NewHistory.Date = new Date()
		NewHistory.User = user
		NewHistory.Data = data
		return await NewHistory.save()
	}else{
		await Document.deleteOne({Title: title})
		const NewDocument = new Document()
		NewDocument.Title = title
		NewDocument.Data = data
		NewDocument.ACL_Read = result.ACL_Read
		NewDocument.ACL_Edit = result.ACL_Edit
		NewDocument.ACL_Remove = result.ACL_Remove
		NewDocument.ACL_Move = result.ACL_Move
		NewDocument.ACL_Discuss = result.ACL_Discuss
		NewDocument.ACL_EditRequest = result.ACL_EditRequest
		NewDocument.LastEdit = new Date()
		await NewDocument.save()
		const NewHistory = new History()
		NewHistory.Title = title
		NewHistory.Rev = result_history.Rev + 1
		NewHistory.Length = data.length - result.Data.length
		NewHistory.Comment = comment
		NewHistory.Date = new Date()
		NewHistory.User = user
		NewHistory.Data = data
		return await NewHistory.save()
	}

}
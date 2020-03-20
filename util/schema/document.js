const mongoose = require("mongoose")
const Schema = mongoose.Schema

const documentSchema = new Schema({
	Title: String,
	Data: String,

	ACL_Read: Array,
	ACL_Edit: Array,
	ACL_Move: Array,
	ACL_Remove: Array,
	ACL_Discuss: Array,
	ACL_EditRequest: Array,

	LastEdit: Date,
})
module.exports = mongoose.model("document", documentSchema)
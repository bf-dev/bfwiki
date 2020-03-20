const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
	CreatedDate: Date,
	Username: String,
	Password: String,
	ACL: Array,
	Email: String,
	Skin: String,
    
	IPUser: Boolean,
	IPList: Array,

	Ban: Boolean,
	BanUser: String,
	BanDate: Date,
	BanCause: String,
	BanUntil: Date
})
module.exports = mongoose.model("user", userSchema)
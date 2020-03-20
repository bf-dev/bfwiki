const mongoose = require("mongoose")
const Schema = mongoose.Schema

const historySchema = new Schema({
	Title: String,
	Rev: Number,
	Length: Number,
	Comment: String,
	Date: Date,
	User: String,
	Data:String
})
module.exports = mongoose.model("history", historySchema)
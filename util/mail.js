
const config = require("../config")
const nodemailer = require("nodemailer")

exports.sendCode = function(mail){
	const random = Math.round(Math.random()*10000)
	const transporter = nodemailer.createTransport({
		service: "gmail"
		,prot : 587
		,host :"smtp.gmail.com"
		,secure : false
		,requireTLS : true
		, auth: {
			user: `${config.gmail_id}@gmail.com`
			,pass: config.gmail_password
		}
	})
	// 메일 옵션
	const mailOptions = {
		from: `${config.gmail_id}@gmail.com`,
		to: mail, // 수신할 이메일
		subject: "[블플위키] 블플위키 인증 코드",
		text: `안녕하세요 블플위키입니다.\n당신의 로그인 코드는 ${random}입니다. \n블플위키에 가입해 주셔서 감사합니다.`
	}
	// 메일 발송    
	transporter.sendMail(mailOptions)
	return random

}

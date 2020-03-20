module.exports = function(app){ 
	app.get("/logout", async (req, res) => {
		if (req.session.user) {
			await req.session.destroy()
		}
		res.redirect("/")
	})
}
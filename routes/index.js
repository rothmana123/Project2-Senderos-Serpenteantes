const express = require('express')
const router = express.Router()
const passport = require('passport')
const feedControl = require('../controllers/feed');


/* GET home page.  --> need to add feed array object */
// router.get('/', function (req, res, next) {
// 	res.render('index', { title: 'Express' })
// })
router.get('/', feedControl.index)

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
	'/oauth2callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/',
	})
)

router.get('/logout', function (req, res) {
	req.logout(function () {
		res.redirect('/')
	})
})

module.exports = router

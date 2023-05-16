const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const trailControl = require('../controllers/trails');
const ensureLoggedIn = require('../config/auth');

// GET /trails
router.get('/', trailControl.index);

//Get /trails/new
router.get('/new', trailControl.new)

//POST /trails
router.post('/', trailControl.create);

//Delete /trails
router.delete('/:id', trailControl.delete);

module.exports = router

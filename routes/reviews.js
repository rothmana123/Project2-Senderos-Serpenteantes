const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const reviewsControl = require('../controllers/reviews');

const ensureLoggedIn = require('../config/auth');



// POST /reviews/:id/reviews (create review for a movie)
router.post('/:id/reviews', ensureLoggedIn, reviewsControl.create);

module.exports = router

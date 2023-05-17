const express = require('express');
const router = express.Router();
// You'll be creating this controller module next

const userControl = require('../controllers/users');

const ensureLoggedIn = require('../config/auth');


//Get 
router.get('/', userControl.index);

//GET /user
router.get('/:id', ensureLoggedIn, userControl.show)

// POST /reviews/:id/reviews (create review for a movie)
//router.post('/:id/reviews', ensureLoggedIn, reviewsControl.create);
//const favoriteTrailsRouter = express.Router({mergeParams: true})
//router.use('/:id/favorite-trail', favoriteTrailsRouter)
//favoriteTrailsRouter.put('/:trailID', userControl.addFavorite)

router.put('/:id/favorite-trail/:trailID', userControl.addFavorite);


router.delete('/:id/favorite-trail/:trailID',userControl.removeFavorite);



module.exports = router
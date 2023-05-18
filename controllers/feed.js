const Trails = require('../models/trails');
const Users = require('../models/users');

module.exports = {
    index,
}

function index(req, res) {
    const trailsPromise = Trails.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('reviews.user', 'name')
      .exec();
  
    trailsPromise
      .then((trails) => {
        const feedItems = [];
  
        trails.forEach((trail) => {
          feedItems.push({
            type: 'trail',
            trail: trail,
            user: trail.user,
            createdAt: trail.createdAt
          });
  
          trail.reviews.forEach((review) => {
            feedItems.push({
              type: 'review',
              review: review,
              user: review.user,
              createdAt: review.createdAt
            });
          });
        });
  
        feedItems.sort((a, b) => b.createdAt - a.createdAt);
        const limitedFeedItems = feedItems.slice(0, 15); // Limit to 15 items
  
        res.render('index', { title: 'Express', feedItems: limitedFeedItems });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  }
  
  
  
  
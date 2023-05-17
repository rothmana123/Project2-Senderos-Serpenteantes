const Trails = require('../models/trails');
const Users = require('../models/users');

module.exports = {
    create: createReview,
    delete: deleteReview,
  };
  

  function createReview(req, res) {
    console.log("***create review function hit");
  
    const trailId = req.params.id;
    const userId = req.user._id;
  
    Promise.all([
      Trails.findById(trailId),
      Users.findById(userId),
    ])
      .then(([trail, user]) => {
        if (!trail || !user) {
          // Trail or User not found
          console.log("Trail or User not found");
          return res.redirect('/trails');
        }
  
        // Add the user-centric info to req.body (the new review)
        req.body.user = userId;
        req.body.userName = user.name;
        req.body.userAvatar = user.avatar;
  
        // Push subdocs into Mongoose arrays
        trail.reviews.push(req.body);
        if (!user.completed.includes(trailId)) {
            user.completed.push(trailId);
          }
        user.reviews.push(req.body);
  
        // Save any changes made to the trail and user docs
        return Promise.all([trail.save(), user.save()]);
      })
      .then(([savedTrail, savedUser]) => {
        console.log("***redirect***");
        res.redirect(`/trails/${savedTrail._id}`);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
  }
  
  function deleteReview(req, res) {
    console.log("****This is Delete Function debugging****");
  
    if (!req.isAuthenticated()) {
      console.log("the user is not authenticated");
      return res.redirect('/trails'); // Redirect to the login page or handle unauthorized access
    }
  
    const trailId = req.params.trailId;
    const reviewId = req.params.reviewId;
  
    Trails.findById(trailId)
      .then((trail) => {
        if (!trail) {
          // Trail not found
          return res.redirect('/trails');
        }
  
        const reviewIndex = trail.reviews.findIndex((review) => review._id.equals(reviewId));
  
        if (reviewIndex === -1) {
          // Review not found in the trail
          return res.redirect('/trails');
        }
  
        trail.reviews.splice(reviewIndex, 1);
  
        return trail.save();
      })
      .then(() => {
        return res.redirect('/trails/show');
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).send('Internal Server Error');
      });
  }
  
  
  

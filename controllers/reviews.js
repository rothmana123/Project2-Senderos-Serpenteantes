const Trails = require('../models/trails');

module.exports = {
    create: createReview,
  };

function createReview(req, res) {
    console.log("***create review function hit")
    Trails.findById(req.params.id)
        .then((trail) => {
        if (!trail) {
            // Trail not found
            console.log("Trail not found")
            return res.redirect('/trails');
        }

        // Add the user-centric info to req.body (the new review)
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        // Push (or unshift) subdocs into Mongoose arrays
        trail.reviews.push(req.body);

        // Save any changes made to the trail doc
        return trail.save();
        })
        .then((savedTrail) => {
        console.log("***redirect***")
        res.redirect(`/trails/${savedTrail._id}`);
        })
        .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
        });
    }
  
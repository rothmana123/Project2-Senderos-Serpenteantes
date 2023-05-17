const Users = require('../models/users');

module.exports = {
    index,
    show: showUser,
    addFavorite,
    removeFavorite,
  };

function index(req, res) {
  console.log("***Users index route hit***")
  Users.find({})
    .then((users) => {
      res.render('users/index', { users });
    })
    .catch((error) => {
      // Handle error
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
}

function showUser(req, res) {
    console.log("******show User route was hit");
    Users.findById(req.params.id)
        .then((user) => {
        console.log(user);
        res.render('users/show', { user });
        })
        .catch((error) => {
        console.log(error);
        res.status(500).send('Error finding User');
        });
    }

function addFavorite(req, res) {
  console.log("****add favorites function hit****")
  const trailID = req.params.trailID
  const userID = req.params.id

  Users.findById(userID).then((user) => {
    if (!user.favorites.includes(trailID)) {
      user.favorites.push(trailID)
      user.save()
      return res.redirect(`/trails/${trailID}`);
    } 
  }).catch((error) => {
    console.log(error);
    res.status(500).send('Error adding favorite');
  });
}

function removeFavorite(req, res) {
  console.log("*** removing from favorites ****");
  const trailID = req.params.trailID
  const userID = req.params.id

  Users.findById(userID).then((user) => {
    const trailIndex = user.favorites.indexOf(trailID);
    if (trailIndex > -1) {
      user.favorites.splice(trailIndex, 1);
      user.save()
    }
    return res.redirect(`/trails/${trailID}`);
  }).catch((error) => {
    console.log(error);
    res.status(500).send("Error removing favorite");
  })
}

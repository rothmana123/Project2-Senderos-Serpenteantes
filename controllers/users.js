const Users = require('../models/users');
const Trails = require('../models/trails');


module.exports = {
    index,
    show: showUser,
    addFavorite,
    removeFavorite,
    favoriteTrailsList
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

// function favoriteTrailsList (req, res) {
//   console.log("***favoriteTrails function hit***")
//   const userID = req.params.id

//   Users.findById(userID)
//     .then((user) => {
//       const trailIDs = user.favorites;
//       console.log("***ids of user favorite trails:", trailIDs);
//       const favoriteTrails = [];
//       trailIDs.forEach(function(id) {
//         Trails.findById(id)
//           .then((trail) => {
//             favoriteTrails.push(trail)
//         })
//       console.log("***user's favorite trails:", favoriteTrails);
//       res.render('users/show', { favoriteTrails });
//     }).catch((error) => {
//     console.log(error);
//     res.status(500).send("Error creating favorites list");
//     })
//   })
// }
function showUser(req, res) {
  console.log("******show User route was hit");
  const userId = req.params.id;

  Promise.all([
    Users.findById(userId),
    favoriteTrailsList(userId)
  ])
    .then(([user, favoriteTrails]) => {
      console.log(user);
      res.render('users/show', { user, favoriteTrails });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error finding User');
    });
}

function favoriteTrailsList(userID) {
  console.log("***favoriteTrails function hit***");
  return new Promise((resolve, reject) => {
    Users.findById(userID)
      .then((user) => {
        const trailIDs = user.favorites;
        console.log("***ids of user favorite trails:", trailIDs);
        const favoriteTrails = [];

        const fetchTrails = async () => {
          try {
            for (let i = 0; i < trailIDs.length; i++) {
              const trail = await Trails.findById(trailIDs[i]);
              favoriteTrails.push(trail);
            }
            console.log("***user's favorite trails:", favoriteTrails);
            resolve(favoriteTrails);
          } catch (error) {
            console.log(error);
            reject("Error creating favorites list");
          }
        };

        fetchTrails();
      })
      .catch((error) => {
        console.log(error);
        reject("Error retrieving user");
      });
  });
}

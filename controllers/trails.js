const Trails = require('../models/trails');

module.exports = {
    index,
    new: newTrailPage,
    create: createTrail,
    delete: deleteTrail,
  };

  function index(req, res) {
    Trails.find({})
      .then((trails) => {
        res.render('trails/index', { title: 'All the Trails', trails });
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
  }

  function newTrailPage(req, res) {
    res.render('trails/new', { Trails }
  )};

  function createTrail(req, res) {
    console.log("This is a create trail request", req.body)
    req.body.user = req.user.id;
    req.body.userName = req.user.name;

    const features = req.body.features || [];

    // Convert the features array to a comma-separated string
    const featuresString = features.join(', ');

    // Create a new trail and assign the features
    const newTrail = new Trails({
      name: req.body.name,
      miles: req.body.miles,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      region: req.body.region,
      state: req.body.state,
      features: featuresString, // Assign the converted string to the features field
      user: req.body.user,
      userName: req.user.name,
    });
      Trails.create(newTrail)
          .then(result => {
              console.log('New trail added:', result);
              res.redirect('/trails');
          })
          .catch(err => {
              console.log(err);
              res.redirect('/trails/new');
          });
    }

  function deleteTrail(req, res) {
    console.log("****This is Delete Function debugging****")

    if (!req.isAuthenticated()) {
      console.log("the user is not authenticated")
      return res.redirect('/trails'); // Redirect to the login page or handle unauthorized access
    }
      if (!req.isAuthenticated()) {
  return res.redirect('/login');
}

  Trails.deleteOne({ _id: req.params.id, user: req.user._id })
    .then(() => {
      res.redirect('/trails');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
}
var User = require('../models/user1');
var regexp = require('node-regexp')
var regexp = new regexp ('\\l','i');

exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    created_at: new Date(),
    updated_at: ""
  });
  user.save(function(err, response) {
    if (err) {
      res.json(err)
    }
    res.json({success: true, body: response});
  });
  // console.log(user);
};


exports.getusers = function(req, res) {

  User.find({}, function(err, response) {
    if (err) {
      return res.json(req, res, err);
    }

    res.json(response);
  });
}


exports.getuser = function(req, res) {

  User.find({name: regexp}, function(err, response) {
    if (err) {
      return res.json(req, res, err);
    }
    res.json(response);
    // console.log(response);
  });
}



exports.updateUsers = function(req, res) {
  var id = req.params.id;
  User.findOne({
    _id: id
  }, function(err, user) {
    if (err) {
      return res.json(err)
    }
    var username = req.body.username;
    user.username = username;
    user.updated_at = new Date();

    user.save(function(err, response) {
      if (err) {
        res.json(err);
      }
      res.json(response);
    });
  });
}



exports.deleteUsers = function(req, res) {
  var id = req.params.id;
  User.findOne({
    _id: id
  }, function(err, user) {
    if (err) {
      res.json(err);
    }

    if (user) {
      User.remove({
        _id: id
      }, function(err) {
        if (err) {
          res.json(err);
        }

        res.json("success");
      })
    } else {
      res.json("User doesnt exist");
    }

  })
}



exports.finduser = function(req, res) {
  var id = req.params.id;
  User.findOne({
    _id: id
  }, function(err, response) {
    if (err) {
      res.json(err);
    }

    if (response) {
      User.findOne({
        _id: id
      }, function(err) {
        if (err) {
          res.json(err);
        }

        res.json(response);
      })
    }
    else {
      res.json("User doesnt exist");
    }

  })
}

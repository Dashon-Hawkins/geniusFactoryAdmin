/**
 * memberController
 *
 * @description :: Server-side logic for managing membercontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
  Membercreate: function createFn(req, res) {
 	 var body = req.body;

 	 body.memberId = req.session.member.id;
 	 return member.create(body)
 		 .then(result => res.json(result))
 		 .catch(error => res.json(500, error));
  },
  find: function findFn(req, res) {
 	 return member.find({ memberId: req.params.id})
 		 .then(result => res.json(result))
 		 .catch(error => res.json(500, error));
  },
  findOne: function findOneFn(req, res) {
 	 var id = req.param('id');
 	 if (id === undefined) {
 		 return res.json(400, 'id is required');
 	 }

 	 return member.findOne({ id: id, memberId: req.session.member.id })
 		 .then(result => res.json(result))
 		 .catch(error => res.json(500, error));
  },
  update: function updateFn(req, res) {
 	 var id = req.param('id');
 	 if (id === undefined) {
 		 return res.json(400, 'id is required');
 	 }

 	 var memberId = req.session.member.id;
 	 var body = req.body;
 	 body.memberId = memberId;

 	 return member.update({ id: id , memberId: memberId }, body)
 		 .then(result => res.json(result))
 		 .catch(error => res.json(500, error));

  },
  delete: function deleteFn(req, res) {
 	 var id = req.param('id');
 	 if (id === undefined) {
 		 return res.json(400, 'id is required');
 	 }

 	 return member.delete({ id: id , memberId: req.session.member.id })
 		 .then(result => res.json(result))
 		 .catch(error => res.json(500, error));
  },

  /**
 * Check the provided email address and password, and if they
 * match a real user in the postgreSQL database, sign in to Genius Factory Members Portal.
 */
login: function (req, res) {

  // Try to look up user using the provided email address
  User.findOne({
    email: req.param('email')
  }, function foundUser(err, user) {
    if (err) return res.negotiate(err);
    if (!user) return res.notFound();

    // Compare password attempt from the form params to the encrypted password
    // from the database (`user.password`)
    require('machinepack-passwords').checkPassword({
      passwordAttempt: req.param('password'),
      encryptedPassword: user.encryptedPassword
    }).exec({

      error: function (err){
        return res.negotiate(err);
      },

      // If the password from the form params doesn't checkout w/ the encrypted
      // password from the database...
      incorrect: function (){
        return res.notFound();
      },

      success: function (){

        // Store user id in the user session
        req.session.me = user.id;

        // All done- let the client know that everything worked.
        return res.ok();
      }
    });
  });

},

/**
 * Sign up for a user account.
 */
signup: function(req, res) {

  var Passwords = require('machinepack-passwords');

  // Encrypt a string using the BCrypt algorithm.
  Passwords.encryptPassword({
    password: req.param('password'),
    difficulty: 10,
  }).exec({
    // An unexpected error occurred.
    error: function(err) {
      return res.negotiate(err);
    },
    // OK.
    success: function(encryptedPassword) {
      require('machinepack-gravatar').getImageUrl({
        emailAddress: req.param('email')
      }).exec({
        error: function(err) {
          return res.negotiate(err);
        },
        success: function(gravatarUrl) {
        // Create a User with the params sent from
        // the sign-up form --> signup.ejs
          User.create({
            name: req.param('name'),
            title: req.param('title'),
            email: req.param('email'),
            encryptedPassword: encryptedPassword,
            lastLoggedIn: new Date(),
            gravatarUrl: gravatarUrl
          }, function userCreated(err, newUser) {
            if (err) {

              console.log("err: ", err);
              console.log("err.invalidAttributes: ", err.invalidAttributes)

              // If this is a uniqueness error about the email attribute,
              // send back an easily parseable status code.
              if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
                && err.invalidAttributes.email[0].rule === 'unique') {
                return res.emailAddressInUse();
              }

              // Otherwise, send back something reasonable as our error response.
              return res.negotiate(err);
            }

            // Log user in
            req.session.me = newUser.id;

            // Send back the id of the new user
            return res.json({
              id: newUser.id
            });
          });
        }
      });
    }
  });
},

/**
 * Log out of Genius Factory members portal.
 * (wipes `me` from the sesion)
 */
logout: function (req, res) {

  // Look up the user record from the postgreSQL database which is
  // referenced by the id in the user session (req.session.me)
  User.findOne(req.session.me, function foundUser(err, user) {
    if (err) return res.negotiate(err);

    // If session refers to a user who no longer exists, still allow logout.
    if (!user) {
      sails.log.verbose('This session refers to a user who no longer exists.');
      return res.backToHomePage();
    }

    // Wipe out the session (log out)
    req.session.me = null;

    // Either send a 200 OK or redirect to the home page
    return res.backToHomePage();

  });
}

 };

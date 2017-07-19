/**
 * memberController
 *
 * @description :: Server-side logic for managing membercontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
  create: function createFn(req, res) {
 	 var body = req.body;

 	 return member.create()
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

 	 return member.findOne({ id: id, memberId: req.params.member.id })
 		 .then(result => res.json(result))
 		 .catch(error => res.json(500, error));
  },
  update: function updateFn(req, res) {
 	 var id = req.param('id');
 	 if (id === undefined) {
 		 return res.json(400, 'id is required');
 	 }

 	 var memberId = req.aprams.member.id;
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
 * match a real member in the postgreSQL database, sign in to Genius Factory Members Portal.
 */
login: function (req, res) {

  // Try to look up member using the provided email address
  member.findOne({
    email: req.param('email')
  }, function foundMember(err, member) {
    if (err) return res.negotiate(err);
    if (!member) return res.notFound();

    // Compare password attempt from the form params to the encrypted password
    // from the database (`member.password`)
    require('machinepack-passwords').checkPassword({
      passwordAttempt: req.param('password'),
      encryptedPassword: member.encryptedPassword
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

        // Store member id in the member session
        req.session.me = member.id;

        // All done- let the client know that everything worked.
        return res.ok();
      }
    });
  });

},

/**
 * Sign up for a member account.
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
        // Create a member with the params sent from
        // the sign-up form --> signup.ejs
          member.create({
            firstName: req.param('firstName'),
            lastName: req.param('lastName'),
            age: req.params('age'),
            city: req.params('city'),
            state: req.params('state'),
            zipCode: req.params('zipCode'),
            title: req.param('title'),
            email: req.param('email'),
            encryptedPassword: encryptedPassword,
            lastLoggedIn: new Date(),
            gravatarUrl: gravatarUrl
          }, function memberCreated(err, newMember) {
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

            // Log member in
            req.session.me = newMember.id;

            // Send back the id of the new member
            return res.json({
              id: newMember.id
            });
          });
        }
      });
    }
  });
},

/**
 * Log out of Genius Factory Members portal.
 * (wipes `me` from the sesion)
 */
logout: function (req, res) {

  // Look up the member record from the postgreSQL database which is
  // referenced by the id in the member session (req.session.me)
  member.findOne(req.session.me, function foundMember(err, member) {
    if (err) return res.negotiate(err);

    // If session refers to a member who no longer exists, still allow logout.
    if (!member) {
      sails.log.verbose('This session refers to a member who no longer exists.');
      return res.backToHomePage();
    }

    // Wipe out the session (log out)
    req.session.me = null;

    // Either send a 200 OK or redirect to the home page
    return res.backToHomePage();

  });
}

 };

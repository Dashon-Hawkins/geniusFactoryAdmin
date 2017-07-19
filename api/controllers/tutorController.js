/**
 * tutorController
 *
 * @description :: Server-side logic for managing tutorportalapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


 module.exports = {
   "new": function(req, res) {
     res.view();
   },

   "/": function(req, res) {
     res.view();
   },

// Full CRUD RESTful API below

   create: function(req, res, next) {

     // Create a ("C"RUD RESTful API) tutor with the params sent from the sign-up form --> views/tutor/new.ejs

     tutor.create(req.params.all(), function tutorCreated(err, tutor) {
       if (err)
         return res.serverError(err);
       //   req.session.flash = {
       //     err: err
       //   };
       //   return res.redirect('/tutor/new');
       // }

       // res.view(tutor);

       res.redirect('/tutor');

       // else return res.json(user); <<< This is the example from the video.
       // req.session.flash = {};  <<<Create a flash message and inject it into the sign-up page in /views/user/UserController.js we store the error in the request session object, which will be persistent across web pages (and clear it in the case of a success)

     })
   },

   // After tutor is created this allows to read (c"R"ud RESTful API) the tutor created and find all of the tutors.

   index: function(req, res) {
     tutor.find().exec(function(err, tutor) {
       res.view({tutor: tutor});
     });
   },

   // Allowes you to find one of the tutors by id and lets you view the record (C"R"UD RESTful API)

   show: function(req, res) {
     tutor.findOne({id: req.params.id}).exec(function(err, tutor) {
       res.view({tutor: tutor});
     });
   },

   // Render the edit view (e.g. /views/edit.ejs) if tutor is found by id else gives an error message.

   edit: function(req, res, next) {
     // Find the tutor from the id passed via params
     tutor.findOne(req.params['id'], function foundTutor(err, tutor) {
       if (err)
         return next(err);
       if (!tutor)
         return next('tutor doesn\'t exist in our system, please try again.');
       res.view({tutor: tutor});
     });

   },

   // Process the info from the edit view
   // Nmuta's version of the update is first
   //
   // tutor.update({id: req.params.id}).exec(function afterwards(err, updated){
   //
   //   if (err) {
   //     // handle error here- e.g. `res.serverError(err);`
   //     return;
   //   }
   //
   //   console.log('Updated user to have name ' + updated[0].name);
   // });

   // Update the info within the tutor view (e.g. /tutor.edit) redirect and reflect changes in show.ejs (CR"U"D RESTful API)

   update: function(req, res, next) {
     tutor.update(req.params['id'], req.params.all(), function tutorUpdated(err) {
       if (err) {
         return res.redirect('/tutor/edit/' + req.param('id'));
       }
       res.redirect('/tutor/show/' + req.param('id'));
     });
   },

   // Find a tutor by id and if exists delete (destroy) a tutor and redirect to /tutor (CRU"D" RESTful API)

   destroy: function(req, res, next) {
     tutor.findOne(req.param('id'), function foundTutor(err, tutor) {
       if (err) return next(err);
       if (!tutor)
         return next('tutor doesn\'t exist in our system, please try again.');
       tutor.destroy(req.param('id'), function tutorDestroyed(err) {
         if (err)
           return next(err);
         }
       );

       res.redirect('/tutor')
     });
   }
 };


//  Tutorial for SailsJS v 0.11.0+ below (2nd video series with AngularJS)
 // module.exports = {
 //  create: function createFn(req, res) {
 //    var body = req.body;
 //
 //    body.userId = req.params.user.id;
 //    return tutor.create(body)
 //      .then(result => res.json(result))
 //      .catch(error => res.json(500, error));
 //  },
 //  find: function findFn(req, res) {
 //    return tutor.find({ userId: req.params.user.id})
 //      .then(result => res.json(result))
 //      .catch(error => res.json(500, error));
 //  },
 //  findOne: function findOneFn(req, res) {
 //    var id = req.param('id');
 //    if (id === undefined) {
 //      return res.json(400, 'id is required');
 //    }
 //
 //    return tutor.findOne({ id: id, userId: req.params.user.id })
 //      .then(result => res.json(result))
 //      .catch(error => res.json(500, error));
 //  },
 //  update: function updateFn(req, res) {
 //    var id = req.param('id');
 //    if (id === undefined) {
 //      return res.json(400, 'id is required');
 //    }
 //
 //    var userId = req.params.user.id;
 //    var body = req.body;
 //    body.userId = userId;
 //
 //    return tutor.update({ id: id , userId: userId }, body)
 //      .then(result => res.json(result))
 //      .catch(error => res.json(500, error));
 //
 //  },
 //  delete: function deleteFn(req, res) {
 //    var id = req.param('id');
 //    if (id === undefined) {
 //      return res.json(400, 'id is required');
 //    }
 //
 //    return tutor.delete({ id: id , userId: req.params.user.id })
 //      .then(result => res.json(result))
 //      .catch(error => res.json(500, error));
 //  }
 // };

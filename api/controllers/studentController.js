/**
 * studentController
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

   create: function(req, res, next) {

     // Create a ("C"RUD RESTful API) student with the params sent from the sign-up form --> views/student/new.ejs

     student.create(req.params.all(), function studentCreated(err, student) {
       if (err)
         return res.serverError(err);
       //   req.session.flash = {
       //     err: err
       //   };
       //   return res.redirect('/student/new');
       // }

       // res.view(student);

       res.redirect('/student');

       // else return res.json(user); <<< This is the example from the video.
       // req.session.flash = {};  <<<Create a flash message and inject it into the sign-up page in /views/user/UserController.js we store the error in the request session object, which will be persistent across web pages (and clear it in the case of a success)

     })
   },

   // After student is created this allows to read (c"R"ud RESTful API) the student created and find all of the students.

   index: function(req, res) {
     student.find().exec(function(err, student) {
       res.view({student: student});
     });
   },

   // Allowes you to find one of the students by id and lets you view the record (C"R"UD RESTful API)

   show: function(req, res) {
     student.findOne({id: req.params.id}).exec(function(err, student) {
       res.view({student: student});
     });
   },

   // Render the edit view (e.g. /views/edit.ejs) if student is found by id else gives an error message.

   edit: function(req, res, next) {
     // Find the student from the id passed via params
     student.findOne(req.params['id'], function foundStudent(err, student) {
       if (err)
         return next(err);
       if (!student)
         return next('student doesn\'t exist in our system, please try again.');
       res.view({student: student});
     });

   },

   // Process the info from the edit view
   // Nmuta's version of the update is first
   //
   // student.update({id: req.params.id}).exec(function afterwards(err, updated){
   //
   //   if (err) {
   //     // handle error here- e.g. `res.serverError(err);`
   //     return;
   //   }
   //
   //   console.log('Updated user to have name ' + updated[0].name);
   // });

   // Update the info within the student view (e.g. /student.edit) redirect and reflect changes in show.ejs (CR"U"D RESTful API)

   update: function(req, res, next) {
     student.update(req.params['id'], req.params.all(), function studentUpdated(err) {
       if (err) {
         return res.redirect('/student/edit/' + req.param('id'));
       }
       res.redirect('/student/show/' + req.param('id'));
     });
   },

   // Find a student by id and if exists delete (destroy) a student and redirect to /student (CRU"D" RESTful API)

   destroy: function(req, res, next) {
     student.findOne(req.param('id'), function foundStudent(err, student) {
       if (err) return next(err);
       if (!student)
         return next('student doesn\'t exist in our system, please try again.');
       student.destroy(req.param('id'), function studentDestroyed(err) {
         if (err)
           return next(err);
         }
       );

       res.redirect('/student')
     });
   }
 };


//Tutorial Code 2.0 below:
// module.exports = {
//
//    create: function createFn(req, res) {
//   	 var body = req.body;
//
//   	 body.studentId = req.params.student.id;
//   	 return student.create(body)
//   		 .then(result => res.json(result))
//   		 .catch(error => res.json(500, error));
//    },
//    find: function findFn(req, res) {
//   	 return student.find({ studentId: req.params.id})
//   		 .then(result => res.json(result))
//   		 .catch(error => res.json(500, error));
//    },
//    findOne: function findOneFn(req, res) {
//   	 var id = req.param('id');
//   	 if (id === undefined) {
//   		 return res.json(400, 'id is required');
//   	 }
//
//   	 return student.findOne({ id: id, studentId: req.params.student.id })
//   		 .then(result => res.json(result))
//   		 .catch(error => res.json(500, error));
//    },
//
//    update: function updateFn(req, res) {
//   	 var id = req.param('id');
//   	 if (id === undefined) {
//   		 return res.json(400, 'id is required');
//   	 }
//
//   	 var studentId = req.params.student.id;
//   	 var body = req.body;
//   	 body.studentId = studentId;
//
//   	 return student.update({ id: id , studentId: studentId }, body)
//   		 .then(result => res.json(result))
//   		 .catch(error => res.json(500, error));
//
//    },
//
//    delete: function deleteFn(req, res) {
//   	 var id = req.param('id');
//   	 if (id === undefined) {
//   		 return res.json(400, 'id is required');
//   	 }
//
//   	 return student.delete({ id: id , studentId: req.params.student.id })
//   		 .then(result => res.json(result))
//   		 .catch(error => res.json(500, error));
//    }
// };

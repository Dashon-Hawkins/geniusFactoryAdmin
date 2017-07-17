/**
 * studentController
 *
 * @description :: Server-side logic for managing tutorportalapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

  module.exports = {
   Studentcreate: function createFn(req, res) {
  	 var body = req.body;

  	 body.studentId = req.session.student.id;
  	 return student.create(body)
  		 .then(result => res.json(result))
  		 .catch(error => res.json(500, error));
   },
   find: function findFn(req, res) {
  	 return student.find({ studentId: req.params.id})
  		 .then(result => res.json(result))
  		 .catch(error => res.json(500, error));
   },
   findOne: function findOneFn(req, res) {
  	 var id = req.param('id');
  	 if (id === undefined) {
  		 return res.json(400, 'id is required');
  	 }

  	 return student.findOne({ id: id, studentId: req.session.student.id })
  		 .then(result => res.json(result))
  		 .catch(error => res.json(500, error));
   },
   update: function updateFn(req, res) {
  	 var id = req.param('id');
  	 if (id === undefined) {
  		 return res.json(400, 'id is required');
  	 }

  	 var studentId = req.session.student.id;
  	 var body = req.body;
  	 body.studentId = studentId;

  	 return student.update({ id: id , studentId: studentId }, body)
  		 .then(result => res.json(result))
  		 .catch(error => res.json(500, error));

   },
   delete: function deleteFn(req, res) {
  	 var id = req.param('id');
  	 if (id === undefined) {
  		 return res.json(400, 'id is required');
  	 }

  	 return student.delete({ id: id , studentId: req.session.student.id })
  		 .then(result => res.json(result))
  		 .catch(error => res.json(500, error));
   }
  };
};

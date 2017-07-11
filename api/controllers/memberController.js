/**
 * memberController
 *
 * @description :: Server-side logic for managing membercontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
  create: function createFn(req, res) {
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
  }
 };

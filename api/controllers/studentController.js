/**
 * studentController
 *
 * @description :: Server-side logic for managing tutorportalapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 // module.exports = {
 //  create: function createFn(req, res) {
 //    var body = req.body;
 //
 //    body.userId = req.session.user.id;
 //    return student.create(body)
 //      .then(result => res.json(result))
 //      .catch(error => res.json(500, error));
 //  },
 //  find: function findFn(req, res) {
 //    return student.find({ userId: req.session.user.id})
 //      .then(result => res.json(result))
 //      .catch(error => res.json(500, error));
 //  },
 //  findOne: function findOneFn(req, res) {
 //    var id = req.param('id');
 //    if (id === undefined) {
 //      return res.json(400, 'id is required');
 //    }
 //
 //    return student.findOne({ id: id, userId: req.session.user.id })
 //      .then(result => res.json(result))
 //      .catch(error => res.json(500, error));
 //  },
 //  update: function updateFn(req, res) {
 //    var id = req.param('id');
 //    if (id === undefined) {
 //      return res.json(400, 'id is required');
 //    }
 //
 //    var userId = req.session.user.id;
 //    var body = req.body;
 //    body.userId = userId;
 //
 //    return student.update({ id: id , userId: userId }, body)
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
 //    return student.delete({ id: id , userId: req.session.user.id })
 //      .then(result => res.json(result))
 //      .catch(error => res.json(500, error));
 //  }
 // };

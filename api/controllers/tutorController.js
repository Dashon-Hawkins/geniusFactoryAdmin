/**
 * tutorController
 *
 * @description :: Server-side logic for managing tutorportalapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
  create: function createFn(req, res) {
    var body = req.body;

    body.userId = req.params.user.id;
    return tutor.create(body)
      .then(result => res.json(result))
      .catch(error => res.json(500, error));
  },
  find: function findFn(req, res) {
    return tutor.find({ userId: req.params.user.id})
      .then(result => res.json(result))
      .catch(error => res.json(500, error));
  },
  findOne: function findOneFn(req, res) {
    var id = req.param('id');
    if (id === undefined) {
      return res.json(400, 'id is required');
    }

    return tutor.findOne({ id: id, userId: req.params.user.id })
      .then(result => res.json(result))
      .catch(error => res.json(500, error));
  },
  update: function updateFn(req, res) {
    var id = req.param('id');
    if (id === undefined) {
      return res.json(400, 'id is required');
    }

    var userId = req.params.user.id;
    var body = req.body;
    body.userId = userId;

    return tutor.update({ id: id , userId: userId }, body)
      .then(result => res.json(result))
      .catch(error => res.json(500, error));

  },
  delete: function deleteFn(req, res) {
    var id = req.param('id');
    if (id === undefined) {
      return res.json(400, 'id is required');
    }

    return tutor.delete({ id: id , userId: req.params.user.id })
      .then(result => res.json(result))
      .catch(error => res.json(500, error));
  }
 };

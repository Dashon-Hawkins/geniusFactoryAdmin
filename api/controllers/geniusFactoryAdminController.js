/**
 * geniusFactoryAdminController
 *
 * @description :: Server-side logic for managing tutorportalapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 //  module.exports = {
 //   create: function createFn(req, res) {
 //     var body = req.body;
 //
 //     body.userId = req.session.user.id;
 //     return geniusFactoryAdmin.create(body)
 //       .then(result => res.json(result))
 //       .catch(error => res.json(500, error));
 //   },
 //   find: function findFn(req, res) {
 //     return geniusFactoryAdmin.find({ userId: req.session.user.id})
 //       .then(result => res.json(result))
 //       .catch(error => res.json(500, error));
 //   },
 //   findOne: function findOneFn(req, res) {
 //     var id = req.param('id');
 //     if (id === undefined) {
 //       return res.json(400, 'id is required');
 //     }
 //
 //     return geniusFactoryAdmin.findOne({ id: id, userId: req.session.user.id })
 //       .then(result => res.json(result))
 //       .catch(error => res.json(500, error));
 //   },
 //   update: function updateFn(req, res) {
 //     var id = req.param('id');
 //     if (id === undefined) {
 //       return res.json(400, 'id is required');
 //     }
 //
 //     var userId = req.session.user.id;
 //     var body = req.body;
 //     body.userId = userId;
 //
 //     return geniusFactoryAdmin.update({ id: id , userId: userId }, body)
 //       .then(result => res.json(result))
 //       .catch(error => res.json(500, error));
 //
 //   },
 //   delete: function deleteFn(req, res) {
 //     var id = req.param('id');
 //     if (id === undefined) {
 //       return res.json(400, 'id is required');
 //     }
 //
 //     return geniusFactoryAdmin.delete({ id: id , userId: req.session.user.id })
 //       .then(result => res.json(result))
 //       .catch(error => res.json(500, error));
 //   }
 // };

module.exports = {
  "new": function(req, res) {
    res.view();
  },

  "/": function(req, res) {
    res.view();
  },

  create: function(req, res, next) {
    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    member.create(req.params.all(), function memberCreated(err, member) {
      if (err) return res.serverError(err);

      // res.view(member);
      res.redirect('/member');
      // else return res.json(user); (This is the example from the video.)

    })
  },

  index: function(req, res) {
    member.find().exec(function(err, member) {
      res.view({member: member});
    });
  },

  show: function(req, res) {
    member.findOne({id: req.params.id}).exec(function(err, member) {
      res.view({member: member});
    });
  },

  // Render the edit view (e.g. /views/edit.ejs)
  edit: function(req, res, next) {
    // Find the member from the id passed via params
    member.findOne(req.params['id'], function foundMember(err, member) {
      if (err)
        return next(err);
      if (!member)
        return next('Member doesn\'t exist in our system, please try again.');
      res.view({member: member});
    });

  },

  // Process the info from the edit view
  // Nmuta's version of the update iss first
  //
  // member.update({id: req.params.id}).exec(function afterwards(err, updated){
  //
  //   if (err) {
  //     // handle error here- e.g. `res.serverError(err);`
  //     return;
  //   }
  //
  //   console.log('Updated user to have name ' + updated[0].name);
  // });


  update: function(req, res, next) {
    member.update(req.params['id'], req.params.all(), function memberUpdated(err) {
      if (err) {
        return res.redirect('/member/edit/' + req.param('id'));
      }
      res.redirect('/member/show/' + req.param('id'));
    });
  },

  destroy: function (req, res, next) {
    member.findOne(req.param('id'), function foundMember (err, member) {
      if err return next(err);
      if (!member) return next('Member doesn\'t exist in our system, please try again.');
      member.destroy(req.param('id'), function memberDestroyed(err) {
        if (err) return next(err);
      });

      res.redirect('/member')
    });
  }
};

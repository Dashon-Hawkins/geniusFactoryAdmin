module.exports = {
  "new": function(req, res) {
    res.view();
  },

  "/": function(req, res) {
    res.view();
  },

  create: function(req, res, next) {

    // Create a ("C"RUD RESTful API) member with the params sent from the sign-up form --> views/member/new.ejs

    member.create(req.params.all(), function memberCreated(err, member) {
      if (err)
        return res.serverError(err);
      //   req.session.flash = {
      //     err: err
      //   };
      //   return res.redirect('/member/new');
      // }

      // res.view(member);

      res.redirect('/member');

// <<< This is the example from the video.
      // <<<Create a flash message and inject it into the sign-up page in /views/member/memberController.js we store the error in the request session object, which will be persistent across web pages (and clear it in the case of a success)

      // else return res.json(member);
      // req.session.flash = {};


    })
  },

  // After member is created this allows to read (c"R"ud RESTful API) the member created and find all of the members.

  index: function(req, res) {
    member.find().exec(function(err, member) {
      res.view({member: member});
    });
  },

  // Allowes you to find one of the members by id and lets you view the record (C"R"UD RESTful API)

  show: function(req, res) {
    member.findOne({id: req.params.id}).exec(function(err, member) {
      res.view({member: member});
    });
  },

  // Render the edit view (e.g. /views/edit.ejs) if member is found by id else gives an error message.

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
  // Nmuta's version of the update is first
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

  // Update the info within the member view (e.g. /member.edit) redirect and reflect changes in show.ejs (CR"U"D RESTful API)

  update: function(req, res, next) {
    member.update(req.params['id'], req.params.all(), function memberUpdated(err) {
      if (err) {
        return res.redirect('/member/edit/' + req.param('id'));
      }
      res.redirect('/member/show/' + req.param('id'));
    });
  },

  // Find a member by id and if exists delete (destroy) a member and redirect to /member (CRU"D" RESTful API)

  destroy: function(req, res, next) {
    member.findOne(req.param('id'), function foundMember(err, member) {
      if (err) return next(err);
      if (!member)
        return next('Member doesn\'t exist in our system, please try again.');
      member.destroy(req.param('id'), function memberDestroyed(err) {
        if (err)
          return next(err);
        }
      );

      res.redirect('/homepage')
    });
  }
};

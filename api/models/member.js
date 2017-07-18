/**
 * member.js
 *
 * @description :: parent: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 module.exports = {

  attributes: {

    // The user's first name
    // e.g. Barak
    firstName: {
      type: 'string',
      required: true,
    },

    // The user's last name
    // e.g. Obama
    lastName: {
      type: 'string',
      required: false,
    },

    city: {
      type: 'string',
      required: false,
    },

    state: {
      type: 'string',
      required: false,
    },

    zipCode: {
      type: 'integer',
      required: false,
    },

    // The user's permission level
    // e.g. Parent/Student/Tutor
    title: {
      type: 'string',
      required: false
    },

    // The user's email address
    // e.g. potus44@whitehouse.gov
    email: {
      type: 'string',
      email: true,
      required: false,
      unique: true
    },

    // The encrypted password for the member
    // e.g. asdgh8a249321e9dhgaslcbqn2913051#T(@GHASDGA
    encryptedPassword: {
      type: 'string',
      required: false
    },

    // url for gravatar
    gravatarUrl: {
      type: 'string'
    },

    // The timestamp when the the user last logged in
    // (i.e. sent a username and password to the server)
    lastLoggedIn: {
      type: 'date',
      required: false,
      defaultsTo: new Date(0)
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      return obj;
    }
  }
};

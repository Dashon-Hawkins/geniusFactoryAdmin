/**
 * parent.js
 *
 * @description :: parent: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 module.exports = {

  attributes: {

    email: {
      type: 'string',
      email: 'true',
      unique: 'true',
    },

    encryptedPassword: {
      type: 'string',
    },

    firstName: {
      type: 'string',
      required: 'true',
    },

    lastNameInitial: {
      type: 'string',
      required: 'true',
    },

    city: {
      type: 'string',
      required: 'true',
    },

    state: {
      type: 'string',
      required: 'true',
    },

    zipCode: {
      type: 'integer',
      required: 'true',
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

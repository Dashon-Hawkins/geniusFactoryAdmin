/**
 * student.js
 *
 * @description :: STUDENT: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 //This is the student model when they are signing up.

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
             type: 'string'
           },

        lastNameInitial: {
             type: 'string'
           },

        age: {
             type: 'integer'
           },

        grade: {
             type: 'integer'
           },

        subject: {
             type: 'string'
           },

        id: {
           type: 'integer',
           autoIncrement: 'true',
           primaryKey: 'true',
           unique: 'false'
           }

      }
 };

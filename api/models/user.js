'use strict';
module.exports =  function(sequelize, DataTypes) {
  var User     =  sequelize.define('User', {
    username               : DataTypes.STRING,
    email                  : DataTypes.STRING,
    password               : DataTypes.STRING,
    reset_password_token   : DataTypes.STRING,
    reset_password_sent_at : DataTypes.Date
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Post);
      }
    }
  });
  return User;
};

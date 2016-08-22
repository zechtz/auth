'use strict';
module.exports =  function(sequelize, DataTypes) {
  var Post     =  sequelize.define('Post', {
    title   : DataTypes.STRING,
    content : DataTypes.TEXT,
    UserId  : DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Post.belongsTo(models.User);
      }
    }
  });
  return Post;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commentText: DataTypes.STRING
  });
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Ticket, {
      foreignKey: 'ticketId'
    })
  };
  return Comment;
};
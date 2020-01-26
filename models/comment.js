'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    title: DataTypes.STRING
  });
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Ticket, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE'
    })
  };
  return Comment;
};
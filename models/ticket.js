'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Ticket.associate = function(models) {
    // associations can be defined here
    Ticket.belongsTo(models.User, {
      foreignKey: "userId"
    })
    Ticket.hasMany(models.Comment, {
        foreignKey: "ticketId",
        as: "comments",
    });
  };
  return Ticket;
};
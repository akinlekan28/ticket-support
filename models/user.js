"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpire: {
      type: DataTypes.DATE
    },
    isDelete: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Ticket, {
      foreignKey: "userId",
      as: "tickets",
      onDelete: 'CASCADE'
    });
  };
  return User;
};

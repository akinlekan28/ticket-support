'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

    return queryInterface.bulkInsert("Users", [
      {
        name: "John Doe",
        email: "johndoe@gmail.com",
        role: "admin",
        password:
          "$2b$10$/gIZ2TMykFwzS9ePKAWw4OYMyNhVabVq9.N1IZhlm.Ahv2JpX1CWG",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Scott Brown",
        email: "Scotbee@gmail.com",
        role: "user",
        password:
          "$2b$10$/gIZ2TMykFwzS9ePKAWw4OYMyNhVabVq9.N1IZhlm.Ahv2JpX1CWG",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Leanne Graham",
        role: "user",
        email: "Sincere@april.biz",
        password:
          "$2b$10$/gIZ2TMykFwzS9ePKAWw4OYMyNhVabVq9.N1IZhlm.Ahv2JpX1CWG",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Ervin Howell",
        role: "admin",
        email: "Shanna@melissa.tv",
        password:
          "$2b$10$/gIZ2TMykFwzS9ePKAWw4OYMyNhVabVq9.N1IZhlm.Ahv2JpX1CWG",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Patricia Lebsack",
        role: "user",
        email: "Julianne.OConner@kory.org",
        password:
          "$2b$10$/gIZ2TMykFwzS9ePKAWw4OYMyNhVabVq9.N1IZhlm.Ahv2JpX1CWG",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Edward Snowden",
        role: "user",
        email: "Snowden@gmail.com",
        password:
          "$2b$10$/gIZ2TMykFwzS9ePKAWw4OYMyNhVabVq9.N1IZhlm.Ahv2JpX1CWG",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */

    return queryInterface.bulkDelete("Users", null, {});
  }
};

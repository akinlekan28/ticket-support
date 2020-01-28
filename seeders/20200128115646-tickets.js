'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

     return queryInterface.bulkInsert("Tickets", [
       {
         title: "Lorem, ipsum.",
         description:
           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, exercitationem ad numquam maiores eligendi dolor!",
         userId: 1,
         tag: "Tick-HFIFN",
         status: 0,
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         title: "ipsum dolor.",
         description:
           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consectetur velit nisi.",
         userId: 2,
         tag: "Tick-HFIJD",
         status: 0,
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         title: "nesciunt quas odio",
         description:
           "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
         userId: 4,
         tag: "Tick-URRLU",
         status: 0,
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         title: "dolor sit.",
         description:
           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam molestiae est dolores veritatis.",
         userId: 5,
         tag: "Tick-AXBDD",
         status: 0,
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         title: "consectetur adipisicing.",
         description:
           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, provident nam quos iusto vero pariatur architecto assumenda.",
         userId: 4,
         tag: "Tick-OUYRI",
         status: 1,
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         title: "dolor sit muci kai.",
         description:
           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam molestiae est dolores veritatis.",
         userId: 3,
         tag: "Tick-YRWEE",
         status: 1,
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         title: "Karma.",
         description:
           "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto.",
         userId: 3,
         tag: "Tick-SCWGF",
         status: 1,
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         title: "dolorem eum magni eos aperiam quia",
         description:
           "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
         userId: 1,
         tag: "Tick-SMLDJ",
         status: 1,
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

    return queryInterface.bulkDelete("Tickets", null, {});
  }
};

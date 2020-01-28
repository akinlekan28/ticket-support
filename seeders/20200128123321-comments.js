'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

    return queryInterface.bulkInsert("Comments", [
      {
        ticketId: "3",
        commentText:
          "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ticketId: "5",
        commentText:
          "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ticketId: "2",
        commentText:
          "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ticketId: "4",
        commentText:
          "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ticketId: "1",
        commentText:
          "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ticketId: "3",
        commentText:
          "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ticketId: "5",
        commentText:
          "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ticketId: "1",
        commentText:
          "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ticketId: "2",
        commentText:
          "sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus",
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

    return queryInterface.bulkDelete("Comments", null, {});
  }
};

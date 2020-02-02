1) To use this application, unzip the folder and run the following commands sequentially(make sure you're using the latest version of nodejs)
Make sure mysql server is running before proceeding with the steps below

2) >>>'npm run setup' to install dependencies and create db
   >>>'npm run app' to run the app
   >>>'npm run post-setup' to run db migration and seeds

To run tests
   >>>'npm run test'

3) Basically, it's a support ticket management system and the primary operations involves users being able to create tickets, for this to be achievable the users must be registered and authenticated on the platform, whenever a ticket is being created, a unique tag must be generated for quick references to the tickets such that different adminstrators can attend to several tickets or pickup the conversation where it left off with the ticket tag. Since there's time constraint on this project, i used the same admin interface for both the users and the adminstrators thereby controlling the flow of information based on the role of the current logged user.

4) The requirement not covered is the testing of the frontend

5) Following the first two instructions is enough to get the project started

6) Race against time and not to overengineer, having to learn and build at the same time with sequelize ORM

7) While the user interface is functional, it can be greatly improved, name of commenters can be documented to distinguished ticket comments


**********
Github link
https://github.com/akinlekan28/ticket-support

Api Documentation link
https://documenter.getpostman.com/view/2914374/SWTAAyQj?version=latest
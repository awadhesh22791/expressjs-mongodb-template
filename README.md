# Express js template project.
## The project is developed as a template for fast developement purpose.
Technology stack is as follows:
1. Express Js
2. Node Js

The project is developed as starter project with basic layouts.
### Code design aspect
Codebase is designed in layered structures with flow described below:
Controller -> Validator (optional) -> Service -> Dao
Each layer have defined tasks.
1. Controller:- Interface the client request and send data to core of system.
2. Validator:- This layer is optional mainly concentrated around data validation before passing data for further process.
4. Service:- This layer is heart and sole of application. All the business logics reside here. We can use services in service.
5. Dao:- This layer is responsible to store data in database.

This is not a mandatory flow but it is advisable to follow the designed path.
Here main focus point is DAO layer which is implemented as per repository pattern. According to which all DB operations related to one table should be on one repository code file. DAO layer uses mongodb as persistence technology.

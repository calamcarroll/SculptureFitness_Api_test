# Assignment 1 - API testing and Source Control.

Name: Calam Carroll

## Overview.

...... A statement of the API's context and objectives (a paragraph)........

## API endpoints.

app.get('/users',ClientUsers.getAllUsers );  ---Returns all Users in the database
app.get('/users/:id', ClientUsers.findOneUser);---Returns only one users with the specified ID
app.post('/users', ClientUsers.addUser);  -= Allows a user to add a user to the database
app.delete('/users/:id', ClientUsers.deleteUser); --Allows a user to delete a user
app.put('/users/:id', ClientUsers.updateUserInfo); -- Allows a user to update user information

app.get('/programs', ClientPrograms.findAllPrograms); --Returns all program
app.get('/programs/:id', ClientPrograms.findOneProgram); --Returns only one program
app.get('/programs/:id/:MuscleType', ClientPrograms.findByType);-- Returns all programs related to the muscle type passed in
app.post('/programs', ClientPrograms.addProgram); -- Allows a user to add a program to the databse

app.delete('/programs/:id', ClientPrograms.deleteProgram);n -- Allows a user to delete a program
app.delete('/programs', ClientPrograms.clearAllPrograms); -- Clears all programs from the database

app.put('/programs/:id/Weight', ClientPrograms.incrementWeight); --Increments the weight of the program by 2kg
app.put('/programs/:id', ClientPrograms.updateProgram); --Updates the program by the id that is passed in



## Data storage.
 There are two schemas for the databse. These are Programs.js and users.js. 
 Programs holds all information on the programs added
 Users holds all information on the users added 

 Schema for Programs.js

 var ProgramSchema = new mongoose.Schema({
    MuscleType: String,
    ExerciseName: String,
    Sets: Number,
    Reps: Number,
    RestTime: Number,
    Weight: Number

});

Schema for Users.js 

var UsersSchema = new mongoose.Schema({
    Username: String,
    fName: String,
    lName: String,
    Email: String,
    Weight: Number,
    Height: Number,
    BodyFat: Number

});

## Sample Test execution.
## Test for ClientPrograms results

 C:\Web Applications Development\Agile_Test_Sculpture_Fitness>mocha test/routes/Programs_Api_test.js


  Programs
    POST /Programs
Connected to programsdb
Connected to usersdb
POST /programs 200 23.510 ms - 172
      √ should return confirmation message and add a program (46ms)
    GET /programs
GET /programs 200 10.273 ms - 265
      √ should return all the programs
GET /programs/59f1e69dd0ae514f10a24a82 200 3.103 ms - 134
      √ should return one program
GET /programs/59f1e69dd0ae514f1 404 2.568 ms - 265
      √ Should error and return a message if the program is not found
GET /programs/id/Legs 200 2.966 ms - 265
      √ should return programs related to that muscle type
    PUT /Programs/:id/Weight
PUT /Programs/59f1e69dd0ae514f10a24a82/Weight 200 10.200 ms - 180
      √ should display a message when weight has been added to program
PUT /Programs/5a004a0f7571632e24e1a/Weight 404 0.715 ms - 33
      √ should return a 404 status and message for invalid program ID
    PUT /Programs/:id/
PUT /Programs/59f1e69dd0ae514f10a24a82 200 9.917 ms - 179
      √ should display a message when the program has been updated
    DELETE/Programs/:id
DELETE /Programs/59f1e69dd0ae514f10a24a82 200 7.168 ms - 30
      √ should delete a program with the ID passed in
DELETE /Programs/59f1e69dd0ae514 404 0.891 ms - 34
      √ should error and display a message when an invalid id is passed in
    DELETE/Programs
DELETE /Programs 200 1.493 ms - 35
      √ Clear the collection of all programs


  11 passing (298ms)

##Test for ClientUsers.js  results


C:\Web Applications Development\Agile_Test_Sculpture_Fitness>mocha test/routes/Users_Api_test.js


  Users
    POST /Users
Connected to programsdb
Connected to usersdb
POST /Users 200 46.880 ms - 191
      √ should return confirmation message and add a user (93ms)
    GET /Users
GET /Users 200 32.953 ms - 345
      √ should return all the users (58ms)
GET /users/59f1e69dd0ae514f10a24a66 200 9.331 ms - 173
      √ should return one users
GET /users/59f1e69dd0 200 6.643 ms - 238
      √ should error when the users isnt found
    PUT /Users/:id/
PUT /Users/59f1e69dd0ae514f10a24a66 200 21.933 ms - 199
      √ should display a message when the user has been updated
    DELETE/Users/:id
DELETE /users/59f1e69dd0ae514f10a24a68 200 7.334 ms - 27
      √ should delete a user with the ID passed in


  6 passing (402ms)
  
##tests for database results 


C:\Web Applications Development\Agile_Test_Sculpture_Fitness>mocha test/routes/Database_test.js


  Database Tests
Connection successful!
    Test Database
(node:5220) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
      √ Should save a new program to the database
      √ Should error when a program with the wrong fields is saved to the db
      √ Should retrieve a program from the data base


  3 passing (115ms)




[ Markdown Tip: By indenting the above listing, GitHub will display it in a 'box' and preserve any formatting.]

## Extra features.
. . . . Briefly state and extra features of your testing that you feel should be high-lighted . . . . .

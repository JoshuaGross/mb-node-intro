Node.js intro project(s)
========================
Notes:
------

To run: node assignment1.js
assignment1.js depends on helper.js, which is a file that contains a simple function that sends a response after a specified number of ms.

test/ contains a single file test.js. This tests the return codes and message body of the server created in assignment1.js.

To run part 5:
Start up mongod, which has a test database.
Run load.js to insert the 10,000 records.
To run the part 2, with mongod running, run streamFromDb.js, it will send the response as a list to localhost:8080.
To test, run streamFromDb.js, and then run Mocha -R spec testPart5.js. 
The email validator helper tests for common emails. 


Step 1: Git
-----------

For this project you will learn about the Git workflow that SpanDeX uses internally. 

First steps with Git:
[Install it and hook it up to Github](https://help.github.com/articles/set-up-git)
[Set up SSH keys](https://help.github.com/articles/generating-ssh-keys)

Step 2: Fork this project
-------------------------

Forks and pull requests are the main method of collaborating with code on SpanDeX. You should fork this project now, and you will send me a pull request on Github when you are done with the third assignment.

Step 3: Set up NPM
------------------

NPM is the Node Package Manager. It is awesome, and you will be using it a lot. If you run `npm install` now in this directory, NPM will look in `package.json` and install the listed dependencies. If you run `npm install -d`, NPM will also install "development dependencies". You will notice there are just two dependencies right now, express and expect.js.

Step 4: Mocha, Expect.js, Express
---------------------------------

Mocha is a unit testing framework. You can run mocha with `mocha -R spec` and it will run all the tests in the `tests/` directory. 

You should NOT install Mocha is a development dependency because Mocha should be install globally on your system. Run `npm install -g mocha`.

For this assignment, you should:

1. Write a very simple webserver using Express that responds to three paths:
  1. /hello -> outputs 'world' after waiting 1 second
  2. /world -> outputs 'hello' after waiting 1 second
  3. All other paths should return a 404 status with a body that says "404 File not found" after waiting 1 second
2. Write a Mocha test that requests these pages from your server and verifies the correctness of responses (result codes and the body text)
3. When you are finished, send me a pull request and I will review the code!

Step 5: Mongoose, async
-----------------------

This test is slightly more challenging. You are going to create a simple database of users and then simulate a script that builds a CSV file of all the users containing name and email. We actually do this very often at SpanDeX to generate up-to-date mailing lists, and recently had some issues scaling this script because of the size of our user database.

For this test you should install Mongoose (the most popular Node.js wrapper around MongoDB), and async (go check it out; it is a very popular way of dealing with asynchronous callbacks).

1. Write a script that populates the user database with 10,000 user records. You will have to construct this carefully or your Node process will become very slow or unresponsive. Email me if you need a hint.
2. Write a script that uses the "stream" feature of Mongoose to stream user records. You can choose to either print these records to a console, or program it as a server response, but the output should be a valid CSV either way (this is not a trick - just comma-separate name and email).
3. Write a Mocha test that verifies whatever output you have is a valid (has 10,000 records and each record is valid name,email or email,name)

Final Thoughts
==============

Feel free to send partial pull requests or email me if you have any questions!

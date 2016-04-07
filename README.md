# CS473 Project 1 - Documentation for Post it Up! Web Application
# Section 1, Team 4 - Thermodynamic Mistranslation

### Purpose: Build a social news voting site like Reddit or Hacker News

### I. Current functionality and non-functionality:

* Users can create accounts, login, and logout from client-side via Stormpath API
* The server can properly create and authenticate user credentials using Stormpath API
* Users must be logged in to vote on or post links. If not, an alert is shown telling them to login in order to continue
* Users can post and share links along with a short description title (Note: both a title description and a link are required as input in order to post)
* Users can vote up or vote down a link (Note: once a vote is cast, it cannot be undone)
* Posted links are sorted by latest time posted or by popularity in terms of vote count
* Each vote is tied to a specific user to prevent them from voting on that particular link more than once
* If a user attempts to cast the same vote on a link, an alert message will notify that they cannot vote again
* If a user successfully casts a vote, the vote will be shown as an increment in the vote count. (Note: a visual change in up or down arrow indicating a casted vote is currently not functional and needs to be added)
* Clicking on user profile (when logged in), social media buttons, privacy policy, and terms of use links do not carry out an action as intended


### II. JSON database structure:

1. “questions” an array of posts by users containing the following attributes:
  * “id” : an id that acts as a key to differentiate a particular post from all the other posts in the database
  * “title”: a short description of the link users are sharing
  * “link”: the actual website link that users post to the wall
  * “vote”: a counter that keeps track of the number of current votes
  * “users”: an array of user emails to keep track of which user voted on this post in order to prevent the same user from voting multiple times


### III. Installation and setup:

Required third party tools/libraries/modules:
* Node.js - [https://nodejs.org/api/]
> sudo apt-get install nodejs

* jQuery - [http://api.jquery.com/] - the web app utilizes a content delivery network but installing the jQuery library locally on the server is also an option

* Node package manager - [https://docs.npmjs.com/]
> sudo apt-get install npm

* Express - [http://expressjs.com/en/api.html]
> npm install express

* Json-Server - [https://github.com/typicode/json-server] - required for loading and storing back-end data
> npm install json-server

* Body parser middleware for Node.js - [https://github.com/expressjs/body-parser/blob/master/README.md]
> npm install body-parser

* Stormpath API for Express - [https://docs.stormpath.com/nodejs/express/latest/] - third party API that our server must connect to with a proper API key in order to carry out user management (i.e. account signups, logins, logout, etc)
> npm install express-stormpath

* Request - [https://www.npmjs.com/package/request] - allows for simple http calls to the JSON database server for a sorted object
> npm install request


### IV. Steps to execute web app:

1. Open a terminal window and cd in the home directory for the source code

2. Start json-server with the path to the database file, db.json.

> json-server db/db.json

3. Once it is up and running, an output message displaying the resources and the home page to the     database will be displayed in the terminal. By default the database can be accessed at [http://localhost:3000/]

4. Open a separate terminal window and again cd into directory containing source code

5. Run the server script using node.js

> node server.js

6. Once the server is up and successfully connects with stormpath API, it will display “Stormpath Ready” in the terminal.

7. Launch a web browser go to http://localhost:5000 to visit the home page

### V. The server-side code

Route descriptions:
* GET /checklogin - checks to make sure user is currently logged in

* GET /readpost - accesses the database and returns a JSON object that has its elements sorted by time posted (descending order)

* GET /readpopoularpost - accesses the database and returns a JSON object that has its elements sorted by number of votes (descending order)

* POST /addpost - receives a post request from the client and appends it to the database. Does NOT check to see if the same link has been posted previously. Therefore the web app allows for multiple postings of the same link.

* POST /incr - retrieves email of the user along with the ID of the post the user is voting on. Using the email it checks to see if the user has voted on this particular ID link in the past. If they have not, it increments the vote count of that particular link in the database, otherwise it returns a response message ‘201’ meaning they have already voted.

* POST /decr - retrieves email of the user along with the ID of post the user is voting on. Using the email it checks to see if the user has voted on this particular ID link in the past. If they have not, it decrements the vote count of that particular link in the database, otherwise it returns a response message ‘201’ meaning they have already voted.


### VI. The client-side code

Function descriptions:
* main( ) - sends a GET request to /checklogin. Adjusts the navigation bar accordingly depending on whether or not the user is logged in. After which it calls the functions showlatestposts( ) and showpopularposts( )

* showlatestposts( ) - sends a GET request to /readpost and retrieves a JSON object that has its elements sorted by time posted (descending order). Uses a for loop to parse through the data and appends the ID, vote count, title, and link along with corresponding HTML code to the HTML class ‘tm_displayposts’.

* showpopularposts( ) - sends a GET request to /readpopularpost and retrieves a JSON object that has its elements sorted by number of votes (descending order). Uses a for loop to parse through the data and appends the ID, vote count, title, and link along with corresponding HTML code to the HTML class ‘tm_displaypopularposts’.

* $(“#tm_post”).on(‘click’, callback function( ) ) - checks to make sure the user is logged in. If so, the function then pulls the post title and link from input fields on the home page. It then checks that the user enters both a title and a link before it sends them as a post to /addpost.

* $(“#tm_logoutlink”).on(‘click’, callback function( ) ) - logs the user out

* $(“.tm_displayposts”).delegate(‘#tm_voteup’, ‘click’, callback function( ) ) - the function parses the DOM tree to pull the ID of the post the user is voting on. A check is done to make sure the user is logged in, and if so it sends the ID and the user’s email as a post to /incr in order to increment the vote count. The callback function will alert the user know if they have already voted.

* $(“.tm_displayposts”).delegate(‘#tm_votedown’, ‘click’, callback function( ) ) - the function parses the DOM tree to pull the ID of the post the user is voting on. A check is done to make sure the u


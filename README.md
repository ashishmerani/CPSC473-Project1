
# CPSC473-Project1

CPSC473 Project 1 - Documentation for Post it Up! Web Application
Section 1, Team 4 - Thermodynamic Mistranslation

Purpose: Build a social news voting site like Reddit or Hacker News

I. Functionality:
Users can create accounts, login, and logout from client-side via Stormpath API
The server can properly create and authenticate user credentials using Stormpath API
Users must be logged in to vote on or post links
Users can post and share links along with a short description title
Users can vote up or vote down a link (Note: once a vote is cast, it cannot be undone)
Posted links are sorted by latest posted or by popularity in terms of vote count
Each vote is tied to a specific user to prevent them from voting on that particular link more than once
If a user attempts to cast the same vote on a link, an alert message will notify that they cannot vote again
If a user successfully casts a vote, the vote will be shown as an increment in the vote count. A change in up or down arrow indicating a casted vote is currently not functional and needs to be added.
If a user attempts to cast a vote, but is not logged in, they will be alerted that they need to be logged in

II. Database structure:
Will include drawing here…

III. Installation and setup:

Required third party tools/libraries/modules:
Node.js - https://nodejs.org/api/
sudo apt-get install nodejs
jQuery - http://api.jquery.com/ - the web app utilizes a content delivery network but installing the jQuery library locally on the server is also an option
Node package manager - https://docs.npmjs.com/
sudo apt-get install npm
Express - http://expressjs.com/en/api.html
npm install express
Json-Server - https://github.com/typicode/json-server - required for loading and storing back-end data
    npm install json-server
Body parser middleware for Node.js - https://github.com/expressjs/body-parser/blob/master/README.md
npm install body-parser
Stormpath API for Express - https://docs.stormpath.com/nodejs/express/latest/
npm install express-stormpath


IV. Steps to execute web app:
Open a terminal window and cd in the home directory for the source code
Start json-server with the path to the database file, db.json.
e.g.     json-server db/db.json
Once it is up and running, the database can be accessed at http://localhost:3000/
Open a separate terminal window and again cd into directory containing source code
Run the server script using node.js
e.g.     node server.js
Launch a web browser go to http://localhost:5000

V. Server-side code descriptions:
Routes:
/checkLogin - checks to make sure user is currently logged in
/readpost 
/readpopoularpost
/addpost
/incr
/decr

VI. Client-side code descriptions:
Functions:
main()
showlatestposts()
showpopularposts()
$(“#tm_post”).on(‘click’, callback function() )
$(“.tm_displayposts”).delegate(‘#tm_voteup’, ‘click’, callback function() )
$(“.tm_displayposts”).delegate(‘#tm_votedown’, ‘click’, callback function() )



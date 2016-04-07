// express-stormpath used for authentication of the users.
"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var stormpath = require("express-stormpath");
var request = require("request");
var app = express();
app.use(express.static(__dirname + "/"));


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.use(stormpath.init(app, {
    client: {
        apiKey: {
            id: "6G6UCTOJJWLBRUZ73PRX023I7",
             secret: "i9AIHgjlVBToIhYZX/DUA8fKq+TUgpDEGleQeK6FrgY"
        }
    },
     application: {
        href: "https://api.stormpath.com/v1/applications/3UXGpJ9k0hoGYhxR7SKLIv"
    },

    web: {
        register: {
            // after registering and logging in, the user will be redirected to /index.html
            nextUri: "/index.html"

        },
        me: {
      enabled: false // disabled self route so that user can not see contents of the JSON db. Route comes default with stormpath.
    }
    }
}));
app.on("stormpath.ready", function () {
    console.log("Stormpath Ready");
});

app.get("/checklogin", stormpath.getUser, function (req, res) {
    if (req.user) {
        res.send(req.user.email);
    } else {
        res.send("Not logged in");
    }
});

//For reading the post from db.json
app.get("/readpost", function (req, res) {

    request("http://localhost:3000/questions?_sort=views&_order=DESC", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(JSON.parse(body));
        }
    });
});

//For reading the popular post from db.json
app.get("/readpopularpost", function (req, res) {

    request("http://localhost:3000/questions?_sort=vote&_order=DESC", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(JSON.parse(body));
        }
    });


});

//For adding post
app.post("/addpost", function (req, res) {
    console.log("in server");
    var title = req.body.title;
    var link = req.body.link;
    var length;
    var data;
    var content;
    data = {
        "id": length + 1,
        "title": title,
        "link": link,
        "vote": 0,
        "users": []
    };

    console.log(data);
    request.post({
        url: "http://localhost:3000/questions",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) },
        function (err, httpResponse, body) {
            body = JSON.parse(body);
            res.send(body);
        });
});
//For incrementing vote count
app.post("/incr", function (req, res) {
    var id = req.body.id;
    var useremail = req.body.useremail;
    var content;
    var isVote = false;
    var ifExists = false;
    var responsemsg;
    var content_users;
    var data;

    request("http://localhost:3000/questions/" + id, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            content = JSON.parse(body);
            content_users = content.users;
            for (var j = 0; j < content_users.length; j++) {
                if (content_users[j]["email"] === useremail) {
                    isVote = true;
                }
            }
            if (!isVote) {
                content_users.push({
                    "email": useremail
                });
                content.vote += 1;
                data = {
                    "vote": content.vote,
                    "users": content_users
                };
                request({
                    url: "http://localhost:3000/questions/" + id,
                    method: "PATCH",
                    json: data
                }, function (err, httpResponse, body) {
                    console.log("successful");
                    responsemsg = "200";
                    res.end(responsemsg);
                });
            } else {
                responsemsg = "201";
                res.end(responsemsg);
            }
        }
    });
});

//For decrementing vote count
app.post("/decr", function (req, res) {
    var id = req.body.id;
    var useremail = req.body.useremail;
    var content;
    var isVote = false;
    var ifExists = false;
    var responsemsg;
    var content_users;
    var data;

    request("http://localhost:3000/questions/" + id, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            content = JSON.parse(body);
            content_users = content.users;
            for (var j = 0; j < content_users.length; j++) {
                if (content_users[j]["email"] === useremail) {
                    isVote = true;
                }
            }
            if (!isVote) {
                content_users.push({
                    "email": useremail
                });
                content.vote -= 1;
                data = {
                    "vote": content.vote,
                    "users": content_users
                };
                request({
                    url: "http://localhost:3000/questions/" + id,
                    method: "PATCH",
                    json: data
                }, function (err, httpResponse, body) {
                    console.log("successful");
                    responsemsg = "200";
                    res.end(responsemsg);
                });
            } else {
                responsemsg = "201";
                res.end(responsemsg);
            }
        }
    });
});


app.listen(5000, function () {
    console.log("Started on PORT 5000");
});

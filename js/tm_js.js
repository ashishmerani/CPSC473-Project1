// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
/*globals $:false */
"use strict";
// main function
function main() {
    $.get("/checklogin", function(data) {
        console.log(data);
        if (data === "Not logged in") {
            $("#tm_logoutlink").hide();
            $("#tm_useremail").hide();
        } else {
            $("#tm_loginlink").hide();
            $("#tm_signuplink").hide();
            $("#tm_useremail").text(data);
        }
    });
    showlatestposts();
    showpopularposts();
}


// function for showing latest post to the user.
function showlatestposts() {
    $.get("/readpost", function(data) {
        var tm_posts = data;
        for (var i = 0; i < tm_posts.length; i++) {
            var listitem = "<li class='list-group-item'><div class='row'><div class='col-xs-12 col-sm-1 col-sm-offset-1'><div><a class='btn' id='tm_voteup'><i class='fa fa-chevron-up fa-2x'></i></a></div><div class='votecount'><span id='tm_qid' hidden=''>" + tm_posts[i].id + "</span><strong><span id='tm_votes'>" + tm_posts[i].vote + "</span></strong></div><div><a class='btn' id='tm_votedown'><i class='fa fa-chevron-down fa-2x'></i></a></div></div><div class='col-xs-12 col-sm-10'><h4>" + tm_posts[i].title + "</h4><p><em><a href='" + tm_posts[i].link + "'>" + tm_posts[i].link + "</a></em></p></div></div></li>";
            $(".tm_displayposts").append(listitem);
        }
    });
}

// function for showing popular post to the user.
function showpopularposts() {
    $.get("/readpopularpost", function(data) {
        var tm_popularposts = data;
        for (var i = 0; i < tm_popularposts.length; i++) {
            var listitem = "<li class='list-group-item'><div class='row'><div class='col-xs-12 col-sm-2 col-sm-offset-1'><div class='votecount'><i class='fa fa-bolt fa-3x'></i>&nbsp;&nbsp;<span id='tm_qid' hidden=''>" + tm_popularposts[i].id + "</span><strong><span id='tm_votes'>" + tm_popularposts[i].vote + "</span></strong></div></div><div class='col-xs-12 col-sm-8'><h4>" + tm_popularposts[i].title + "</h4><p><em><a href='" + tm_popularposts[i].link + "'>" + tm_popularposts[i].link + "</a></em></p></div></div></li>";
            $(".tm_displaypopularposts").append(listitem);
        }
    });
}

$("#tm_post").on("click", function() {
    $.get("/checklogin", function(data) {
        console.log(data);
        if (data === "Not logged in") {
            $("#tm_alert").modal("show");
            $("#tm_showalertcontent").html("<strong>Kindly <a id='tm_loginlink' class='btn' href='/login'>Login</a> to continue !!!</strong> <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
        } else {
            $("#tm_loginalert").hide();
            var title;
            var link;
            title = $("#tm_title").val();
            link = $("#tm_link").val();
            if (title === "" || link === "") {
                $("#tm_loginalert").show();
                document.getElementById("tm_title").style.borderColor = "red";
                document.getElementById("tm_link").style.borderColor = "red";
                $("#tm_showalertcontent").html("<strong>Please enter a valid input.</strong> <button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button> ");
            } else {
                $.post("/addpost", {
                    title: title,
                    link: link
                }, function(data) {
                    console.log(data);
                    $("#tm_title").val("");
                    $("#tm_link").val("");
                    $(".tm_displayposts").empty();
                    $(".tm_displaypopularposts").empty();
                    showlatestposts();
                    showpopularposts();
                });
            }
        }
    });
});
// on click event post data to /logout
$("#tm_logoutlink").on("click", function() {
    $.post("/logout", function(data) {
        console.log(data);
        location.reload();
    });
});

// display post on vote up
$(".tm_displayposts").delegate("#tm_voteup", "click", function() {
    var qid = parseInt($(this).parent().siblings(".votecount").children("#tm_qid").text()); //question id
    var useremail = $("#tm_useremail").text(); //useremail

    var votes = parseInt($(this).parent().siblings(".votecount").children("#tm_votes").text());
    console.log(votes);
    $.get("/checklogin", function(data) {

        if (data === "Not logged in") {
            $("#tm_alert").modal("show");
        } else {
            $.post("/incr", {
                id: qid,
                useremail: useremail
            }, function(data) {
                if (data === "404") {
                    alert("User does not exist.");
                } else if (data === "200") {
                    $(".tm_displayposts").empty();
                    $(".tm_displaypopularposts").empty();
                    showlatestposts();
                    showpopularposts();
                } else if (data === "201") {
                    $("#tm_alert_voted").modal("show");
                }
            });
        }
    });
});

// display post on vote down
$(".tm_displayposts").delegate("#tm_votedown", "click", function() {
    var qid = parseInt($(this).parent().siblings(".votecount").children("#tm_qid").text()); //question id
    var useremail = $("#tm_useremail").text(); //useremail
    var votes = parseInt($(this).parent().siblings(".votecount").children("#tm_votes").text());
    console.log(votes);
    $.get("/checklogin", function(data) {
        if (data === "Not logged in") {
            $("#tm_alert").modal("show");
        } else {
            $.post("/decr", {
                id: qid,
                useremail: useremail
            }, function(data) {
                if (data === "404") {
                    alert("User does not exist.");
                } else if (data === "200") {
                    $(".tm_displayposts").empty();
                    $(".tm_displaypopularposts").empty();
                    showlatestposts();
                    showpopularposts();
                } else if (data === "201") {
                    $("#tm_alert_voted").modal("show");
                }
            });
        }
    });
});

$(document).ready(main);

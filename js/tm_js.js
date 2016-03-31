function main() {
    $.get("/checklogin", function(data){
       console.log(data);
        if(data === 'Not logged in'){
            $('#tm_logoutlink').hide();
            $('#tm_useremail').hide();
        }
        else{
            $('#tm_loginlink').hide();
            $('#tm_signuplink').hide();
            $('#tm_useremail').text(data);
        }
    });
    showlatestposts();

}

function showlatestposts(){
    $.get("/readpost", function(data){
            var tm_posts = JSON.parse(data);
			 for(i=0;i<tm_posts['questions'].length;i++)
			{
                var listitem = "<li class='list-group-item'><div class='row'><div class='col-xs-12 col-sm-1 col-sm-offset-1'><div><a class='btn' id='tm_voteup'><i class='fa fa-chevron-up fa-2x'></i></a></div><div class='votecount'><span id='tm_qid' hidden=''>" + tm_posts['questions'][i]['id'] + "</span><strong><span id='tm_votes'>" + tm_posts['questions'][i]['vote'] + "</span></strong></div><div><a class='btn' id='tm_votedown'><i class='fa fa-chevron-down fa-2x'></i></a></div></div><div class='col-xs-12 col-sm-10'><h3>" +tm_posts['questions'][i]['title']+"</h3><h4><em><a href='" +tm_posts['questions'][i]['link'] +"'>" +tm_posts['questions'][i]['link']+"</a></em></h4></div></div></li>";
				$(".tm_displayposts").append(listitem);
			}         
		 });
}

$("#tm_post").on('click', function(){
    $.get("/checklogin", function(data){
       console.log(data);
        if(data === 'Not logged in'){
            $("#tm_loginalert").show();
            $("#tm_showalertcontent").html('<strong>Kindly <a id="tm_loginlink" class="btn" href="/login">Login</a> to continue !!!</strong> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        }
        else{
            $("#tm_loginalert").hide();
            var title;
            var link;
            title = $("#tm_title").val().trim();
            link = $("#tm_link").val().trim();
            if(title == "" && link == ""){
                 $("#tm_loginalert").show();
                document.getElementById('tm_title').style.borderColor = "red";
                document.getElementById('tm_link').style.borderColor = "red";
                $("#tm_showalertcontent").html('<strong>Please enter a valid input.</strong> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> ');
            }
            else{
            $.post("/addpost", {title:title,link:link}, function(data){  
                $("#tm_title").val("");
	            $("#tm_link").val("");
                $(".tm_displayposts").empty();
                showlatestposts();
          });
            }
        }
    });
});

$("#tm_logoutlink").on('click',function(){
    $.post("/logout",function(data){
        location.reload();
    });
});

$(".tm_displayposts").delegate('#tm_voteup', 'click', function(){
    var qid = parseInt($(this).parent().siblings('.votecount').children("#tm_qid").text()); //question id
            var useremail =  $('#tm_useremail').text(); //useremail
			var votes = parseInt($(this).parent().siblings('.votecount').children("#tm_votes").text());
	$.get("/checklogin", function(data){		
    
        if(data === 'Not logged in'){
            console.log("Not Logged in");
            $("#tm_loginalert").show();   
        }
        else{
            $.post("/incr",{id: qid,useremail:useremail}, function(data){  
                if(data=='404'){
                    alert("User does not exist.");
                }
                else if(data =='200'){
				$(".tm_displayposts").empty();
                showlatestposts();
                }  
                else if(data =='201'){
                    alert("You have already voted.");
                }
          });
        }
    });
});

$(".tm_displayposts").delegate('#tm_votedown', 'click', function(){
			var qid = parseInt($(this).parent().siblings('.votecount').children("#tm_qid").text()); //question id
            var useremail =  $('#tm_useremail').text(); //useremail
			var votes = parseInt($(this).parent().siblings('.votecount').children("#tm_votes").text());
    $.get("/checklogin", function(data){
        if(data === 'Not logged in'){
            console.log("Not Logged in");
            $("#tm_loginalert").show();
        }
        else{
            $.post("/decr",{id: qid,useremail:useremail}, function(data){  
                if(data=='404'){
                    alert("User does not exist.");
                }
                else if(data =='200'){
					$(".tm_displayposts").empty();
                showlatestposts();
                }  
                else if(data =='201'){
                    alert("You have already voted.");
                }
          });
        }
    });
});

$(document).ready(main);
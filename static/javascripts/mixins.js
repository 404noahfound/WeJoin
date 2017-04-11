function setFollowButtonState(button){
	// console.log($(button).attr('followee'));
	$(button).children('div').hide();
	$(button).off("click");
	var followee = $(button).attr('followee');
	$.ajax({
        type: "POST",
        url: "/user/follow_actions",
        data: {followee_id: followee},
        dataType: "JSON",
        success: function(data){
        	if(data.hasFollow == 1){
        		$(button).children('div.followed').show();
        		$(button).removeClass('blue');
        		$(button).addClass('green');
        		$(button).click(function(){
        			$.post({
        				url: "/user/follow_actions",
        				data: {followee_id: followee, unfollow: 1},
        				success: function(){setFollowButtonState(button);}
        			});
        		});
        	} else {
        		$(button).children('div.unfollowed').show();
        		$(button).removeClass('green');
        		$(button).addClass('blue');
        		$(button).click(function(){
        			$.post({
        				url: "/user/follow_actions",
        				data: {followee_id: followee, follow: 1},
        				success: function(){setFollowButtonState(button);}
        			});
        		});
        	}
        }
      });
}

$(document).ready(function(){
	$('.follow.button').each(function(){
		// console.log(followee);
		setFollowButtonState(this);
	});
});
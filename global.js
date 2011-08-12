EB = {
	doorLeft : 0,
	minTime : 0,
	maxTime : 0,
	curTime : 0,

	sprite_offset : 0,
	SPRITE_WIDTH : 123,
	attendee_div : null,

	timeCheck : function() {
		for ( var i = 0; i < EB.attendees.length; i++) {
			if (EB.curTime < EB.attendees[i].checkin_date)
				break;

			if (!EB.attendees[i].checkedin)
				EB.checkinAttendee(i);
		}

		var checkin_date = new Date(parseInt(EB.curTime) * 1000);
		var hours = checkin_date.getHours();
		var amPm = hours < 12 ? " AM" : " PM";
		if (hours > 12)
			hours -= 12;
		var minutes = checkin_date.getMinutes();
		if (minutes < 10)
			minutes = "0" + minutes;
		$("#checkin_time").html(
				hours + ":" + minutes + amPm);
		if (EB.curTime < EB.maxTime) {
			// increment time by one minute
			EB.curTime += 60;
			window.setTimeout(EB.timeCheck, 1200);
		}
	},

	checkedIn : function() {
		var sndUrl = "Portal2_sfx_button_positive.m4r";
		var snd = new Audio(sndUrl);
		snd.play();
	},

	checkinAttendee : function(index) {
		EB.attendees[index].checkedin = true;
		var newLeft = EB.doorLeft + $("#attendee" + index).offset().left - 29;
		$("#attendee" + index).css('left', newLeft);
		$("#attendee" + index).addClass('checkingIn');
		$("#attendee" + index)
				.css('webkitTransitionDelay', Math.random() + "s");

		var full_name = EB.attendees[index].firstname + " "
				+ EB.attendees[index].lastname;
		$("#scroll_list").append(full_name + "<br/>");
		$("#scroll_list").attr( {
			scrollTop : $("#scroll_list").attr("scrollHeight")
		});
		var name_bubble = $('<div class="name_bubble">' + full_name + '</div>');
		$("#attendee" + index).prepend(name_bubble);
		var top = parseInt(name_bubble.css('top'), 10) - 50;
		name_bubble.css('opacity', 0);
		name_bubble.css('top', top);
		var waitTime = 500 * Math.random() + 9500;
		setTimeout(function() {
			$("#attendee" + index).removeClass('checkingIn');
			EB.checkedIn();
		}, waitTime);
	},

	init : function() {
		var str = '';
		EB.minTime = parseInt(EB.attendees[0].checkin_date, 10);
		EB.maxTime = parseInt(
				EB.attendees[EB.attendees.length - 1].checkin_date, 10);
		EB.curTime = EB.minTime;
		for ( var i = 0; i < EB.attendees.length; i++) {
			var x = 50;
			var y = 250;
			str += '<div id="attendee' + i
					+ '" class="attendee" style="margin-left: ' + x
					+ 'px; margin-top: ' + y + 'px"></div>';
		}
		$("#queue").html(str);
		EB.doorLeft = $("#door").offset().left;
		window.setTimeout(EB.timeCheck, 500);
		EB.animate();
	},

	doAnimate : function() {
		$(".checkingIn").css('background-position',
				EB.sprite_offset * EB.SPRITE_WIDTH + "px 0");
		EB.sprite_offset++;
		if (EB.sprite_offset > 6)
			EB.sprite_offset = 0;
	},

	animate : function() {
		requestAnimFrame(EB.animate);
		EB.doAnimate();
	}
};

$(document).ready(function() {
	EB.init();
});

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame || window.oRequestAnimationFrame
			|| window.msRequestAnimationFrame || function(callback) {
				window.setTimeout(callback, 60);
			};
})();
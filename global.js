EB = {
	currentAttendee : 0,
	doorLeft : 0,

	checkinAttendee : function() {
		var newLeft = EB.doorLeft + $("#attendee" + EB.currentAttendee).offset().left;
		$("#attendee" + EB.currentAttendee).css('left', newLeft);

		var checkin_date = new Date(
				parseInt(EB.attendees[EB.currentAttendee].checkin_date) * 1000);
		var hours = checkin_date.getHours();
		if (hours > 12)
			hours -= 12;
		var minutes = checkin_date.getMinutes();
		if (minutes < 10)
			minutes = "0" + minutes;
		var seconds = checkin_date.getSeconds();
		if (seconds < 10)
			seconds = "0" + seconds;
		$("#billboard").html(
				EB.attendees[EB.currentAttendee].firstname + " "
						+ EB.attendees[EB.currentAttendee].lastname + "<br/>" + hours
						+ ":" + minutes + ":" + seconds);
		if (EB.currentAttendee < EB.attendees.length - 1) {
			EB.currentAttendee++;
			window.setTimeout(EB.checkinAttendee, 500);
		}
	},

	init : function() {
		var str = '';
		for ( var i = 0; i < EB.attendees.length; i++) {
			var x = parseInt(190 * Math.random(), 10);
			var y = parseInt(190 * Math.random(), 10);
			str += '<div id="attendee' + i
					+ '" class="attendee" style="margin-left: ' + x
					+ 'px; margin-top: ' + y + 'px"></div>';
		}
		$("#queue").html(str);
		EB.doorLeft = $("#door").offset().left;
		window.setTimeout(EB.checkinAttendee, 500);
	}
};

$(document).ready(function() {
	EB.init();
});
$.fn.serializeObject=function(){"use strict";var a={},b=function(b,c){var d=a[c.name];"undefined"!=typeof d&&d!==null?$.isArray(d)?d.push(c.value):a[c.name]=[d,c.value]:a[c.name]=c.value};return $.each(this.serializeArray(),b),a};



$(document).ready(function(){

	$('.loginLoginForm').submit(function(e) {
		console.log($(this));
		console.log($(this).serializeObject());

		var form_data = $(this).serializeArray();
		
  		$.ajax({
			type: "POST",
			dataType: "html",
            cache: false,
			url: '/MP3/api/user/ajaxlogin/',
			data: form_data,
			success: function(data){
				console.log(typeof data);
				try {
					console.log(typeof $.parseJSON(data));
					console.log($.parseJSON(data));
				} catch (e){
					console.log('User bereits eingeloggt');
				}
			}
		});
		e.preventDefault();
	});

});
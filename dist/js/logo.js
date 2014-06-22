$(document).ready(function() {
	var typeWritter = function() {
		var time = 200;
		var letters = $('.logo h1 span');
		for (var i = 0, l = letters.length; i < l; i++) {
			setTimeout(function(letter) {
				$(letter).removeClass('hidden-object');
			}, time * i, letters[i]);
		}
		setTimeout(function() {
			$('.logo .lead').removeClass('hidden-object');
			$('.masthead').removeClass('hidden-object');
		}, time * letters.length);

	};

	var version = 'v' + (Math.ceil(Math.random() * 4));
	$('body').addClass(version).fadeIn(function() {
		typeWritter();
	});

});


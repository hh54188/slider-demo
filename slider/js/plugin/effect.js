window.app = window.app || {};
app.effect = {};
(function (global) {
	global.initBlur = function (e) {
		$('.focus').live('click', function () {
			$(this).removeClass('focus').addClass('lack-focus');
			$('.focus').addClass('blur');
		})
	}

	global.removeBlur = function () {
		$('.lack-focus').live('click', function () {
			$('.blur').removeClass('blur');
			$(this).removeClass('lack-focus').addClass('focus');
		})
	}
})(app.effect);

app.effect.initBlur();
app.effect.removeBlur();
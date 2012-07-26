window.App = window.App || {};
window.App.Text = window.App.Text || {};
window.App.View = window.App.View || {};

(function (global) {
	global.showTextByIndex = function (wrap, index) {
		var $texts = wrap.find('.text[data-index="' + index + '"]');
		if ($texts.length == 0) return;
		$texts.each(function () {
			var effect = $(this).data('effect');
            $(this).addClass('text-' + effect + '-show').removeClass('text-' + effect + '-hide');
		})
	};

	global.initText = function (wrap) {
		var $texts = wrap.find('.text');
		$texts.each(function () {
			//init effect
			var effect = $(this).data('effect');
			if (effect) {
				$(this).addClass('text-' + effect + '-hide');	
			}
		});
	};
})(App.Text);
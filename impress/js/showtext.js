window.App = window.App || {};
window.App.Text = window.App.Text || {};

(function (global) {
	global.showTextByIndex = function (wrap, index) {
		var $texts = wrap.find('.text[data-index="' + index + '"]');
		if ($texts.length == 0) return;
		$texts.each(function () {
			var effect = $(this).data('effect');
            $(this).addClass('text-' + effect + '-show').removeClass('text-' + effect + '-hide');
		})
	};

	global.nextTextIndex = function (wrap, cur) {
		var cur = cur +1;
		var max = Config.stepIndex.max;
		//如果已经超过最大
		if (cur > max) return;
		//如果这一级没有,递归查找
		var $texts = wrap.find('.text[data-index="' + index + '"]');
		if ($texts.length == 0) {
			this.nextTextIndex(wrap, cur);
		} else {
			this.showTextByIndex(wrap, cur);
		}
	};
})(App.Text);
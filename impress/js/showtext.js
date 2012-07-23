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

	global.nextTextIndex = function (wrap, cur) {
		var cur = cur +1;
		var max = Config.stepIndex.max;
		//如果已经超过最大
		if (cur > max) {
			var steps = App.View.getNextStep();
            App.View.setStep(steps.cur, steps.prev); 
			return;
		}
		//如果这一级没有,递归查找
		var $texts = wrap.find('.text[data-index="' + cur + '"]');
		if ($texts.length == 0) {
			this.nextTextIndex(wrap, cur);
		} else {
			Config.stepIndex.cur = cur;
			this.showTextByIndex(wrap, cur);
		}
	};

	global.findMaxIndex = function (wrap) {
		//reset init index
		Config.stepIndex.cur = 0;

		var $texts = wrap.find('.text');
		var max = 0;
		$texts.each(function () {
			var index = $(this).data('index');
			//init effect
			var effect = $(this).data('effect');
			if (effect) {
				$(this).addClass('text-' + effect + '-hide');	
			}
            
			if (index > max) { 
				max = index;
			}
		});

		Config.stepIndex.max = max;
	}
})(App.Text);
window.App = window.App || {};
window.App.Manage = window.App.Manage || {};
window.App.View = window.App.View || {};
window.App.Text = window.App.Text || {};

(function (global) {
	global.config = {
		'isExecute': false,
		'stepIndex': {
			'cur': 0,
			'max': 0
		}
	}

	global.setCfgProp = function (prop, val) {
		prop = val;
	}

	global.enableExecute = function () {
		this.config.isExecute = true;
	}

	global.disableExecute = function () {
		this.config.isExecute = false;
	}

	global.go = function () {
		this.enableExecute();
		var cur = this.config.stepIndex.cur;
		var max = this.config.stepIndex.max;		

		//如果是第一幅ppt || 或者切换到下一幅
		if ($('.cur').prop('id') == "overview" || cur >= max) {			
			//获取当前步骤
			var steps = this.getNextStep();
			//初始化文字
			App.Text.initText(steps.cur);
			//重新配置cur and max
			this.setStepIndex(steps.cur);
			//初始化下一幅
			App.View.setStep(steps.cur, steps.prev);
			return;
		} 

		//如果本页还没有执行完
		if (cur < max) {
			if (this.getNextTextIndex($('.cur'))) {
				App.Text.showTextByIndex($('.cur'), this.config.stepIndex.cur);
			}
		}

		this.disableExecute();
	}

	global.setStepIndex = function (wrap) {
		var cur = this.config.stepIndex.cur;
		var max = this.config.stepIndex.max;
		cur = 0;
		max = 0;

		var $texts = wrap.find('.text');
		var _this = this;
		$texts.each(function () {
            var index = $(this).data('index');
            if (index) {
				if (index > max) { 
					_this.config.stepIndex.max = index;
					max = index;
				}            	
            }
		});		

		console.log('inner cur: %s max: %s', cur, max);
		console.log('really cur: %s max: %s', this.config.stepIndex.cur, this.config.stepIndex.max);
	}

	global.getNextTextIndex = function (wrap) {
		var max = this.config.stepIndex.max;
		this.config.stepIndex.cur = this.config.stepIndex.cur + 1;
		var cur = this.config.stepIndex.cur;
		if (cur > max) {
			return false;
		}
		var $texts = wrap.find('.text[data-index="' + cur + '"]');
		if ($texts.length == 0) {
			this.getNextTextIndex(wrap);
		} else {
			return true;
		}
	}

    global.getNextStep = function () {
        var $steps = $('.step');
        var steps = {};

        //如果还没有开始阅读
        if ($('.cur').next().length == 0) {
            $('.prev').removeClass('prev');
            $('.cur').removeClass('cur');

            $('.step:first').addClass('cur');
            $('.step:last').addClass('prev');
        } else {
            var temp = $('.cur');
            $('.prev').removeClass('prev');
            $('.cur').removeClass('cur');

            temp.next().addClass('cur');
            temp.addClass('prev');
        }

        steps = {
            "cur": $('.cur'),
            "prev": $('.prev')
        }

        return steps;
    }	

})(App.Manage)
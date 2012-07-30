window.App = window.App || {};
window.App.Text = window.App.Text || {};
window.App.View = window.App.View || {};
window.App.Manage = window.App.Manage || {};

(function (global) {
	var toNumber = function (val, def) {
		return isNaN(val)?def: val;
	}
	var collectCanvasData = function (el) {
    	var dataSet = el.data();
	    var step = {
            translate: {
                x: toNumber(dataSet.x, Config.StepView.x) * (-1),
                y: toNumber(dataSet.y, Config.StepView.y) * (-1),
                z: toNumber(dataSet.z, Config.StepView.z) * (-1)
            },
            rotate: {
                x: toNumber(dataSet.rotatex, Config.StepView.rotateX) * (-1),
                y: toNumber(dataSet.rotatey, Config.StepView.rotateY) * (-1),
                z: toNumber(dataSet.rotatez, Config.StepView.rotateZ) * (-1)
            },
            scale: 1 / (Config.StepView.scale * dataSet.scale)
    	}

    	return step;
    };

    var cssRotate = function ( r, revert ) {
        var rX = " rotateX(" + r.x + "deg) ",
            rY = " rotateY(" + r.y + "deg) ",
            rZ = " rotateZ(" + r.z + "deg) ";

        return revert ? rZ+rY+rX : rX+rY+rZ;
    };

	global.showTextByIndex = function (wrap, index) {
		var $texts = wrap.find('.text[data-index="' + index + '"]:not(.readed)');


		if ($texts.length == 0) {
			App.Manage.disableExecute();
			return;
		}

		$texts.each(function () {
			var effect = $(this).data('effect');
            $(this).addClass('text-' + effect + '-show').removeClass('text-' + effect + '-hide').removeClass('text-bg').addClass('text-readed');

            var step = collectCanvasData($(this));
            $(this)[0].style.WebkitTransform = cssRotate(step.rotate);  
		})
		//结束执行
		App.Manage.disableExecute();
	};

	global.initText = function (wrap) {
		var $texts = wrap.find('.text');
		$texts.each(function () {
			//init effect
			if ($(this).hasClass('readed')) return;
			var effect = $(this).data('effect');
			if (effect) {
				$(this).addClass('text-' + effect + '-hide');	
			}

			var step = collectCanvasData($(this));
            $(this)[0].style.WebkitTransform = cssRotate(step.rotate);  
		});
	};
})(App.Text);
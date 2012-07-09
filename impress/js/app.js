window.App = window.App || {};
window.App.View = window.App.View || {};

(function (global) {
	global.computeWindowScale = function (config) {
	    var hScale = window.innerHeight / config.height;
        var wScale = window.innerWidth / config.width;
        scale = hScale > wScale ? wScale : hScale;
        
        if (config.maxScale && scale > config.maxScale) {
            scale = config.maxScale;
        }
                
        if (config.minScale && scale < config.minScale) {
            scale = config.minScale;
        }
        
        return scale;
	}
        
	global.resizeCanvas = function (scale) {

	}

	global.initCanvas = function () {
		var scale = this.computeWindowScale(Config.ViewPort);

        $('#camera-zoom')[0].style.WebkitPerspective  = Config.ViewPort.perspective/scale + "px";
        $('#camera-zoom')[0].style.WebkitTransform = "scale(" + scale + ")";
	}

	global.initStep = function () {
		var steps = $('.step') //jQuery cache
		var stepCount = steps.length;
		var width = Config.StepView.width;
		var height = Config.StepView.height;

		steps.each(function () {
			$(this).css({
            	'top': "-=" + (height / 2) + "px",
            	'left': "-=" + (width / 2) + "px"
        	})

        	var dataSet = $(this).data();

        	var minCanvasWidth =  Config.ViewPort.width > Config.ViewPort.height ? Config.ViewPort.height : Config.ViewPort.width;
        	var maxStepWidth =  Config.StepView.width > Config.StepView.height ? Config.StepView.width : Config.StepView.height;

        	var eachWidth = parseFloat(minCanvasWidth)  / (stepCount);
        	var eachScale = eachWidth / maxStepWidth;

        	Config.ViewPort.stepScale = eachScale;
        	var scale = dataSet.scale * eachScale;

        	$(this)[0].style.WebkitTransform = "translate3D(" + dataSet.x + "px, " + dataSet.y + "px, 0px) scale(" + scale + ")";
		})
	}

	global.setStep = function (el) {
		var dataSet = el.data();
		var target = {
			x: dataSet.x * (-1),
			y: dataSet.y * (-1)
		}

		$("#camera-move")[0].style.WebkitTransform = "translate(" + target.x + "px, " + target.y + "px)";
	}
})(App.View)
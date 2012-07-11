window.App = window.App || {};
window.App.View = window.App.View || {};

(function (global) {
	var toNumber = function (val, def) {
		return isNaN(val)?def: val;
	}

	var calculateScale = function (def, val) {
		if (val == undefined) {
			return def
		} else {
			return val * def;
		}
		
	}

    var cssTranslate = function ( t ) {
        return " translate3d(" + t.x + "px," + t.y + "px," + t.z + "px) ";
    }

    var cssRotate = function ( r ) {
        var rX = " rotateX(" + r.x + "deg) ",
            rY = " rotateY(" + r.y + "deg) ",
            rZ = " rotateZ(" + r.z + "deg) ";
        
        return rX+rY+rZ;
    };

    var cssScale = function ( s ) {
        return " scale(" + s + ") ";
    };

    var cssStep = function (el, step) {
    	el[0].style.WebkitTransform = cssTranslate(step.translate) + cssRotate(step.rotate) + cssScale(step.scale);
    }

    var collectStepData = function (el) {
    	var dataSet = el.data();
	    var step = {
            translate: {
                x: toNumber(dataSet.x, Config.StepView.x),
                y: toNumber(dataSet.y, Config.StepView.y),
                z: toNumber(dataSet.z, Config.StepView.z)
            },
            rotate: {
                x: toNumber(dataSet.rotatex, Config.StepView.rotateX),
                y: toNumber(dataSet.rotatey, Config.StepView.rotateY),
                z: toNumber(dataSet.rotatez, Config.StepView.rotateZ)
            },
            scale: calculateScale(Config.StepView.scale, dataSet.scale)
    	}

    	return step;
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
    }

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
        this.initCanvas();
	}

	global.initCanvas = function () {
		var scale = this.computeWindowScale(Config.ViewPort);
        console.log('scale', scale);
        Config.ViewPort.stepScale = scale;

        $('#camera-zoom').bind('webkitTransitionEnd', function () {
             
        });
        // $('#camera-zoom')[0].addEventListener( 'webkitTransitionEnd', function( e ) { 
        //     console.log( "Finished transition!" ); 
        // }, false );

        $('#camera-zoom')[0].style.WebkitPerspective  = Config.ViewPort.perspective/scale + "px";
        $('#camera-zoom')[0].style.WebkitTransform = "scale(" + scale + ")";

        // $('#camera-move')[0].style.WebkitPerspective  = Config.ViewPort.perspective/scale + "px";
        // $('#camera-move')[0].style.WebkitTransform = "scale(" + scale + ")";
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
        	var minCanvasWidth =  Config.ViewPort.width > Config.ViewPort.height ? Config.ViewPort.height : Config.ViewPort.width;
        	var maxStepWidth =  Config.StepView.width > Config.StepView.height ? Config.StepView.width : Config.StepView.height;

        	var eachWidth = parseFloat(minCanvasWidth)  / (stepCount);
        	var eachScale = eachWidth / maxStepWidth;

        	Config.StepView.scale = eachScale;

        	cssStep($(this), collectStepData($(this)));
		})
	}

    global.stepByStep = function () {
        var viewPortScale = parseFloat(Config.ViewPort.stepScale);
        var viewMaxScale = parseFloat(Config.ViewPort.maxScale);

        var targetScale = (viewMaxScale - viewPortScale) / 2.0 + viewPortScale;
        var targetTrans = "scale(" + targetScale + ")";
        $("#camera-zoom")[0].style.WebkitTransform = targetTrans;
        el[0].style.WebkitTransitionDuration = Config.ViewPort.transitionDuration + "ms";
        // el[0].style.WebkitTransitionDelay = delay + "s";
    }

	global.setStep = function (el, past) {
        var step = collectCanvasData(el);
        var pastStep = collectCanvasData(past);

        var viewPortScale = parseFloat(Config.ViewPort.stepScale);
        var viewMaxScale = parseFloat(Config.ViewPort.maxScale);
        //zoom out scale
        var scaleReview = (pastStep.scale / 2.0);

        //step fn
        var zoomOut = function () {
            $("#camera-move")[0].style.WebkitTransform = "scale(" + scaleReview + ")" + cssTranslate(pastStep.translate);
        }

        var move = function () {
            $("#camera-move")[0].style.WebkitTransform = "scale(" + scaleReview + ")" + cssTranslate(step.translate);   
        }

        var zoomIn = function () {
            $("#camera-move")[0].style.WebkitTransform = cssScale(step.scale) + cssTranslate(step.translate);      
        }

        var rotate = function () {
            $("#camera-move")[0].style.WebkitTransform = cssScale(step.scale) + cssTranslate(step.translate) + cssRotate(step.rotate);
        }

        var duration = parseInt(Config.ViewPort.transitionDuration);
        zoomOut();

        setTimeout(function () {
            move();
        }, duration)

        setTimeout(function () {
            zoomIn();
        }, duration * 2);

        setTimeout(function () {
            rotate();
        }, duration * 3);
	}

    global.simpleSetStep = function (el) {
        var step = collectCanvasData(el);
        var viewPortScale = parseFloat(Config.ViewPort.stepScale);
        var viewMaxScale = parseFloat(Config.ViewPort.maxScale);

        var targetScale = (viewMaxScale - viewPortScale) / 2.0 + viewPortScale;
        var targetTrans = "scale(" + targetScale + ")";
        $("#camera-move")[0].style.WebkitTransform = cssScale(step.scale) + cssTranslate(step.translate) + cssRotate(step.rotate);
    }
})(App.View)
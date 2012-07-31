window.SliderView = Backbone.View.extend({
    turnCurIndex: function (index, total) {
        var step = parseInt(100 / (total - 1));
        $('#slider-control').slider( "value" , (index - 1) * step );
    },
    showControl: function () {
    	$('#slider-control').css('opacity', 1);
    },
    hideControl: function () {
		$('#slider-control').css('opacity', 0);
    }
})
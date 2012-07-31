window.PageView = Backbone.View.extend({
	flipForward:function () {
    	var present = $('.present');
        var next = present.next();
        var prev = present.prev();

        if (next.length !=0 ) {
            present.removeClass('present').addClass('past');
            next.removeClass('future').addClass('present');
        }
        if (configModel.isThumb() == 1) {
        	var portView = new PortView();
        	portView.basicThumb();
        }
	},
	flipBack: function () {
    	var present = $('.present');
        var next = present.next();
        var prev = present.prev();

        if (prev.length != 0) {
            present.removeClass('present').addClass('future');
            prev.removeClass('past').addClass('present');
        }
        if (configModel.isThumb() == 1) {
        	var portView = new PortView();
        	portView.basicThumb();
        }
	}
})
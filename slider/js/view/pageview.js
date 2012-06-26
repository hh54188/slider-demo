window.app = window.app || {};
window.app.PageView = Backbone.View.extend({
	flipForward:function () {
    	var present = $('.present');
        var next = present.next();
        var prev = present.prev();

        if (next.length !=0 ) {
            present.removeClass('present').addClass('past');
            next.removeClass('future').addClass('present');
        }
        if (app.configModel.isThumb() == 1) {
        	app.portView.basicThumb();
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
        if (app.configModel.isThumb() == 1) {
        	app.portView.basicThumb();
        }
	}
})
app.pageView = new app.PageView;
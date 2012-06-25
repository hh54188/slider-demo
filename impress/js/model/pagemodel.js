window.PageModel = Backbone.Model.extend({
 	initialize: function(){
        this.bind("change:index", function () {

        });
    },
 	distribute: function (ecode) {
 		var pageView = new PageView();
 		if (ecode == 39) {//right
 			if (configModel.getCurPage() < configModel.getTotalPage()) {
	 			configModel.nextIndex();
	 			pageView.flipForward(); 				
 			}
 		} else if (ecode == 37) {//left
 			if (configModel.getCurPage() > 1) {
 				configModel.prevIndex();
 				pageView.flipBack();
 			}
 		} else if (ecode == 27) {//thumb
 			configModel.toggleThumb();
 		} else if(ecode == 81) {

 		}
 	}
 })
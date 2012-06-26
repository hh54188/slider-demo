window.app = window.app || {};
window.app.PageModel = Backbone.Model.extend({
 	initialize: function(){
        this.bind("change:index", function () {

        });
    },
 	distribute: function (ecode) {
 		if (ecode == 39) {//right
 			if (app.configModel.getCurPage() < app.configModel.getTotalPage()) {
	 			app.configModel.nextIndex();
	 			app.pageView.flipForward(); 				
 			}
 		} else if (ecode == 37) {//left
 			if (app.configModel.getCurPage() > 1) {
 				app.configModel.prevIndex();
 				app.pageView.flipBack();
 			}
 		} else if (ecode == 27) {//thumb
 			app.configModel.toggleThumb();
 		} else if(ecode == 81) {

 		}
 	}
 })
app.pageModel = new app.PageModel;
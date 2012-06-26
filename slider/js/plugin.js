$(function () {
	$('#slider-control').slider({
		'step': parseInt(100 / (app.configModel.getTotalPage() - 1)),
		'slide': function (e, ui) {//ui.value
			var step = parseInt(100 / (app.configModel.getTotalPage() - 1));
			var nextIndex = ui.value / step + 1;
			var curIndex = app.configModel.getCurPage();

			if (nextIndex > curIndex) {
				if (nextIndex > app.configModel.getTotalPage()) {
					ui.value = app.configModel.getTotalPage();
				}
				app.configModel.nextIndex();
	 			app.pageView.flipForward(); 
			} else if (nextIndex < curIndex) {
 				app.configModel.prevIndex();
 				app.pageView.flipBack();
			}
		}
	});
})
$(function () {
	$('#slider-control').slider({
		'step': parseInt(100 / (configModel.getTotalPage() - 1)),
		'slide': function (e, ui) {//ui.value
			var step = parseInt(100 / (configModel.getTotalPage() - 1));
			var nextIndex = ui.value / step + 1;
			var curIndex = configModel.getCurPage();
			var pageView = new PageView();
			
			console.log('curIndex', curIndex);
			console.log('nextIndex', nextIndex);

			if (nextIndex > curIndex) {
				if (nextIndex > configModel.getTotalPage()) {
					ui.value = configModel.getTotalPage();
				}
				configModel.nextIndex();
	 			pageView.flipForward(); 
			} else if (nextIndex < curIndex) {
 				configModel.prevIndex();
 				pageView.flipBack();
			}
		}
	});
})
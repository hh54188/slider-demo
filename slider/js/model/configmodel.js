window.app = window.app || {};
window.app.ConfigModel = Backbone.Model.extend({
    defaults: {
        'scene': 'view',
 	    'enableThumb': 0,
        'index': 1,
        'total': 13
    },
    getTotalPage: function () {
        return this.get('total');
    },
    getCurPage: function () {
        return this.get('index');
    },
    
    initialize: function(){
        this.bind("change:index", function () {
            app.sliderView.turnCurIndex(this.get('index'), this.get('total'));
        });

        this.bind("change:enableThumb", function () {
            if (this.get('enableThumb') == 0 ) {
                app.sliderView.hideControl();
        	    app.portView.resetThumb();
            } else if (this.get('enableThumb') ==1 ) {
                app.sliderView.showControl();
        	    app.portView.basicThumb();
                app.portView.portView3dOff();
            }
        });
     },
     distribute: function (ecode) {
         var scene = this.get('scene');
         if (scene == "view") {
             app.pageModel.distribute(ecode);
         }
     },
     toggleThumb: function () {
         if (this.get('enableThumb') == 0) {
 	         this.set('enableThumb', 1);
 	     } else if (this.get('enableThumb') == 1){
 	         this.set('enableThumb', 0);
 	     }
     },
     isThumb: function () {
         if (this.get('enableThumb') == 0) {
 	         return false;
 	     } else {
 	         return true;
         }
     },
     nextIndex: function () {
        this.set('index', this.get('index') + 1);
     },
     prevIndex: function () {
        this.set('index', this.get('index') - 1)
     }
 })
app.configModel = new app.ConfigModel;
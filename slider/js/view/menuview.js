window.app = window.app || {};
window.app.MenuView = Backbone.View.extend({
    showMenu: function () {
        $('.menu-container').addClass('show');
    }

})
app.menuView = new app.MenuView;
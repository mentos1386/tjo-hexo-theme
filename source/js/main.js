'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UIMenu = function () {
    function UIMenu(action, menu) {
        var _this = this;

        _classCallCheck(this, UIMenu);

        this.action = document.getElementById(action);
        this.menu = document.getElementById(menu);

        // Menu opened status
        this.opened = false;

        // Tether for positioning
        this.tether = new Tether({
            element: this.menu,
            target: this.action,
            attachment: 'top right',
            targetAttachment: 'bottom right'
        });

        // Add click event listener
        this.action.addEventListener("click", function () {
            return _this.onClick();
        });
        this.menu.addEventListener("transitionend", function () {
            return _this.onTransitionEnd();
        }, false);
    }

    _createClass(UIMenu, [{
        key: 'onClick',
        value: function onClick() {
            if (!this.opened) this.show();else this.hide();
        }
    }, {
        key: 'show',
        value: function show() {
            this.opened = true;
            this.menu.className += " transition visible";
        }
    }, {
        key: 'hide',
        value: function hide() {
            if (this.opened) {
                this.opened = false;
                this.menu.className += " transition";
                this.menu.className = this.menu.className.replace('visible', '');
            }
        }
    }, {
        key: 'onTransitionEnd',
        value: function onTransitionEnd() {
            this.menu.className = this.menu.className.replace('transition', '');
        }
    }]);

    return UIMenu;
}();

window.onload = function () {
    var uiMenus = [];

    // NAVBAR MORE
    uiMenus.push(new UIMenu("nav-more", "nav-more-menu"));

    // ARTICLE SHARE /Only if article-share is in DOM
    if (document.getElementById("article-share")) {
        uiMenus.push(new UIMenu("article-share", "article-share-menu"));
    }

    // Whenever user clicks, we go through opened menus, and check if action was for menu,
    //  if not, then we try to hide/close any opened menus
    document.getElementsByTagName('body')[0].addEventListener("click", function (event) {
        uiMenus.forEach(function (menu) {
            if (menu.action !== event.target) {
                menu.hide();
            }
        });
    });
};

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var urlHash = function () {
    function urlHash() {
        var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, urlHash);

        this.defaults = defaults;
        this.params = this.defaults;

        if (window.location.hash) {
            this.params = this.getParams(true);
        }
    }

    _createClass(urlHash, [{
        key: 'getParams',
        value: function getParams() {
            var parse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


            var hash = window.location.hash.substr(1);

            return hash.split('&').reduce(function (result, item) {

                var parts = item.split('=');

                if (parse && typeof parts[1] !== 'undefined') {
                    parts[1] = parts[1].split(',');
                    if (parts[1].length === 1) parts[1] = parts[1][0];
                }

                result[parts[0]] = parts[1];

                return result;
            }, {});
        }
    }, {
        key: 'setParams',
        value: function setParams(params) {

            this.params = params;
            var str = '';

            for (var key in params) {
                if (params[key] !== null && params[key] !== this.defaults[key] && params[key] !== '') {
                    if (str !== '') str += '&';
                    var value = encodeURIComponent(params[key]);
                    str += key + '=' + value.replace(new RegExp('%2C', 'g'), ',');
                }
            }

            if (str === '') {
                history.pushState('', document.title, window.location.pathname);
            } else {
                window.location.hash = str;
            }
        }
    }, {
        key: 'get',
        value: function get(parameter) {
            var parse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


            var hashparams = this.getParams();
            var param = decodeURIComponent(hashparams[parameter]);

            if (param === '' || typeof param === 'undefined' || param === 'undefined') {
                param = this.defaults[parameter];
            }

            if (parse) return param.split(',');

            return param;
        }
    }, {
        key: 'set',
        value: function set(parameter, value) {

            var hashparams = this.getParams();

            if (value !== '' || typeof value !== 'undefined') {
                hashparams[parameter] = value;
            }

            this.setParams(hashparams);
        }
    }]);

    return urlHash;
}();

try {
    module.exports = exports = urlHash;
} catch (e) {}

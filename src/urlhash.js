function urlHash( defaults ){

    this.defaults = defaults || {};
    this.params = this.defaults;

    if(window.location.hash) {
        this.params = this.getParams(true);
    }

}


urlHash.prototype.getParams = function( parse ) {

    parse = parse || false;

    var hash = window.location.hash.substr(1);
    
    return hash.split('&').reduce(function(result, item) {

        var parts = item.split('=');

        if(parse) {
            parts[1] = parts[1].split(',');
            if(parts[1].length === 1) parts[1] = parts[1][0];
        }

        result[parts[0]] = parts[1];
        
        return result;

    }, {});
}


urlHash.prototype.setParams = function( params ) {

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


urlHash.prototype.get = function( parameter, parse ) {

    parse = parse || false;
    
    var hashparams = this.getParams();

    var param = decodeURIComponent(hashparams[parameter]);

    if (param == '' || typeof param == 'undefined') {
        param = this.defaults[parameter];
    }
    
    if(parse) return param.split(',');
    
    return param;
}


urlHash.prototype.set = function( parameter, value ) {

    var hashparams = this.getParams();

    if (value !== '' || typeof value !== 'undefined') {
        hashparams[parameter] = value;
    }

    this.setParams(hashparams);
}

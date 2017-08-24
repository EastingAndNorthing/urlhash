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


window.urlhash = new urlHash();

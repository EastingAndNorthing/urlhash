class urlHash {

    constructor( defaults = {} ) {

        this.defaults = defaults;
        this.params = this.defaults;

        if (window.location.hash) {
            this.params = this.getParams(true);
        }

    }
    

    getParams(parse = false) {

        const hash = window.location.hash.substr(1);

        return hash.split('&').reduce((result, item) => {
            
            let parts = item.split('=');
            
            if(parse && typeof parts[1] !== 'undefined') {
                parts[1] = parts[1].split(',');
                if (parts[1].length === 1)
                    parts[1] = parts[1][0];
            }

            result[parts[0]] = parts[1];
            
            return result;
            
        }, {});
    }


    setParams(params) {

        this.params = params;
        let str = '';

        for (let key in params) {
            if (params[key] !== null && params[key] !== this.defaults[key] && params[key] !== '') {
                if (str !== '')
                    str += '&';
                let value = encodeURIComponent(params[key]);
                str += key + '=' + value.replace(new RegExp('%2C', 'g'), ',');
            }
        }

        if (str === '') {
            history.pushState('', document.title, window.location.pathname);
        } else {
            window.location.hash = str;
        }
    }


    get(parameter, parse = false) {

        const hashparams = this.getParams();
        let param = decodeURIComponent(hashparams[parameter]);

        if (param === '' || typeof param === 'undefined' || param === 'undefined') {
            param = this.defaults[parameter];
        }

        if (parse)
            return param.split(',');
        
        return param;
    }

    
    set(parameter, value) {
        
        const hashparams = this.getParams();
        
        if (value !== '' || typeof value !== 'undefined') {
            hashparams[parameter] = value;
        }
        
        this.setParams(hashparams);
    }
}

try {
    module.exports = exports = urlHash;
} catch (e) {}
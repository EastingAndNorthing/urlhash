# urlhash.js
Easily get and set custom parameters in `window.location.hash`. I use this myself to store user input for ajax requests where filtering is needed. Using simple default values, you can even implement this as a basic state manager for your app.

## Usage
To start using urlhash.js, you can simply download the [minified version](https://raw.githubusercontent.com/EastingAndNorthing/urlhash/master/dist/urlhash.min.js) and import it into your scripts or html.

Initialize the library by calling `window.urlhash = new urlHash()` or store it as something you prefer. Optionally, you can provide an object as an argument which will be used as defaults. This way, you can hide basic parameters like `perpage=10` from the URL which will still be available to `.get('perpage')`

## Documentation

The following method descriptions use a Typescript-esque notation to signify the type of any arguments.

### `.setParams( params: object )`
Set a URL hash by passing any object to this method. 

### `.getParams( parse: boolean = false )`
Returns an object containing the raw key value pairs inside the url hash. Arrays are stored as comma separated lists inside the URL (`#key=value1,value2`); to parse these as javascript arrays, call `getParams(true)`.

### `.set( parameter: string, value: string|number|array )`
Set a specific parameter or create one if it does not exist. Supported values are listed above. If you would like to store a complete object into the URL hash, I suggest you to use the `setParams(params)` method.

### `.get( parameter: string, parse: boolean = false )`
Retrieve a single parameter from the URL hash. Similar to `getParams()`, you can set the `parse` argument to `true` to retrieve regular Javascript arrays from any comma separated values.

## ES6 module
The ES6 / npm packaged version of this library is a work in progress. I haven't tested this, but you should be able to `require` or `import` it like in the example below.

```javascript
const urlHash = require('urlhash');
const urlhash = new urlHash({ default: 'hello' });
```
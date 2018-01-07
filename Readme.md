### Bolgia

[![NPM VERSION](http://img.shields.io/npm/v/bolgia.svg?style=flat)](https://www.npmjs.org/package/bolgia)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/bolgia)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/c/rootslab/bolgia.svg?style=flat)](https://codeclimate.com/github/rootslab/bolgia)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/bolgia#mit-license)

![NODE VERSION](https://img.shields.io/node/v/bolgia.svg)
[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/bolgia.svg?style=flat)](http://travis-ci.org/rootslab/bolgia)
[![BUILD STATUS](http://img.shields.io/david/rootslab/bolgia.svg?style=flat)](https://david-dm.org/rootslab/bolgia)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/bolgia.svg?style=flat)](https://david-dm.org/rootslab/bolgia#info=devDependencies)

[![NPM MONTHLY](http://img.shields.io/npm/dm/bolgia.svg?style=flat)](http://npm-stat.com/charts.html?package=bolgia)
![NPM YEARLY](https://img.shields.io/npm/dy/bolgia.svg)
[![NPM TOTAL](https://img.shields.io/npm/dt/bolgia.svg)](http://npm-stat.com/charts.html?package=bolgia)

[![NPM GRAPH](https://nodei.co/npm/bolgia.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/bolgia/)

> _Bolgia_, an helper module for the __config hell__.

> It **recursively clone**, **mix**, **update** and **improve** 
> configuration objects/hashes with **nested** properties.

> _˝..non ragioniam di lor, ma guarda e passa..˝_

### Install

```bash
$ npm install bolgia [-g]
// clone repo
$ git clone git@github.com:rootslab/bolgia.git
```

> __require__ 

```javascript
var Bolgia  = require( 'bolgia' );
```

> _require_ returns an helper hash/obj with some properties/methods.
> See [examples](example/).

### Run Tests

```bash
$ cd bolgia/
$ npm test
```

### Properties

```javascript
/*
 * Property that holds all possible types/strings returned by Object#toString,
 * with some custom types like for node Buffers: "[object Buffer]".
 *
 * See Bolgia#toString method.
 *
 */
Bolgia#circles : Object
```

### Methods

> Arguments within [ ] are optional.

```javascript

/*
 * simple object/hash cloning
 */
Bolgia#clone( Object obj ) : Object

/*
 * mix/update dest object with all properties
 * from src, with no recursion.
 * It brutally overwrites dest properties/values.
 * It returns the dest Object.
 */
Bolgia#mix( Object dest, Object src ) : Object

/* 
 * improve a dest object with all properties/values
 * from a src object, with recursion.
 * It doesn't overwrite properties/values that already
 * exist in the dest object.
 * It returns the dest Object.
 */
Bolgia#improve( Object dest, Object src ) : Object

/* 
 * update a dest object with all properties/values
 * from a src object, with recursion.
 * It brutally overwrites dest properties/values.
 * It returns the dest object.
 */
Bolgia#update( Object dest, Object src ) : Object

/* 
 * A methods that returns a toString() representation of an object.
 *
 * NOTE: It differs from Object.toString(), because for default, it
 * returns:
 *
 * - "[object Buffer]" for node Buffers
 * - "[object Null]" for NaN
 * - "[object Null]" for empty string ''
 *
 * NOTE: If custom is true, it returns:
 *
 * - "[object NaN]" for NaN
 * - "[object NullString]" for ''
 */
Bolgia#toString( Object o [, Boolean custom ] ) : String

/*
 * #toString alias.
 */
Bolgia#doString( Object o [, Boolean custom ] ) : String

/*
 * Recursively convert an obj/hash to an array.
 * It optionally accepts a boolean to activate recursion
 * and an array to collect results.
 *
 * NOTE: when using indexed arrays, every element will be
 * preceded by its index.
 */
Bolgia#toArray( Object obj [, Boolean recur [, Array result ] ] ) : Array

/*
 * Same as the method above, but it lists only enumerable properties
 */
Bolgia#toArrayEnum( Object obj [, Boolean recur [, Array result ] ] ) : Array

/*
 * Recursively convert an indexed array to an hash/obj;
 * optionally it converts Buffers to Strings and Strings
 * representing numbers to Numbers.
 *
 * NOTE: Array elements are interpreted as a series of key/value pairs.
 * NOTE: Pay attention to possible keys collisions/overwritings.
 * NOTE: Every nested array will be converted to an obj/hash.
 */
Bolgia#toHash( Array array [, Boolean recur [, Object result [, Boolean convert ] ] ] ) : Object

/*
 * Recursively convert a nested Array of Buffer items to Strings and Numbers.
 *
 * NOTE the max integer precision is +/- 2^53, if a string/buffer represents a numeber
 * that is >= 9007199254740992, or <= -9007199254740992, than it will be not converted
 * to Number.
 *
 * NOTE: It returns/converts the same array instance passed as argument.
 */
Bolgia#reveal( Array array ) : Array

/*
 * Recursively count obj properties, or
 * only non-object properties (leafs).
 */
Bolgia#count( Object obj [, Boolean leaf ] ) : Number

/*
 * Method to output a (query)string representation of an hash.
 * It requires an object to parse and optionally a configuration object.
 * It is possible to specify custom symbols for delimiting and equality,
 * defaults are '&' and '='.
 *
 * NOTE: for default, null, undefined and function values are filtered
 * away; to bypass this behaviour, it is possible to specify a custom 
 * function, for choosing which types are allowed for querystring.
 * This function gets 3 args: Object field, String ftype, Object circles.
 *
 * default configuration:
 *
 * {
 *   dl : '&'
 *   , eq : '='
 *   , filter : function ( field, ftype, circles ) {
 *      switch ( ftype ) {
 *          case circles.nul:
 *          case circles.und:
 *          case circles.fun:
 *          break;
 *          default:
 *              return true;
 *          break;
 *      };
 *   }
 * }
 */
Bolgia#qs( Object hash [, Object opt ] ) : String

/*
 * Method to output a (query)object representation of an hash.
 * It converts all paths, to the object's nested values ( leafs ),
 * to querystring keys.
 */
Bolgia#flatten( Object hash ) : Object
```

### Sample Usage

> _**require** libs:_

```javascript
var log = console.log,
    , util = require( 'util' )
    , Bolgia = require( 'bolgia' );
```

> _define a **default** configuration object/hash:_

```javascript

var cfg = {
    letters : [ 'aaa', 'bbb', 'ccc','ddd' ]
    , numbers : {
        1 : false
        , 2 : false
        , 3 : false
        , 4 : false
    }
    , hell : {
        h1 : {
            a : [ 'a1!', 'a2!', 'a3!' ]
            , b : [ 'b1!', 'b2!', 'b3!' ]
        }
        , h3 : {
            1 : 0
            , 2 : 0
        }
    }
};
```

> _define a custom **update** object/hash:_

```javascript

var upd = {
    letters : [ undefined, 'BBB', 'CCC', undefined, 'EEE' ]
    , numbers : {
        1 : true
        , 3 : Infinity
        , 4 : null
    }
    , hell : {
        h1 : {
            a : [ undefined, 'A2!' ]
            , b : [ 'B1!', undefined, 'B3!' ]
            , e : [ undefined, 'E2!', 'E3!' ]
        }
        , h2 : 'BLAH'
        , h3 : {
            2 : new Date( '1913' )
        }
    }
};
```

> _**update** cfg with upd, and output results to console:_

```javascript

Bolgia.update( cfg, upd );

log( util.inspect( cfg, !true, null, true ) );

/* 
 * NOTE: sub-properties like arrays and hashes 
 * are not brutally overwritten, but finely updated
 */

{
    letters: [ 'aaa', 'BBB', 'CCC', 'ddd', 'EEE' ]
    , numbers : {
        1 : true
        , 2 : false
        , 3 : Infinity
        , 4 : null
    }
    , hell : {
        h1 : { a: [ 'a1!', 'A2!', 'a3!' ]
        , h2 : 'BLAH'
            b : [ 'B1!', 'b2!', 'B3!' ]
            , e : [ undefined, 'E2!', 'E3!' ] }
        h3 : {
            1 : 0
            , 2 : Wed Jan 01 1913 01:00:00 GMT+0100 (CET)
        }
    }
}
```

> _See **[readme-example](example/readme.example.js)**_

------------------------------------------------------------------------

### MIT License

> Copyright (c) 2013-present &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
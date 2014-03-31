###Bolgia
[![build status](https://secure.travis-ci.org/rootslab/bolgia.png?branch=master)](http://travis-ci.org/rootslab/bolgia) 
[![NPM version](https://badge.fury.io/js/bolgia.png)](http://badge.fury.io/js/bolgia)
> _Bolgia_, an helper module for the __config hell__.

> It **recursively clone**, **mix**, **update** and **improve** 
> configuration objects/hashes with **nested** properties.

> _˝..non ragioniam di lor, ma guarda e passa.._˝

###Install

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

###Run Tests

```bash
$ cd bolgia/
$ npm test
```

###Methods

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
 */
Bolgia#mix( Object dest, Object src ) : Object

/* 
 * improve a dest object with all properties/values
 * from a src object, with recursion.
 * It doesn't overwrites properties/values that already
 * exist in the dest object.
 */
Bolgia#improve( Object dest, Object src ) : Object

/* 
 * update a dest object with all properties/values
 * from a src object, with recursion.
 * It brutally overwrites dest properties/values.
 */
Bolgia#update( Object dest, Object src ) : Object

/*
 * Method to output a (query)string representation of an hash.
 * It requires an object to parse and optionally a configuration object.
 * It is possible to specify custom symbols for delimiting and equality,
 * defaults are '&' and '='.
 * Note that for default, null, undefined and function values are filtered
 * away; to bypass this behaviour, it is possible to specify a custom 
 * function, for filtering which value types are allowed for querystring.
 * 
 * default configuration:
 *
 * {
 *   dl : '&'
 *   , eq : '='
 *   , filter : function ( field, ftype, otypes ) {
 *      switch ( ftype ) {
 *          case otypes.nul:
 *          case otypes.und:
 *          case otypes.fun:
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
 * It converts all paths to the object's nested values ( leafs ),
 * to querystring keys.
 */
Bolgia#flatten( Object hash ) : Object
```

###Sample Usage

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

> _See [examples/readme-example.js](example/readme.example.js)_

------------------------------------------------------------------------

### MIT License

> Copyright (c) 2014 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

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
> SOFTWARE OR THE USE OR OTHER DEALINGS IN T
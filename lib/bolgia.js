/*
 * Bolgia, an helper module for the config hell.
 * It recursively clones, mixes, updates and improves configuration 
 * objects/hashes with nested properties.
 * '..non ragioniam di lor, ma guarda e passa..' ",
 *
 * Copyright(c) 2013-present Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.Bolgia = ( function () {
    var isArray = Array.isArray
        , slice = Array.prototype.slice
        , otype = Object.prototype.toString
        , abs = Math.abs
        // toString table
        , o = {
            arg : '[object Arguments]'
            , arr : '[object Array]'
            , boo : '[object Boolean]'
            , dat : '[object Date]'
            , err : '[object Error]'
            , fun : '[object Function]'
            , nul : '[object Null]'
            , num : '[object Number]'
            , obj : '[object Object]'
            , reg : '[object RegExp]'
            , str : '[object String]'
            , und : '[object Undefined]'
            // ECMASCRIPT 2017, toString.call() returns Uint8Array for Buffers
            , ui8 : '[object Uint8Array]'
            // custom values
            , buf : '[object Buffer]'
            , nan : '[object NaN]'
            , nst : '[object NullString]'
        }
        , isBuffer = Buffer.isBuffer
        // toString that nullifies NaN and ''
        , toString = function ( el, custom ) {
            var t = otype.call( el )
                , c = custom
                ;
            switch ( t ) {
                case o.num:
                    t = isNaN( el ) ? ( c ? o.nan : o.nul ) : t;
                break;
                case o.str:
                    t = ( el === '' ) ? ( c ? o.nst : o.nul ) : t;
                break;
                case o.ui8:
                case o.obj:
                    t = isBuffer( el ) ? o.buf : t;
                break;
            }
            return t;
        }
        // recursively convert an obj/hash to an array.
        , toArray = function ( obj, recur, arr ) {
            var list = arr || []
                , p = null
                , v = null
                , vtype = null
                , nest = null
                ;
            for ( p in obj ) {
                v = obj[ p ];
                if ( recur ) {
                    vtype = otype.call( v );
                    if ( ( vtype === o.obj ) ||
                         ( vtype === o.arr ) ) {
                        nest = [];
                        list.push( p, nest );
                        toArray( v, recur, nest );
                        continue;
                    }
                }
                list.push( p, v );
            }
            return list;
        }
        // recursively convert an obj/hash to an array, listing only enumerable properties
        , toArrayEnum = function ( obj, recur, arr ) {
            var list = arr || []
                , p = null
                , v = null
                , vtype = null
                , nest = null
                ;
            for ( p in obj ) {
                if ( ! obj.propertyIsEnumerable( p ) ) continue; 
                v = obj[ p ];
                if ( recur ) {
                    vtype = otype.call( v );
                    if ( ( vtype === o.obj ) ||
                         ( vtype === o.arr ) ) {
                        nest = [];
                        list.push( p, nest );
                        toArray( v, recur, nest );
                        continue;
                    }
                }
                list.push( p, v );
            }
            return list;
        }
        /*
         * Recursively convert an indexed array to an hash/obj;
         * optionally it converts Buffers to Strings and Strings
         * representing numbers to Numbers.
         *
         * NOTE: pay attention to possible keys collisions/overwritings.
         */
        , toHash = function ( arr, recur, obj, convert ) {
            var h = obj || {}
                , c = convert
                , a = isArray( arr ) ? arr : []
                , alen = a.length
                , i = 0
                , k = null
                , v = null
                ;

            for ( ; i < alen; ) {
                k = String( a[ i++ ] );
                v = a[ i++ ];
                if ( recur && ( otype.call( v ) === o.arr ) ) {
                    h[ k ] = {};
                    toHash( v, recur, h[ k ], c );
                    continue;
                }
                if ( ! c ) {
                    h[ k ] = v;
                    continue;
                }
                // conversion is enabled
                switch ( toString( v ) ) {
                    case o.buf:
                        //convert node Buffers to Strings
                        if ( v.length === 0 ) {
                            h[ k ] = '';
                            break;
                        }
                    case o.str:
                        // convert Strings representing numbers to Numbers.
                        h[ k ] = isNaN( + v ) ? String( v ) : + v;
                    break;
                    default:
                        h[ k ] = v;
                    break;
                }
            }

            return h;
        }
        /*
         * recursively convert nested Array of Buffer items to Strings and Numbers,
         * note that max integer precision is 2^53 or 9007199254740992, if number
         * is greater than this value a string will be returned.
         */
        , reveal = function ( arr ) {
            // var a = isArray( arr ) ? arr : ( arr === undefined || arr === null ) ? [] : [ arr ]
            var a = isArray( arr ) ? arr : [ arr ]
                , alen = a.length
                , el = a[ 0 ]
                , i = 0
                ;
            for ( ; i < alen; el = a[ ++i ] ) isArray( el ) ?
                reveal( el ) :
                a[ i ] = el === null || el === undefined ?
                         el :
                         ( isNaN( + el ) || ( abs( + el ) === abs( + el ) + 1 ) ) ? String( el ) : + el
                         ;
            return a;
        }
        /*
         * Recursively count obj properties, 
         * or only non-object properties (leafs).
         */
        , count = function ( obj, leaf ) {
            var p = null
                , l = leaf
                , cnt = 0
                ;
            for ( p in obj ) {
                switch ( otype.call( obj[ p ] ) ) {
                    case o.arr:
                    case o.obj:
                        cnt += ( l ? 0 : 1 ) + count( obj[ p ] );
                    break;
                    default:
                        ++cnt;
                    break;
                }
            }
            return cnt;
        }

        /*
         * simple object/hash cloning.
         */
        , clone = function ( src ) {
            // update an empty hash ;)
            return update( {}, src );
        }

       /*
        * mix/update dest object with all properties
        * from src, with no recursion.
        * It brutally overwrites dest properties/values.
        */
        , mix = function ( dest, src ) {
            // src is not an object
            if ( ! src ) return dest;
            var keys = Object.keys( src )
                , i = keys.length
                , k = null
                ;
            while ( i-- ) {
                k = keys[ i ];
                dest[ k ] = src[ k ];
            }
            return dest;
        }

        /* 
         * Improve a dest object with all properties/values
         * from a src object, with recursion.
         * It doesn't overwrite properties/values that already
         * exist in the dest object.
         */
        , improve = function ( dest, src ) {
            var d = dest
                , s = src
                , ctor = s && s.constructor || {}
                , stype = otype.call( s )
                , dtype = otype.call( d )
                , l = 0
                , p = null
                ;

            switch ( stype ) {
                case o.nul:
                case o.und:
                break;
                case o.arg:
                    // build array from arguments
                    s = slice.call( s );
                    stype = o.arr;
                case o.arr:
                    l = s.length;
                    if ( dtype === o.nul ) break;
                    if ( dtype === o.und ) d = [];
                    while ( l ) d[ --l ] = improve( d[ l ], s[ l ] );
                break;
                case o.obj:
                    if ( ctor === Object ) {
                        if ( dtype === o.nul ) break;
                        if ( dtype === o.und ) d = {};
                        for ( p in s ) d[ p ] = improve( d[ p ], s[ p ] );
                    }
                break;
                case o.dat:
                    if ( dtype === o.und ) d = new Date( s.getTime() );
                break;
            }
            return ( dtype === o.und ) ? s : d;
        }

        /* 
         * Update a dest object with all properties/values
         * from a src object, with recursion.
         * It overwrites properties/values that already
         * exist in the dest object.
         */
        , update = function ( dest, src ) {
            var d = dest
                , s = src
                , sector = s && s.constructor || {}
                , doctor = d && d.constructor
                , stype = otype.call( s )
                , dtype = otype.call( d )
                , l = 0
                , p = null
                ;

            switch ( stype ) {
                case o.und:
                break;
                case o.arg:
                    // build array from arguments
                    s = slice.call( s );
                    stype = o.arr;
                case o.arr:
                    l = s.length;
                    // dest array doesn't exists, init
                    if ( ! isArray( d ) ) d = [];
                    while ( l ) d[ --l ] = update( d[ l ], s[ l ] );
                break;
                case o.obj:
                    if ( sector === Object ) {
                        // dest hash doesn't exists, init
                        if ( ( doctor !== Object ) || ( dtype !== o.obj ) ) d = {};
                        for ( p in s ) d[ p ] = update( d[ p ], s[ p ] );
                    }
                break;
                case o.dat:
                    d = new Date( s.getTime() );
                break;
                default :
                    /*
                     * o.nul
                     * o.num
                     * o.str
                     * o.boo
                     * o.fun
                     * o.reg
                     */
                    return s;
            }
            return d;
        }

        /* querystrings and queryobjects methods */

        // generic error message for field
        , fmsg =  'a root field name should be specified!'

        // encode field and value to a querystring
        , build = function ( f , k ) {
            return ( f + '[' + encodeURIComponent( k ) + ']' );
        }
        // filter field types
        , filter = function ( f, ftype, o ) {
            switch ( ftype ) {
                case o.nul:
                case o.und:
                case o.fun:
                break;
                default:
                    return true;
            }
        }
        /*
         * method to output a queryobject representation of the object/hash
         * It requires 2 arguments, a root field name and a value object to parse.
         */
         , flatten = function ( field, value, hash ) {
            var f = field
                , h = hash || {}
                , v = value
                , vtype = otype.call( v )
                , ftype = otype.call( f )
                , k = 0
                , len = 0
                ;

            switch ( ftype ) {
                case o.und:
                case o.nul:
                    throw new TypeError( 'Bolgia#flatten: ' + fmsg );
            }

            switch ( vtype ) {
                case o.arg:
                    // build array from arguments
                    v = slice.call( v );
                    vtype = o.arr;
                case o.arr:
                    for ( len = v.length; k < len; ++k ) flatten( build( f, k ), v[ k ], h );
                break;
                case o.obj:
                   if ( v.constructor === Object ) for ( k in v ) flatten( build( f, k ), v[ k ], h );
                break;
                default:
                     // leaf
                     h[ f ] = v;
                break;
            }
            return h;
        }

        /*
         * Method to output a (query)string representation of an object/hash.
         * It requires 2 arguments, a root field name and a value object to parse;
         * optionally a configuration object.
         */
        , qs = function ( field, value, opt, hash ) {
            var cfg = opt
                , f = field
                , h = hash || ''
                , v = value
                , vtype = otype.call( v )
                , ftype = otype.call( f )
                , k = 0
                ;

            switch ( ftype ) {
                case o.und:
                case o.nul:
                    throw new TypeError( 'Bolgia#qs: ' + fmsg );
            }

           switch ( vtype ) {
                case o.arg:
                    // build array from arguments
                    v = slice.call( v );
                    vtype = o.arr;
                case o.arr:
                    for ( k in v ) h = qs( build( f, k ), v[ k ], cfg, h );
                break;
                case o.obj:
                    if ( v.constructor === Object ) for ( k in v ) h = qs( build( f, k ), v[ k ], cfg, h );
                break;
                default:
                    // leaf
                    if ( cfg.filter( v, vtype, o ) ) h += f + cfg.eq + encodeURIComponent( v ) + cfg.dl;
                    else h += f + cfg.eq + cfg.dl;
                break;
            }
            return h;
        }
        ;
    return {

        circles : o

        , clone : clone

        , improve : improve

        , mix : mix

        , update : update

        // less ambiguous with Object.toString
        , doString : toString

        , toString : toString

        , toArray : toArray

        , toHash : toHash

        , reveal : reveal

        , count : count

        , flatten : function ( hash ) {
            var h = hash
                , k = null
                , f = {}
                , htype = otype.call( h )
                ;
            if ( ( htype === o.obj ) && ( h.constructor === Object ) )
                for ( k in h ) update( f, flatten( k, h[ k ] ) );
            return f;
        }

        , qs : function ( hash, opt ) {
            var  fopt = {
                    dl : '&'
                    , eq : '='
                    , filter : filter 
                }
                , cfg = update( fopt, opt || {} )
                , h = hash
                , k = null
                , s = ''
                , htype = otype.call( h )
                ;
            // faster than array push & join
            if ( ( htype === o.obj ) && ( h.constructor === Object ) )
                for ( k in h ) s += qs( encodeURIComponent( k ), h[ k ], cfg );
            // remove trailing '&'
            return s.slice( 0, -1 );
        }

    };

} )();
/*
 * Bolgia, an helper module to resolve config hell.
 * It recursively clones, mixes, updates and improves configuration 
 * objects/hashes with nested properties.
 * '..non ragioniam di lor, ma guarda e passa..' ",
 *
 * Copyright(c) 2013 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Bolgia = ( function () {
    var log = console.log
        // toString table
        , o = {
            arg : '[object Arguments]'
            , arr : '[object Array]'
            , boo : '[object Boolean]'
            , dat : '[object Date]'
            , fun : '[object Function]'
            , nul : '[object Null]'
            , num : '[object Number]'
            , obj : '[object Object]'
            , reg : '[object RegExp]'
            , str : '[object String]'
            , und : '[object Undefined]'
        }
        // toString shortcut
        , otype = function ( o ) { return toString.call( o ); }

        // Array slice shortcut
        , slice = Array.prototype.slice

        /*
         * simple object/hash cloning
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
            if ( ! src ) {
                // src is not an object
                return dest;
            }
            var keys = Object.keys( src ),
                i = keys.length,
                k = null;
            while ( i-- ) {
                k = keys[ i ];
                dest[ k ] = src[ k ];
            }
            return dest;
        }
        /* 
         * Improve a dest object with all properties/values
         * from a src object, with recursion.
         * It doesn't overwrites properties/values that already
         * exist in the dest object.
         */
        , improve = function ( dest, src ) {
            var itype = null
                , d = dest
                , s = src
                , ctor = s && s.constructor || Object()
                , stype = otype( s )
                , dtype = otype( d )
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
                    if ( dtype === o.nul ) {
                        break;
                    }
                    if ( ( dtype === o.und ) ) {
                        d = [];
                    }
                    while ( l ) {
                        d[ --l ] = improve( d[ l ], s[ l ] );
                    };
                break;
                case o.obj:
                    if ( ctor === Object ) {
                        if ( dtype === o.nul ) {
                            break;
                        }
                        if ( dtype === o.und ) {
                            d = {};
                        }
                        for ( p in s ) {
                            d[ p ] = improve( d[ p ], s[ p ] );
                        };
                    }
                break;
                case o.dat:
                    if ( dtype === o.und ) {
                        d = new Date( s.getTime() );
                    }
                break;
            };
            return ( dtype === o.und ) ? s : d;
        }

        /* 
         * Update a dest object with all properties/values
         * from a src object, with recursion.
         * It overwrites properties/values that already
         * exist in the dest object.
         */
        , update = function ( dest, src ) {
            var itype = null
                , d = dest
                , s = src
                , sector = s && s.constructor || Object()
                , doctor = d && d.constructor
                , stype = otype( s )
                , dtype = otype( d )
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
                    if ( ! Array.isArray( d ) ) {
                        // dest array doesn't exists, init
                        d = [];
                    }
                    while ( l ) {
                        d[ --l ] = update( d[ l ], s[ l ] );
                    };
                break;
                case o.obj:
                    if ( sector === Object ) {
                        if ( ( doctor !== Object ) || ( dtype !== o.obj ) ) {
                            // dest hash doesn't exists, init
                            d = {};
                        }
                        for ( p in s ) {
                            d[ p ] = update( d[ p ], s[ p ] );
                        };
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
                break;
            };
            return d;
        }

        /* querystrings and queryobjects methods */

        // generic error message for field
        , fmsg =  'a root field name should be specified!'

        // encode field and value to a querystring
        , build = function ( f , k ) {
            return ( f + '[' + k + ']' );
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
                break;
            };
        }

        /*
         * method to output a queryobject representation of the object/hash
         * It requires 2 arguments, a root field name and a value object to parse.
         */
         , flatten = function ( field, value, hash ) {
            var f = field
                , h = hash || {}
                , v = value
                , vtype = otype( v )
                , ftype = otype( f )
                , k = 0
                , len = 0
                ;

            switch ( ftype ) {
                case o.und:
                case o.nul:
                    throw new TypeError( 'Bolgia#flatten: ' + fmsg );
                break;
            };

            switch ( vtype ) {
                case o.arg:
                    // build array from arguments
                    v = slice.call( v );
                    vtype = o.arr;
                case o.arr:
                    for ( len = v.length; k < len; ++k ) {
                        flatten( build( f, k ), v[ k ], h );
                    };
                break;
                case o.obj:
                   if ( v.constructor === Object ) {
                        for ( k in v ) {
                            flatten( build( f, k ), v[ k ], h );
                        };
                    }
                break;
                default:
                     // leaf
                     h[ f ] = v;
                break;
            };
            return h;
        }

        /*
         * Method to output a (query)string representation of an object/hash.
         * It requires 2 arguments, a root field name and a value object to parse.
         * and optionally a configuration object,
         */
        , qs = function ( field, value, opt, hash ) {
            var cfg = opt
                , f = field
                , h = hash || ''
                , v = value
                , vtype = otype( v )
                , ftype = otype( f )
                , k = 0
                , len = 0
                // prevent delimiter to be the first querystring char
                , delimit = function () {
                    return ( h.length ) ? cfg.dl : '';
                }
                ;

            switch ( ftype ) {
                case o.und:
                case o.nul:
                    throw new TypeError( 'Bolgia#qs: ' + fmsg );
                break;
            };

           switch ( vtype ) {
                case o.arg:
                    // build array from arguments
                    v = slice.call( v );
                    vtype = o.arr;
                case o.arr:
                    for ( len = v.length; k < len; ++k ) {
                        h = qs( build( f, k ), v[ k ], cfg, h );
                    };
                break;
                case o.obj:
                    if ( v.constructor === Object ) {
                        for ( k in v ) {
                           h = qs( build( f, k ), v[ k ], cfg, h );
                        };
                    }
                break;
                default:
                    // leaf
                    if ( cfg.filter( v, vtype, o ) ) {
                        h += f + cfg.eq + encodeURIComponent( v ) + cfg.dl;
                    } else {
                        h += f + cfg.eq + cfg.dl;
                    }
                break;
            };
            return h;
        }
        ;
    return {

        clone : clone

        , improve : improve

        , mix : mix

        , update : update

        , flatten : function ( hash, opt ) {
            var  cfg = {
                    dl : '&'
                    , eq : '='
                    , filter : filter 
                }
                , cfg = update( cfg, opt || {} )
                , h = hash
                , k = null
                , f = {}
                , htype = otype( h )
                ;

           if ( htype === o.obj ) {
                if ( h.constructor === Object ) {
                    for ( k in h ) {
                        update( f, flatten( k, h[ k ] ) );
                    };
                }
            };
            return f;
        }

        , qs : function ( hash, opt ) {
            var  cfg = {
                    dl : '&'
                    , eq : '='
                    , filter : filter 
                }
                , cfg = update( cfg, opt || {} )
                , h = hash
                , k = null
                , s = ''
                , htype = otype( h )
                ;

           if ( htype === o.obj ) {
                if ( h.constructor === Object ) {
                    for ( k in h ) {
                        s += qs( k, h[ k ], cfg );
                    };
                }
            };
            // remove trailing '&'
            return s.slice( 0, -1 );
        }

    };

} )();
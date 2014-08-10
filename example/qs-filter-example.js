var log = console.log
    , util = require( 'util')
    , Bolgia = require( '../' )
    , o1 = {
        0 : 0
        , a : null
        , b : undefined
        , c : Infinity
        , d : new Date( '1913' )
        , e : NaN
        , f : function () {}
        , g : 0
        , h : { prop1 : 'hello', prop2 : 'bye', prop3 :  [ 'hi' ] }
        , l : [ 1, undefined, 3, [ 'a', 'b', 'c' ] ]
        , r : /zZzz/gim
    }
    , cfg = {
        filter : function ( v, vtype, o ) {
            // allow null types in querystring
            switch ( vtype ) {
                // case o.nul:
                case o.und:
                case o.fun:
                break;
                default:
                    return true;
            }
        },
        // use ';' for delimiting instead of '&'
        dl : ';'
    }
    , qstr = Bolgia.qs( o1, cfg );

log( '\n- hash o1:\n', util.inspect( o1, !true, null, true ) );

log( '\n- querystring o1:\n', util.inspect( qstr, !true, null, true ) );
var log = console.log
    , util = require( 'util')
    , Bolgia = require( '../' )
    , toArray = Bolgia.toArray
    , o = {
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
    , result = toArray( o, true )
    ;

log( '\n- hash o:\n', util.inspect( o, !true, null, true ) );
log( '\n- toArray(o):\n', util.inspect( result, !true, null, true ) );
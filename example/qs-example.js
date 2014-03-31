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
    , o2 = { el : 6, arr : [ 1, undefined, [ 3, [ 4, [ 5, 6, [ 7, [ 8, 9, 10 ] ] ] ] ] ] }
    , o3 = { a : { b1 : { k : 90, p : 89 }, b2: { j : 9 }, 'b=3' : { g : 1, h : 2 }, b4 : { c : { d1 : { e : 0 }, d2 : { f : 0 } } } } }
    , qstr1 = Bolgia.qs( o1 )
    , qstr2 = Bolgia.qs( o2 )
    , qstr3 = Bolgia.qs( o3 )
    ;

log( '\n- hash o1:\n', util.inspect( o1, !true, null, true ) );
log( '\n-> querystring o1:\n', util.inspect( qstr1, !true, null, true ) );

log( '\n- hash o2:\n', util.inspect( o2, !true, null, true ) );
log( '\n-> querystring o2:\n', util.inspect( qstr2, !true, null, true ) );

log( '\n- hash o3:\n', util.inspect( o3, !true, null, true ) );
log( '\n-> querystring o3:\n', util.inspect( qstr3, !true, null, true ) );
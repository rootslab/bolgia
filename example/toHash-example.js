var log = console.log
    , util = require( 'util')
    , Bolgia = require( '../' )
    , toHash = Bolgia.toHash
    , list = [
        0 , 0
        , 'a' , null
        , 'b' , undefined
        , 'c' , Infinity
        , 'd' , new Date( '1913' )
        , 'e' , NaN
        , 'f' , function () {}
        , 'g' , '9999'
        , 'h' , [ 'prop1', 'hello', 'prop2', 'bye', 'prop3', [ 'hi', 'bye' ] ]
        , 'l' , [ 1, undefined, 3, [ 'a', 'b', 'c', 'd' ], 'e' ]
        , 'r' , /zZzz/gim
    ]
    , result = toHash( list, true )
    ;

log( '\n- nested array:\n', util.inspect( list, !true, null, true ) );
log( '\n- toHash(nested array):\n', util.inspect( result, !true, null, true ) );
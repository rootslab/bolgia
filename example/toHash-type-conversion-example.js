var log = console.log
    , util = require( 'util')
    , Bolgia = require( '../' )
    , toHash = Bolgia.toHash
    , list = [
        'g' , '9999'
        , 'h' , [ 'prop1', new Buffer(0), 'prop2', new Buffer( '-123456' ), 'prop3', [ 'hi', new Date() ] ]
    ]
    , result = toHash( list, true, null, true )
    ;

log( '\n- nested array:\n', util.inspect( list, !true, null, true ) );
log( '\n- toHash(nested array) with type conversion:\n', util.inspect( result, !true, null, true ) );
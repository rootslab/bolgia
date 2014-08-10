/* 
 * Bolgia#reveal Example
 */

var log = console.log
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , reveal = Bolgia.reveal
    , isArray = Array.isArray
    // recursive conversion of items to Buffers
    , convert = function ( arr ) {
        var a = arr || []
            , alen = a.length
            , el = a[ 0 ]
            , i = 0
            ;
        for ( ; i < alen; el = a[ ++i ] ) {
            if ( isArray( el ) ) {
                convert( el );
                continue;
            }
            a[ i ] = new Buffer( String( el ) );
        }
        return a;
    }
    , nested_array = [
        [ '1309448221456', '111', [ 'ELMICANEDU' ] ]
        , [ '1309448128012', '1913', [ 'ELMIFRADELU', 'SCHEO', 'CIAO' ] ]
        , [ [ '0xaa', '-100', '+100', 'aa' ] ]
    ]
    , nested_data = convert( nested_array )
    , list = reveal( nested_data )
    ;

log( '\n- revealed array:\n' );
log( util.inspect( list, false, 2, true ), '\n' );
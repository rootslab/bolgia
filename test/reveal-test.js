#!/usr/bin/env node

/* 
 * Bolgia#reveal Test
 */

var log = console.log
    , assert = require( 'assert' )
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
            a[ i ] = el === null || el === undefined ? el : new Buffer( String( el ) );
        };
        return a;
    }
    , v1 = '1309448221456'
    , v2 = '111'
    , v3 = 'ELMICANEDU'
    , v4 = '1913'
    , v5 = 'ELMIFRADELU'
    , v6 = 'SCHEO'
    , v7 = 'CIAO'
    , v8 = 'MIAO'
    , v9 = '0xaa'
    , v10 = '-100'
    , v11 = '+100'
    , v12 = 'aa'
    , v13 = null
    , v14 = undefined
    , nested_array = [
        [ v1, v2, [ v3 ] ]
        , [ v4, v5, [ v6, v7, v8 ] ]
        , [ [ v9, v10, v11, v12, v13, v14 ] ]
    ]
    , nested_data = convert( nested_array )
    , expected_array = [
        [ +v1, +v2, [ v3 ] ]
        , [ +v4, v5, [ v6, v7, v8 ] ]
        , [ [ +v9, +v10, +v11, v12, v13, v14 ] ]
    ]
    , list = reveal( nested_data )
    ;

log( '- created a nested Array of Buffers.' );
log( '- array has been converted.' );
log( '- expected array:', util.inspect( list, false, 2, true ) );

log( '- deeply check results.' );
assert.deepEqual( nested_array, expected_array );

log( '- ok, results match. ' );
log( '- revealed array:', util.inspect( list, false, 2, true ) );
#!/usr/bin/env node

/* 
 * Bolgia#toString Test
 *
 * check if toString representation of NaN and '' is "[object Null]"
 *
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , obj = {
        'NaN' : NaN
        , 'empty string': ''
    }
    ;

log( '- test toString with NaN, expected result is [object Null]' );
assert.ok( Bolgia.toString( obj.NaN ) === Bolgia.circles.nul, 'wrong return type for NaN!' );

log( '- test toString with "", expected result is [object Null]' );
assert.ok( Bolgia.toString( obj[ 'empty string' ] ) === Bolgia.circles.nul, 'wrong type for empty string!' );

log( '- enable custom types for toString, test with NaN, expected result is [object NaN]' );
assert.ok( Bolgia.toString( obj.NaN, true ) === Bolgia.circles.nan, 'wrong return type for NaN!' );

log( '- test toString with "", expected result is [object NullString]' );
assert.ok( Bolgia.toString( obj[ 'empty string' ], true ) === Bolgia.circles.nst, 'wrong type for empty string!' );

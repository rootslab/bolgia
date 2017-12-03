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
    , toString = Bolgia.toString
    , ooo = Bolgia.circles
    , obj = {
        'NaN' : NaN
        , 'empty_string': ''
        , 'buffer' : new Buffer( 1 )
    }
    ;

log( '- test toString with NaN, expected result is [object Null]' );
assert.ok( toString( obj.NaN ) === ooo.nul, 'wrong return type for NaN!' );

log( '- test toString with "", expected result is [object Null]' );
assert.ok( toString( obj.empty_string ) === ooo.nul, 'wrong type for empty string!' );

log( '- enable custom types for toString, test with NaN, expected result is [object NaN]' );
assert.ok( toString( obj.NaN, true ) === ooo.nan, 'wrong return type for NaN!' );

log( '- test toString with "", expected result is [object NullString]' );
assert.ok( toString( obj.empty_string, true ) === ooo.nst, 'wrong type for empty string!' );

log( '- test toString with an Object, expected result is [object Object]' );
assert.ok( toString( {} ) === ooo.obj, 'wrong return type for Object!' );

log( '- test toString with a Buffer Object, expected result is [object Buffer]' );
assert.ok( toString( obj.buffer ) === ooo.buf, 'wrong return type for Buffer!' );

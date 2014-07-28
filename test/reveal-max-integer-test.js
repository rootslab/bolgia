#!/usr/bin/env node

/* 
 * max integer test (2^53 or 9007199254740992)
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , reveal = Bolgia.reveal
    , array = [ '9007199254740991', '9007199254740992', '-9007199254740991', '-9007199254740992' ]
    , expected = [ 9007199254740991, '9007199254740992', -9007199254740991, '-9007199254740992' ]
    ;

log( '- The out of range integers should not be converted to Numbers.' );
log( '- +/-9007199254740992 values should not be included.' );
assert.deepEqual( array, expected );

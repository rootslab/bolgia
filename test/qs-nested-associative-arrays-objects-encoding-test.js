#!/usr/bin/env node

/* 
 * Query String
 *
 * Nested Associative Arrays/Objects Encoding Test
 * Proper encoding for Arrays and Objects
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , o1 = {
        h : { 
            0 : 'a'
            , 1 : 'b'
            , 2 : 'c'
            , 3 : 'end'
            , 'zZz Zzz' : 'zZzzz'
        }
    }
    , o2 = {
       h : [ null, null, null, 'end' ]
    }
    , op = ( o2.h[ '0' ] = 'a' ) && ( o2.h[ 1 ] = 'b' ) && 
           ( o2.h[ '2' ] = 'c' ) && ( o2.h[ 'zZz Zzz' ] = 'zZzzz' ) &&
           true
    , result = 'h[0]=a&h[1]=b&h[2]=c&h[3]=end&h[zZz%20Zzz]=zZzzz'
    // build querystring with custom options
    , qstr1 = Bolgia.qs( o1 )
    , qstr2 = Bolgia.qs( o2 )
    ;


log( '- build querystring from an hash using default options' );

// log( '\n- hash o1:\n', util.inspect( o1, false, null, true ) );
// log( '\n- hash o2:\n', util.inspect( o2, false, null, true ) );
// log( '\n- querystring o1:\n', util.inspect( qstr1, !true, null, true ) );
// log( '\n- querystring o2:\n', util.inspect( qstr2, !true, null, true ) );

log( '- check if hash was properly encoded.' );
assert.ok( qstr1 === result, 'wrong result for querystring!\n result: "' + qstr1 + '"\n expected: "' + result + '"' );

log( '- check if associative array was properly encoded.' );
assert.ok( qstr1 === result, 'wrong result for querystring!\n result: "' + qstr2 + '"\n expected: "' + result + '"' );

log( '- check if results are the same.' );
assert.ok( qstr1 === qstr2, 'wrong result for querystring!\n qstr1: "' + qstr1 + '"\n qstr2: "' + qstr2 + '"' );

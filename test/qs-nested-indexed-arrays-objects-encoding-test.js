#!/usr/bin/env node

/*
 * Query String 
 *
 * Nested Indexed Arrays/Objects Encoding Test
 * Proper encoding for Arrays and Objects
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , o1 = {
        l : {
          0 : 'a'
          , 1 : 'b'
          , 2 : 'c'
        },
        m : {
          0 : {
            0 : 'a'
          }
          , 1 : {
            0 : 'b'
            , 1 : 'c'
          }
          , 2 : {
            'd' : 'e'
          }
        }
    }
    , o2 = {
        l : [ 'a', 'b', 'c' ],
        m : [ [ 'a' ], [ 'b', 'c' ], { 'd' : 'e' } ]
    }
    , result = 'l[0]=a&' +
               'l[1]=b&' +
               'l[2]=c&' +
               'm[0][0]=a&' +
               'm[1][0]=b&' +
               'm[1][1]=c&' +
               'm[2][d]=e'
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

log( '- check if indexed array was properly encoded.' );
assert.ok( qstr1 === result, 'wrong result for querystring!\n result: "' + qstr2 + '"\n expected: "' + result + '"' );

log( '- check if results are the same.' );
assert.ok( qstr1 === qstr2, 'wrong result for querystring!\n qstr1: "' + qstr1 + '"\n qstr2: "' + qstr2 + '"' );
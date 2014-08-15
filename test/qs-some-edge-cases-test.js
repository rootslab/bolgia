#!/usr/bin/env node

/*
 * Query String 
 * An Edge Case
 *
 * Note: bug in node-querystring module:
 * - it doesn't stringify correctly a nested
 *   field null value,
 *   it produces:
 *      'h[0]=0&0=&h[1][1]=1'
 *   should be:
 *      'h[0]=0&h[1][0]=&h[1][1]=1'
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , o1 = {
        h : {
            0 : 0,
            1 : {
                0 : null,
                1 : 1
            }
        }
    }
    , o2 = {
       h : [ 0, [ null, 1 ] ]
    }
    , result = 'h[0]=0&h[1][0]=&h[1][1]=1'
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

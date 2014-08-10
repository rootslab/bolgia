#!/usr/bin/env node

/*
 * Query String
 *
 * Proper Encoding Test
 * test weird fields/values containing 
 * spaces and special chars.
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , o1 = {
        'a=b' : 'c=d'
        , 'a null field' : 'a null value'
        , 'with spaces ' : ' '
        // 'node-querysting' module fails to parse this field/value properly
        , 'weird[0][' : '1]=a'
        , 'regular expression' : /zZzz/gim
    }
    , result = 'a%3Db=c%3Dd&' +
               'a%20null%20field=a%20null%20value&' +
               'with%20spaces%20=%20&' +
               'weird%5B0%5D%5B=1%5D%3Da&' +
               'regular%20expression=%2FzZzz%2Fgim'
    // build querystring with custom options
    , qstr = Bolgia.qs( o1 )
    ;

log( '- build querystring from an hash using default options' );

// log( '\n- hash o1:\n', util.inspect( o1, false, null, true ) );
// log( '\n- querystring o1:\n', util.inspect( qstr, !true, null, true ) );

log( '- check if weird fields was properly encoded.' );
assert.ok( qstr === result, 'wrong result for querystring!\n result: "' + qstr + '"\n expected: "' + result + '"' );

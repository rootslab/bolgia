#!/usr/bin/env node

/*
 * Query String
 * 
 * Custom Options Test
 *
 * Use a custom delimiter ( ';' instead of '&' ) and
 * a custom filter function that allows null values 
 * in querystring output
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , o1 = {
        0 : 0
        , a : null
        , b : undefined
        , c : Infinity
        , d : new Date( '1913' )
        , e : NaN
        , f : function () {}
        , g : 0
        , h : { prop1 : 'hello', prop2 : 'bye', prop3 :  [ 'hi' ] }
        , l : [ 1, undefined, 3, [ 'a', 'b', 'c' ] ]
        , r : /zZzz/gim
    }
    , cfg = {
        filter : function ( v, vtype, o ) {
            // allow null types in querystring
            switch ( vtype ) {
                // case o.nul:
                case o.und:
                case o.fun:
                break;
                default:
                    return true;
                break;
            };
        },
        // use ';' for delimiting instead of '&'
        dl : ';'
    }
    , result = '0=0;' +
            'a=null;' +
            'b=;' +
            'c=Infinity;' +
            'd=' + encodeURIComponent( new Date( '1913' ) ) + ';' +
            'e=NaN;' +
            'f=;' +
            'g=0;' +
            'h[prop1]=hello;' +
            'h[prop2]=bye;' +
            'h[prop3][0]=hi;' +
            'l[0]=1;' +
            'l[1]=;' +
            'l[2]=3;' +
            'l[3][0]=a;' +
            'l[3][1]=b;' +
            'l[3][2]=c;' +
            'r=%2FzZzz%2Fgim'
    // build querystring with custom options
    , qstr = Bolgia.qs( o1, cfg )
    ;

log( '- build querystring from an hash using custom optiions' );

// log( '\n- hash o1:\n', util.inspect( o1, false, null, true ) );
// log( '\n- querystring o1:\n', util.inspect( qstr, !true, null, true ) );

log( '- check if "&" are replaced with ";"' );
assert.ok( ( !~ qstr.indexOf( '&' ) ) && ( qstr.indexOf( ';' ) ), '& delimiters are not replaced by ";"!' );

log( '- check if "null" values was admitted' );
assert.ok( ~ qstr.indexOf( 'a=null;' ), 'null values should not be filtered!' );

log( '- check if "undefined" values was omitted.' );
assert.ok( ~ qstr.indexOf( 'b=;' ), 'undefined values should be filtered away!' );
assert.ok( ~ qstr.indexOf( 'l[1]=;' ), 'undefined values should be filtered away!' );

log( '- check if "function" values was omitted.' );
assert.ok( ~ qstr.indexOf( 'f=;' ), 'function values should be filtered away!' );

log( '- check if querystring was properly encoded.' );
assert.ok( qstr === result, 'wrong result for querystring!\n result: "' + qstr + '"\n expected: "' + result + '"' );
#!/usr/bin/env node

/* 
 * Bolgia#toArray Test
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , ooo = Bolgia.circles
    , toArray = Bolgia.toArray
    , toString = Bolgia.toString
    , o = {
        0 : 0
        , a : null
        , b : undefined
        , c : Infinity
        , g : 0
        , h : { prop1 : 'hello', prop2 : 'bye', prop3 :  [ 'hi' ] }
        , l : [ 1 , undefined, 3, [ 'a', 'b', 'c' ] ]
        , r : /zZzz/gim
    }
    , result =  [
        '0', 0
        , 'a', null
        , 'b', undefined
        , 'c', Infinity
        , 'g', 0
        , 'h', [
              'prop1', 'hello'
            , 'prop2', 'bye'
            , 'prop3', [ '0', 'hi' ] 
        ]
        , 'l', [ 
              '0', 1
            , '1', undefined
            , '2', 3
            , '3', [ '0', 'a', '1', 'b', '2', 'c' ]
        ]
        , 'r', /zZzz/gim
    ]
    , tresult = toArray( o, true )
    , i = 0
    , iarr = [ 1, 2, 3, 'fante', 'cavallo', 'e', 're' ]
    , rarr = toArray( iarr )
    , obj = { '!' : { 'embè' : '?' } }
    ;

log( '- test toArray() with a obj/hash.' );

log( '- obj/hash was recursively converted to an array.' );

log( '- check the result length, it should be doubled.' );
assert.equal( tresult.length, Object.keys( o ).length << 1 );

log( '- deeply check test result (%d items).', tresult.length );
assert.deepEqual( result, tresult );

log( '- deeply check for nested object absence in results (%d tests).', tresult.length );

for ( ; i < tresult.length; ++i ) {
    assert.ok( toString( tresult[ i ] ) !== ooo.obj );
};

log( '- check toArray() result with an indexed array.' );
assert.ok( rarr.length, iarr << 1 );

log( '- deeply check if every element was preceded by its index (%d tests),', rarr.length >> 1 );

i = 0;

for ( ; i < rarr.length; i += 2 ) {
    assert.equal( i >> 1, + rarr[ i ] );
};

log( '- check toArray() result with no recursion. Nested properties should be untouched.' );

rarr = toArray( obj );

assert.equal( rarr[ 1 ], obj[ rarr[ 0 ] ] );

log( '- deeply check results with weird arguments and no recursion (%d tests).', 10 );

assert.deepEqual( toArray(), [] );
assert.deepEqual( toArray( {} ), [] );
assert.deepEqual( toArray( null ), [] );
assert.deepEqual( toArray( undefined ), [] );
assert.deepEqual( toArray( NaN ), [] );
assert.deepEqual( toArray( [] ), [] );
assert.deepEqual( toArray( [ null ] ), [ '0', null ] );
assert.deepEqual( toArray( [ 'a' ] ), [ '0', 'a' ] );
assert.deepEqual( toArray( [{}] ), [ '0', {} ] );
assert.deepEqual( toArray( new Number( 44 ) ), [] );

log( '- deeply check results with weird arguments and recursion active (%d tests).', 10 );

assert.deepEqual( toArray( {}, true ), [] );
assert.deepEqual( toArray( null, true ), [] );
assert.deepEqual( toArray( undefined, true ), [] );
assert.deepEqual( toArray( NaN, true ), [] );
assert.deepEqual( toArray( [], true ), [] );
assert.deepEqual( toArray( [ null ], true ), [ '0', null ] );
assert.deepEqual( toArray( [ 'a' ], true ), [ '0', 'a' ] );
assert.deepEqual( toArray( [ {} ], true ), [ '0', {} ] );
assert.deepEqual( toArray( new Number( 44 ), true ), [] );
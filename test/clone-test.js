#!/usr/bin/env node

/* 
 * Clone Test
 *
 * NOTE: Don't use NaN values fot this test,
 * nodeJs assert.deepEqual returns error when
 * comparing NaN values.
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , obj = { 
        opta : {
            100 : 0
            , 200 : undefined
            , 400 : ''
            // , 500 : NaN
            , 600 : 'pippo'
            , date : new Date( '1222')
            , blah : [ { 1 : [ undefined, undefined, 22, 890 ] }, { 5 : 66 } ]
            , nah : [ undefined, 11, 90, 65756 ]
        }
        , optb : null
        , optc : [ { obj : null }, undefined, 444 ]
        , opte : [ undefined, undefined , { f : 11, j : 0, hhh : 100 } ]
        , optf : [ 10 ]
        , optg : new Date( '1913' )
        , opth : false
        , optz : /\d+(?!\.)/gim
    },
    cobj = Bolgia.clone( obj )
    ;

// log( '\n- SOURCE OBJECT:\n', util.inspect( obj, true, null, true ) );
// log( '\n- CLONED OBJECT:\n', util.inspect( cobj, true, null, true ) );

log( '- the object/hash has been (totally) cloned in a new object/hash.' );

log( '- test deep equality between objects.' ); 
assert.deepEqual( obj, cobj, 'error, resulting object is not a clone' );
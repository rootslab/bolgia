#!/usr/bin/env node

/*
 * Update Test
 *
 * NOTE: Don't use NaN values fot this test,
 * nodeJs assert.deepEqual returns error when
 * comparing NaN values.
 *
 * NOTE : functions are commented to avoid a 
 * deepEqual assertion error.
 */
var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , src = { 
        opta : {
            100 : undefined
            , 200 : { no : 0 }
            , 300 : 0
            , 400 : '400'
            , 500 : {}
            , date : new Date( '1913' )
            , blah : [
                { 1 : [ 100, 999, 777 ] }
                , { 5 : [ 'xyyyyy' ] }
            ]
            , nah : [ 11, 22, 33 ]
        }
        , optb : 6
        , optc : [ { obj : 1 }, 3, 789 ]
        , optd : 4
        , opte : [ undefined, 5, { f : 56, j : 7, k : 90 } ]
        , optf : [ 0, 1, 2 ]
        , optg : new Date( '1970' )
        , opth : true
        , opti : true
        // , optl : function ( l, m, n ) { return 0; }
        , optm : ( function () { return arguments; } )( 'arg1', 'arg2', 'arg3' )
        , optz : /zZzz/mig
    }
    , dest = { 
        opta : {
            100 : 0
            , 200 : undefined
            , 400 : ''
            , 500 : null
            , 600 : 'pippo'
            , date : new Date( '1222' )
            , blah : [
                { 1 : [ undefined, undefined, 1000, 890 ] },
                { 5 : 888 }
            ]
            , nah : [ undefined, '', 'due', 'tre', 90, 65756 ]
        }
        , optb : null
        , optc: [ { obj : null }, undefined, 444, 555 ]
        , opte : [ 4, undefined , { f : 11, j : 0, hhh : 100 } ]
        , optf : [ 10 ]
        , optg : new Date( '1913' )
        , opth : false
        // , optl : function ( a, b ) { return a + b; }
        , optm : [ undefined, 78, 'ttt', 'zzz', undefined, null ]
        , optz : /\d+(?!\.)/gim
    }
    // correct result object
    , result = {
        opta : {
            100 : 0
            , 200 : { no : 0 }
            , 300 : 0
            , 400 : '400'
            , 500 : {}
            , 600 : 'pippo'
            , date : new Date( '1913' )
            , blah : [
                { 1 : [ 100, 999, 777, 890 ] },
                { 5 : [ 'xyyyyy' ] }
            ]
            , nah : [ 11, 22, 33, 'tre', 90, 65756 ]
        }
        , optb : 6
        , optc: [ { obj : 1 }, 3, 789, 555 ]
        , optd : 4
        , opte : [ 4, 5, { f : 56, j : 7, hhh : 100,  k : 90 } ]
        , optf : [ 0, 1, 2 ]
        , optg : new Date( '1970' )
        , opth : true
        , opti : true
        // , , optl : function ( l, m, n ) { return 0; }
        , optm : [ 'arg1', 'arg2', 'arg3', 'zzz', undefined, null ]
        , optz : /zZzz/mig
    }
    , upd = Bolgia.update( dest, src )
    ;

// log( '\n - CORRECT RESULT:\n', util.inspect( result, true, null, true ) );
// log( '\n - UPDATED OBJECT:\n', util.inspect( upd, true, null, true ) );

log( '- destination object/hash has been (fully) updated with source object/hash.' );

log( '- test if the resulting and destination objects are not referencing the same variable in memory.' ); 
assert.ok( dest === upd, 'error, wtf?? updating failed, objects should be equal!' );

log( '- test the correctness of the resulting object.' ); 
assert.deepEqual( upd, result, 'error, resulting object is not correctly updated' );


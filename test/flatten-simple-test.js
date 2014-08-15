#!/usr/bin/env node

/* 
 * Bolgia#flatten Simple Test
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , inspect = util.inspect
    , Bolgia = require( '../' )
    , toString = Bolgia.toString
    , flatten = Bolgia.flatten
    , ooo = Bolgia.circles
    , obj = {
        1 : {
            'a' : null
        }
        , 2 : {
            'a' : {}
            , 'b' : {
                'feed' : 'beef'
                , 'blah' : 4
                , 'ciao' : null
            }
        }
        , 3 : {
            'a' : { 0 : undefined }
        }
        , 4 : []
        , 5 : [ 1, 2 ]
    }
    , expected = {
        '1[a]' : null
        , '2[b][feed]' : 'beef'
        , '2[b][blah]' : 4
        , '2[b][ciao]' : null
        , '3[a][0]' : undefined
        , '5[0]' : 1
        , '5[1]' : 2
    }

    ;

log( '- check #flatten result for:\n %s,\n - should be:\n %s.', inspect( obj, false, 10, true ), inspect( expected, false, 10, true ) );
assert.deepEqual( flatten( obj ), expected, 'got: ' + inspect( flatten( obj ), false, 10, true ) );
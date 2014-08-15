#!/usr/bin/env node

/* 
 * Bolgia#flatten and #count Simple Test
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , inspect = util.inspect
    , Bolgia = require( '../' )
    , toString = Bolgia.toString
    , flatten = Bolgia.flatten
    , count = Bolgia.count
    , ooo = Bolgia.circles
    , keys = Object.keys
    , obj = {
        1 : {
            'a' : null
        }
        , 2 : {
            // empty objects are not added
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
        // empty arrays are not added
        , 4 : []
        , 5 : [ 1, 2, 3, 4, 5 ]
        // pass Arguments type
        , weird : ( function () { return arguments; } )( [ 'a', 'r', 'g', 's' ] )
    }
    , expected = {
        '1[a]' : null
        , '2[b][feed]' : 'beef'
        , '2[b][blah]' : 4
        , '2[b][ciao]' : null
        , '3[a][0]' : undefined
        , '5[0]' : 1
        , '5[1]' : 2
        , '5[2]' : 3
        , '5[3]' : 4
        , '5[4]' : 5
        , 'weird[0][0]': 'a'
        , 'weird[0][1]': 'r'
        , 'weird[0][2]': 'g'
        , 'weird[0][3]': 's'
    }
    ;

log( '- check #flatten result for:\n %s,\n - expected result:\n %s.', inspect( obj, false, 10, true ), inspect( expected, false, 10, true ) );
assert.deepEqual( flatten( obj ), expected, 'got: ' + inspect( flatten( obj ), false, 10, true ) );

log( '- check if #count of source obj leafs is equal to %s.', inspect( keys( expected ).length ) );
assert.equal( keys( expected ).length, count( expected ) );
assert.equal( count( obj, true ), count( expected ) );
#!/usr/bin/env node

/* 
 * Bolgia#mix Simple Test
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , inspect = util.inspect
    , Bolgia = require( '../' )
    , dest = {
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
        , 4 : [ 5 ]
        , 5 : {}
        , 'iwillsurvive' : '!'
    }
    , src = {
        1 : null
        , 2 : {
            'a' : {}
            , 'b' : {
                'feed' : {}
                , 'blah' : 6
                , 'ciao' : 'miao'
            }
        }
        , 3 : {
            'a' : { 0 : undefined }
        }
        , 4 : [ 56, 11 ]
        , 5 : [ 1, 2, 3, 4, 5 ]
        // pass Arguments type
        , weird : ( function () { return arguments; } )( [ 'a', 'r', 'g', 's' ] )
    }
    , expected = {
        1 : null
        , 2 : {
            'a' : {}
            , 'b' : {
                'feed' : {}
                , 'blah' : 6
                , 'ciao' : 'miao'
            }
        }
        , 3 : {
            'a' : { 0 : undefined }
        }
        , 4 : [ 56, 11 ]
        , 5 : [ 1, 2, 3, 4, 5 ]
        // pass Arguments type
        , weird : ( function () { return arguments; } )( [ 'a', 'r', 'g', 's' ] )
        , 'iwillsurvive' : '!'
    }
    ;

log( '- check #mix result between to object, should be:\n %s\n', inspect( expected, false, 10, true ) );
assert.deepEqual( Bolgia.mix( dest, src ), expected, 'got: ' + inspect( dest, false, 10, true ) );

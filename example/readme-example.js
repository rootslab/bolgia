var log = console.log
    , util = require( 'util' )
    , Bolgia = require( '../' )

    // define a default configuration object/hash:_
    , cfg = {
        letters : [ 'aaa', 'bbb', 'ccc','ddd' ]
        , numbers : {
            1 : false
            , 2 : false
            , 3 : false
            , 4 : false
        }
       , hell : {
            h1 : {
                a : [ 'a1!', 'a2!', 'a3!' ]
                , b : [ 'b1!', 'b2!', 'b3!' ]
            }
           , h3 : {
                1 : 0
                , 2 : 0
            }
       }
    }
    ,
    // define a custom update object/hash:
    upd = {
        letters : [ undefined, 'BBB', 'CCC', undefined, 'EEE' ]
        , numbers : {
            1 : true
            , 3 : Infinity
            , 4 : null
        }
        , hell : {
            h1 : {
                a : [ undefined, 'A2!' ]
                , b : [ 'B1!', undefined, 'B3!' ]
                , e : [ undefined, 'E2!', 'E3!' ]
            }
            , h2 : 'BLAH'
            , h3 : {
                2 : new Date( '1913' )
            }
        }
    }
    ;

// update cfg with upd, and output results to console:

Bolgia.update( cfg, upd );

/* 
 * NOTE: sub-properties like arrays and hashes 
 * are not brutally overwritten, but finely updated
 */

log( util.inspect( cfg, !true, null, true ) );
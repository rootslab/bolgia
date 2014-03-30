var log = console.log
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , src_default = { 
        opta : {
            100 : undefined
            , 200 : { no : 0 }
            , 300 : 0
            , 400 : '400'
            , 500 : {}
            , date : new Date()
            , blah : [ { 1 : [ 97, 76, 4 ] }, { 5 : 6 } ]
            , nah : [ 23, 78, 89 ]

        }
        , optb : null
        , optc: [ { obj : 1 }, 3, 789 ]
        , optd : 4
        , opte : [ 3, 5 , { f : 56, j : 7, k : 90 } ]
        , optf : [ 0, 1, 2]
        , optg : new Date( '1970' )
        , opth : true
        , opti : true
        , optz : /zZzz/mig
    }
    , dest_custom = { 
        opta : {
            100 : null
            , 200 : undefined
            , 400 : ''
            , 500 : NaN
            , 600 : 'pippo'
            , date : new Date( '1970' )
            , blah : [ { 1 : [ undefined, undefined, 22 ] }, { 5 : 66 } ]
            , nah : [ undefined, 11 ]
        }
        , optb : null
        , optc: [ { obj : null } ]
        , opte : [ undefined, undefined , { f : 11, j : 0, hhh : 100 } ]
        , optf : [ 10 ]
        , optg : new Date( '1913' )
        , opth : false
        , optz : /\d+(?!\,)/gim
    };

log( '\n@SRC OBJ:\n', util.inspect( src_default, false, null, true ) );
log( '\n@DEST OBJ:\n', util.inspect( dest_custom, false, null, true ) );

var upd = Bolgia.improve( dest_custom, src_default );

log( '\n@DEST OBJ IMPROVED:\n', util.inspect( upd, false, null, true ) );

log( '\ndestination object improved?:', dest_custom === upd );

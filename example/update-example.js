var log = console.log
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , obj_default = { 
        debug : 'single:line',
        opta : {
            100 : undefined
            , 200 : { no : 0 }
            , 300 : 0
            , 400 : '400'
            , 500 : {}
            , date : new Date()
            , blah : [ { 1 : [ 97, 76, 4 ] }, { 5 : 6 } ]
            , nah : [ 23, 78, 89, undefined, null, 89898988 ]

        }
        , optb : 66
        , optc: [ { obj : 1 }, 3, 789 ]
        , optd : 4
        , opte : [ 3, 5, { f : 56, j : 7, k : 90 } ]
        , optf : [ 0, 1, 2 ]
        , optg : new Date( '1970' )
        , opth : true
        , opti : true
        , optz : /\d+(?!\.)/
    }
    , obj_custom = { 
        debug : 'info:line:pretty',
        opta : {
            100 : 0
            , 200 : undefined
            , 400 : ''
            , 500 : NaN
            , 600 : 'pippo'
            , date : new Date( '1222')
            , blah : [ { 1 : [ undefined, undefined, 22, 890 ] }, { 5 : 66 } ]
            , nah : [ undefined, 11, 90, 65756 ]
        }
        , optb : null
        , optc: [ { obj : null }, undefined, 444 ]
        , opte : [ undefined, undefined , { f : 11, j : 0, hhh : 100 } ]
        , optf : [ 10 ]
        , optg : new Date( '1913' )
        , opth : false
        , optz : /zZzz/mig
    };

log( '\n@UPDATE OBJ:\n', util.inspect( obj_custom, false, null, true ) );
log( '\n@DEFAULT OBJ:\n', util.inspect( obj_default, false, null, true ) );

var upd = Bolgia.update( obj_default, obj_custom );

log( '\n@DEFAULT OBJ UPDATED:\n', util.inspect( upd, false, null, true ) );

log( '\ndestination object updated?:', obj_default === upd );
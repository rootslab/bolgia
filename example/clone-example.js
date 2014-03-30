var log = console.log
    , util = require( 'util' )
    , Bolgia = require( '../' )
    , obj = { 
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
        , optz : /\d+(?!\.)/
    };

log( '\n@OBJ:\n', util.inspect( obj, false, null, true ) );

var cobj = Bolgia.clone( obj );

log( '\n@CLONED OBJ:\n', util.inspect( cobj, false, null, true ) );

log( '\nobject cloned?:', obj !== cobj );
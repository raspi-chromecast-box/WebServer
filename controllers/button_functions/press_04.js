const child = require( "child_process" );
const exec = child.execSync;

function EXEC( command ) {
    try {
        let result;
        try { result = exec( command ); }
        catch( error ) { console.log( error ); return false; }
        if ( result ) {
            result = result.toString();
            if ( result ) {
                result = result.trim();
                console.log( result );
            }
        }
        return true;
    }
    catch( error ) { console.log( error ); return false; }
};

function PRESS_BUTTON_4() {
    //EXEC( "youtube-dl -o - https://www.youtube.com/watch?v=_dypVv0NouI | castnow --address 192.168.1.101 --quiet -" )
    EXEC( "/home/morphs/WORKSPACE/NODE/Commands/YouTube/Play.py '_dypVv0NouI'" )
}
module.exports = PRESS_BUTTON_4;
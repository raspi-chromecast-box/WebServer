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

function PRESS_BUTTON_3() {
    EXEC( "castnow --address 192.168.1.101 `youtube-dl -g https://www.twitch.tv/chessbrah`" )
}
module.exports = PRESS_BUTTON_3;
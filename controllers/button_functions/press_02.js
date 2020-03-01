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

function PRESS_BUTTON_2() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py --uri 'spotify:playlist:4PYhhcYPgUi9LXU9uiEATe'" )
}
module.exports = PRESS_BUTTON_2;
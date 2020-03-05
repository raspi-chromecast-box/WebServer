const child = require( "child_process" );
const exec = child.execSync;
const RMU = require( "redis-manager-utils" );


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

function PRESS_BUTTON_1() {
	return new Promise( async function( resolve , reject ) {
		try {
			console.log( "Here ??" );
			const db = new RMU( 1 );
			await db.init();
			const next_playlist = await db.nextInCircularList( "SPOTIFY.PLAYLISTS.GENRES.FUN" );
			EXEC( `/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py --uri '${ next_playlist[ 0 ] }'` );
			await db.keySet( "STATE.CURRENT_MODE" , "SPOTIFY" );
			await db.quit();
			resolve();
			return;
		}
		catch( error ) { console.log( error ); reject( error ); return; }
	});
}
module.exports = PRESS_BUTTON_1;
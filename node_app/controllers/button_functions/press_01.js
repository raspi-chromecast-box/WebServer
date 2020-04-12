const child = require( "child_process" );
const exec = child.exec;
const RMU = require( "redis-manager-utils" );

function EXEC( command ) {
	try {
		exec( command , ( error , stdout , stderr ) => {
			if ( error ) {
				console.log(`exec error: ${error}`);
				return false;
			}
			if ( stderr ) {
				console.log(`stderr: ${stderr}`);
				return false;
			}
			console.log(`stdout: ${stdout}`);
			return true;
		});
	}
	catch( error ) { console.log( error ); return false; }
};

function PRESS_BUTTON_1() {
	return new Promise( async function( resolve , reject ) {
		try {
			console.log( "PRESS_BUTTON_1()" );

			// 1.) Init Redis
			const db = new RMU( 1 );
			await db.init();

			// 2.) Perform Specific Button Action
			const next_playlist = await db.nextInCircularList( "SPOTIFY.PLAYLISTS.GENRES.FUN" );

			// 3.) Compute New State
			await db.listRPUSH( "STATE.ACTIONS" , "SPOTIFY" );
			//const state_action_length = parseInt( await db.listGetLength( "STATE.ACTIONS" ) );
			//if ( state_action_length > 100 ) { await db.listLPOP( "STATE.ACTIONS" ); }

			const chromecast_output_ip = await db.keyGet( "STATE.CHROMECAST_OUTPUT.IP" );
			EXEC( `/home/node_app/commands/Spotify/Play.py '${chromecast_output_ip}' '${ next_playlist[ 0 ] }' true` );

			// 5.) Save State
			//await db.keySet( "STATE" , JSON.stringify( state ) );

			// 6.) Close Redis
			await db.quit();

			resolve();
			return;
		}
		catch( error ) { console.log( error ); reject( error ); return; }
	});
}
module.exports = PRESS_BUTTON_1;
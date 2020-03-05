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


function PRESS_BUTTON_10() {
	return new Promise( async function( resolve , reject ) {
		try {
			console.log( "Global Pause" );

			const db = new RMU( 1 );
			await db.init();

			const last_action = await db.listGetByIndex( "STATE.ACTIONS" , "-1" );
			let paused_resumed = await db.keyGet( "STATE.PAUSED_RESUMED" );
			if ( !paused_resumed ) { paused_resumed = "RESUMED"; }
			switch ( last_action ) {
				case "SPOTIFY":
					if ( paused_resumed === "RESUMED" ) {
						EXEC( `/home/morphs/WORKSPACE/NODE/Commands/Spotify/Pause.py` );
						await db.keySet( "STATE.PAUSED_RESUMED" , "PAUSED" );
						resolve();
						return;
					}
					if ( paused_resumed === "PAUSED" ) {
						EXEC( `/home/morphs/WORKSPACE/NODE/Commands/Spotify/Resume.py` );
						await db.keySet( "STATE.PAUSED_RESUMED" , "RESUMED" );
						resolve();
						return;
					}
					break;
				case "YOUTUBE":
					break;
				case "TWITCH":
					break;
				case "ODYSSEY":
					break;
				case "HULU":
					break;
				case "NETFLIX":
					break;
				case "DISNEY":
					break;
				default:
					break;
			}
			resolve( true );
			return;
		}
		catch( error ) { console.log( error ); reject( error ); return; }
	});
}
module.exports = PRESS_BUTTON_10;
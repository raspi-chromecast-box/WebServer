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

function PRESS_BUTTON_4() {
	return new Promise( async function( resolve , reject ) {
		try {
			console.log( "Global Previous" );

			const db = new RMU( 1 );
			await db.init();

			const last_action = await db.listGetByIndex( "STATE.ACTIONS" , "-1" );
			switch ( last_action ) {
				case "SPOTIFY":
					EXEC( `/home/node_app/commands/Spotify/Previous.py` );
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
module.exports = PRESS_BUTTON_4;
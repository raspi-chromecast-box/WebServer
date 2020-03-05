const child = require( "child_process" );
const exec = child.exec;

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


function PRESS_BUTTON_3() {
	EXEC( "castnow --address 192.168.1.101 `youtube-dl -g https://www.twitch.tv/chessbrah`" )
}
module.exports = PRESS_BUTTON_3;
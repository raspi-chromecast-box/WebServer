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

function PRESS_BUTTON_4() {
	//EXEC( "youtube-dl -o - https://www.youtube.com/watch?v=_dypVv0NouI | castnow --address 192.168.1.101 --quiet -" )
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/YouTube/Play.py '_dypVv0NouI'" )
}
module.exports = PRESS_BUTTON_4;
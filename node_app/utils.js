const child = require( "child_process" );
const exec = child.exec;
const RMU = require( "redis-manager-utils" );

function STORE_CONFIG_TO_REDIS( config ) {
	return new Promise( async ( resolve , reject ) => {
		try {

			const db = new RMU( 1 );
			await db.init();

			await db.keySet( "PERSONAL.EVERYTHING" , JSON.stringify( config.personal ) );
			await db.keySet( "PERSONAL.SPOTIFY" , JSON.stringify( config.personal.spotify ) );

			await db.keySet( "CONFIG.EVERYTHING" , JSON.stringify( config.config ) );
			await db.keySet( "CONFIG.EXPRESS.PORT" , config.config.express.port );
			await db.keySet( "CONFIG.CHROMECAST_OUTPUT.NAME" , config.config.chromecast_output.name );
			await db.keySet( "CONFIG.CHROMECAST_OUTPUT.UUID" , config.config.chromecast_output.uuid );

			resolve();
			return;
		}
		catch( error ) { console.log( error ); reject( error ); return; }
	});
}
module.exports.store_config_to_redis = STORE_CONFIG_TO_REDIS;

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
module.exports.exec = EXEC;
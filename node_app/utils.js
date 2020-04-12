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
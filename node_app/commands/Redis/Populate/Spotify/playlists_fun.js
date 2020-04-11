const process = require( "process" );
const path = require( "path" );
const child = require( "child_process" );
const global_package_path = child.spawnSync( "npm" , [ "root" , "-g" ] , { encoding: "utf8" } ).stdout.trim();
const RMU = require( path.join( global_package_path ,  "redis-manager-utils" ) );

const FUN_PLAYLIST_URIS = [
	"spotify:playlist:4PYhhcYPgUi9LXU9uiEATe" , // @643888850/2019
	"spotify:playlist:4PAFxoRd4X0iSgK2nxPc4A" , // @643888850/y
	"spotify:playlist:2mirfDGLUztsHkiDnXwHnG" , // @643888850/5
	"spotify:playlist:49PRFSfhTPOuA7c1oYebvP" , // @643888850/4
	"spotify:playlist:0vY8OyugUwu30hpd98nhE9" , // @643888850/3
	"spotify:playlist:0I0P2ua3jysiPT6BuBDP9e" , // @643888850/2
	"spotify:playlist:0WFPU4u9wg9iKb9Pvw0xno" , // @ceberous/rng

];

( async ()=> {

	const db = new RMU( 1 );
	await db.init();
	await db.listSetFromArray( "SPOTIFY.PLAYLISTS.GENRES.FUN" , FUN_PLAYLIST_URIS );
	await db.quit();

})();
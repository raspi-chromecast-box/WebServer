//const Status = require( "../functions/status.js" );
function sendJSONResponse( res , status , content ) { if ( status ) { res.status( status ); } res.json( content ); }

module.exports.get_status = async ( req , res )=> {
	console.log( "GET --> /commands/status/" );
	//const status = await Status();
	console.log( status );
	res.status( 200 );
	res.json( { result: "success" } );
};
function sendJSONResponse( res , status , content ) { if ( status ) { res.status( status ); } res.json( content ); }

module.exports.press = ( req , res )=> {
	console.log( "POST --> /button" );
	console.log( req.body )
	res.status( 200 );
	res.json( { result: "success" } );
};

module.exports.press_1 = ( req , res )=> {
	console.log( "GET --> /button/1" );
	res.status( 200 );
	res.json( { result: "Pressed Button 1!" } );
};

module.exports.press_2 = ( req , res )=> {
	console.log( "GET --> /button/2" );
	res.status( 200 );
	res.json( { result: "Pressed Button 2!" } );
};

module.exports.press_3 = ( req , res )=> {
	console.log( "GET --> /button/3" );
	res.status( 200 );
	res.json( { result: "Pressed Button 3!" } );
};

module.exports.press_4 = ( req , res )=> {
	console.log( "GET --> /button/4" );
	res.status( 200 );
	res.json( { result: "Pressed Button 4!" } );
};

module.exports.press_5 = ( req , res )=> {
	console.log( "GET --> /button/5" );
	res.status( 200 );
	res.json( { result: "Pressed Button 5!" } );
};

module.exports.press_6 = ( req , res )=> {
	console.log( "GET --> /button/6" );
	res.status( 200 );
	res.json( { result: "Pressed Button 6!" } );
};

module.exports.press_7 = ( req , res )=> {
	console.log( "GET --> /button/7" );
	res.status( 200 );
	res.json( { result: "Pressed Button 7!" } );
};

module.exports.press_8 = ( req , res )=> {
	console.log( "GET --> /button/8" );
	res.status( 200 );
	res.json( { result: "Pressed Button 8!" } );
};

module.exports.press_9 = ( req , res )=> {
	console.log( "GET --> /button/9" );
	res.status( 200 );
	res.json( { result: "Pressed Button 9!" } );
};

module.exports.press_10 = ( req , res )=> {
	console.log( "GET --> /button/10" );
	res.status( 200 );
	res.json( { result: "Pressed Button 10!" } );
};

module.exports.press_11 = ( req , res )=> {
	console.log( "GET --> /button/11" );
	res.status( 200 );
	res.json( { result: "Pressed Button 11!" } );
};

module.exports.press_12 = ( req , res )=> {
	console.log( "GET --> /button/12" );
	res.status( 200 );
	res.json( { result: "Pressed Button 12!" } );
};
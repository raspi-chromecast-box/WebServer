//function sendJSONResponse( res , status , content ) { if ( status ) { res.status( status ); } res.json( content ); }

const PRESS_BUTTON_1 = require( "./button_functions/press_01.js" );
const PRESS_BUTTON_2 = require( "./button_functions/press_02.js" );
const PRESS_BUTTON_3 = require( "./button_functions/press_03.js" );
const PRESS_BUTTON_4 = require( "./button_functions/press_04.js" );
const PRESS_BUTTON_5 = require( "./button_functions/press_05.js" );
const PRESS_BUTTON_6 = require( "./button_functions/press_06.js" );
const PRESS_BUTTON_7 = require( "./button_functions/press_07.js" );
const PRESS_BUTTON_8 = require( "./button_functions/press_08.js" );
const PRESS_BUTTON_9 = require( "./button_functions/press_09.js" );
const PRESS_BUTTON_10 = require( "./button_functions/press_10.js" );
const PRESS_BUTTON_11 = require( "./button_functions/press_11.js" );
const PRESS_BUTTON_12 = require( "./button_functions/press_12.js" );

const BUTTON_PRESS_MAP = {
	1: PRESS_BUTTON_1 ,
	2: PRESS_BUTTON_2 ,
	3: PRESS_BUTTON_3 ,
	4: PRESS_BUTTON_4 ,
	5: PRESS_BUTTON_5 ,
	6: PRESS_BUTTON_6 ,
	7: PRESS_BUTTON_7 ,
	8: PRESS_BUTTON_8 ,
	9: PRESS_BUTTON_9 ,
	10: PRESS_BUTTON_10 ,
	11: PRESS_BUTTON_11 ,
	12: PRESS_BUTTON_12 ,
}

module.exports.press = ( req , res )=> {
	console.log( "POST --> /button" );
	if ( req.body ) {
		console.log( req.body );
		if ( req.body.button_number ) {
			const button_number = parseInt( req.body.button_number );
			if ( BUTTON_PRESS_MAP[ button_number ] ) {
				BUTTON_PRESS_MAP[ button_number ]();
			}
		}
	}
	res.status( 200 );
	res.json( { result: "success" , "req.body": req.body } );
};

module.exports.press_1 = ( req , res )=> {
	console.log( "GET --> /button/1" );
	PRESS_BUTTON_1();
	res.status( 200 );
	res.json( { result: "Pressed Button 1!" } );
};

module.exports.press_2 = ( req , res )=> {
	console.log( "GET --> /button/2" );
	PRESS_BUTTON_2();
	res.status( 200 );
	res.json( { result: "Pressed Button 2!" } );
};

module.exports.press_3 = ( req , res )=> {
	console.log( "GET --> /button/3" );
	PRESS_BUTTON_3();
	res.status( 200 );
	res.json( { result: "Pressed Button 3!" } );
};

module.exports.press_4 = ( req , res )=> {
	console.log( "GET --> /button/4" );
	PRESS_BUTTON_4();
	res.status( 200 );
	res.json( { result: "Pressed Button 4!" } );
};

module.exports.press_5 = ( req , res )=> {
	console.log( "GET --> /button/5" );
	PRESS_BUTTON_5();
	res.status( 200 );
	res.json( { result: "Pressed Button 5!" } );
};

module.exports.press_6 = ( req , res )=> {
	console.log( "GET --> /button/6" );
	PRESS_BUTTON_6();
	res.status( 200 );
	res.json( { result: "Pressed Button 6!" } );
};

module.exports.press_7 = ( req , res )=> {
	console.log( "GET --> /button/7" );
	PRESS_BUTTON_7();
	res.status( 200 );
	res.json( { result: "Pressed Button 7!" } );
};

module.exports.press_8 = ( req , res )=> {
	console.log( "GET --> /button/8" );
	PRESS_BUTTON_8();
	res.status( 200 );
	res.json( { result: "Pressed Button 8!" } );
};

module.exports.press_9 = ( req , res )=> {
	console.log( "GET --> /button/9" );
	PRESS_BUTTON_9();
	res.status( 200 );
	res.json( { result: "Pressed Button 9!" } );
};

module.exports.press_10 = ( req , res )=> {
	console.log( "GET --> /button/10" );
	PRESS_BUTTON_10();
	res.status( 200 );
	res.json( { result: "Pressed Button 10!" } );
};

module.exports.press_11 = ( req , res )=> {
	console.log( "GET --> /button/11" );
	PRESS_BUTTON_11();
	res.status( 200 );
	res.json( { result: "Pressed Button 11!" } );
};

module.exports.press_12 = ( req , res )=> {
	console.log( "GET --> /button/12" );
	PRESS_BUTTON_12();
	res.status( 200 );
	res.json( { result: "Pressed Button 12!" } );
};
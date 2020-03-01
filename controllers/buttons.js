//function sendJSONResponse( res , status , content ) { if ( status ) { res.status( status ); } res.json( content ); }
const child = require( "child_process" );
const exec = child.execSync;

function EXEC( command ) {
	try {
		let result;
		try { result = exec( command ); }
		catch( error ) { console.log( error ); return false; }
		if ( result ) {
			result = result.toString();
			if ( result ) {
				result = result.trim();
				console.log( result );
			}
		}
		return true;
	}
	catch( error ) { console.log( error ); return false; }
};

function PRESS_BUTTON_1() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py" )
}

function PRESS_BUTTON_2() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py --uri 'spotify:playlist:4PYhhcYPgUi9LXU9uiEATe'" )
}

function PRESS_BUTTON_3() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py" )
}

function PRESS_BUTTON_4() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py" )
}

function PRESS_BUTTON_5() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py" )
}

function PRESS_BUTTON_6() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py" )
}

function PRESS_BUTTON_7() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py" )
}

function PRESS_BUTTON_8() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py" )
}

function PRESS_BUTTON_9() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py" )
}

function PRESS_BUTTON_10() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py" )
}

function PRESS_BUTTON_11() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py" )
}

function PRESS_BUTTON_12() {
	EXEC( "/home/morphs/WORKSPACE/NODE/Commands/Spotify/Play.py" )
}

module.exports.press = ( req , res )=> {
	console.log( "POST --> /button" );
	if ( req.body ) {
		if ( req.body.button_number ) {
			if ( req.body.button_number === "1" || req.body.button_number === 1 ) {
				PRESS_BUTTON_1();
			}
			if ( req.body.button_number === "2" || req.body.button_number === 2 ) {
				PRESS_BUTTON_1();
			}
			if ( req.body.button_number === "3" || req.body.button_number === 3 ) {
				PRESS_BUTTON_1();
			}
			if ( req.body.button_number === "4" || req.body.button_number === 4 ) {
				PRESS_BUTTON_1();
			}
			if ( req.body.button_number === "5" || req.body.button_number === 5 ) {
				PRESS_BUTTON_1();
			}
			if ( req.body.button_number === "6" || req.body.button_number === 6 ) {
				PRESS_BUTTON_1();
			}
			if ( req.body.button_number === "7" || req.body.button_number === 7 ) {
				PRESS_BUTTON_1();
			}
			if ( req.body.button_number === "8" || req.body.button_number === 8 ) {
				PRESS_BUTTON_1();
			}
			if ( req.body.button_number === "9" || req.body.button_number === 9 ) {
				PRESS_BUTTON_1();
			}
			if ( req.body.button_number === "10" || req.body.button_number === 10 ) {
				PRESS_BUTTON_1();
			}
			if ( req.body.button_number === "11" || req.body.button_number === 11 ) {
				PRESS_BUTTON_1();
			}
			if ( req.body.button_number === "12" || req.body.button_number === 12 ) {
				PRESS_BUTTON_1();
			}
		}
	}
	console.log( req.body );
	res.status( 200 );
	res.json( { result: "success" } );
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
const process = require( "process" );
const http = require( "http" )
const ip = require( "ip" );

process.on( "unhandledRejection" , function( reason , p ) {
    console.error( reason, "Unhandled Rejection at Promise" , p );
    console.trace();
    process.exit( 1 );
});
process.on( "uncaughtException" , function( err ) {
    console.error( err , "Uncaught Exception thrown" );
    console.trace();
    process.exit( 1 );
});

const port = process.env.PORT || 6969;
const express_app = require( "./express_app.js" );

( ()=> {

    const server = http.createServer( express_app );
    server.listen( port , () => {
        const localIP = ip.address();
        console.log( "\tServer Started on :" );
        console.log( "\thttp://" + localIP + ":" + port );
        console.log( "\t\t or" );
        console.log( "\thttp://localhost:" + port );
    });

})();
const express = require( "express" );
const router = express.Router();
const controller = require( "../controllers/commands.js" );

router.get( "/status" , controller.get_status );
// router.post( "/status" , controller.post_status );
// router.put( "/status" , controller.put_status );
// router.delete( "/status" , controller.delete_status );

module.exports = router;
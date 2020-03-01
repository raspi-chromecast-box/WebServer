const express = require( "express" );
const router = express.Router();
const controller = require( "../controllers/buttons.js" );

router.post( "/" , controller.press );
router.get( "/1" , controller.press_1 )
// router.put( "/status" , controller.put_status );
// router.delete( "/status" , controller.delete_status );

module.exports = router;
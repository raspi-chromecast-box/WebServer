const express = require( "express" );
const router = express.Router();
const controller = require( "../controllers/buttons.js" );

router.post( "/" , controller.press );
router.get( "/1" , controller.press_1 );
router.get( "/2" , controller.press_2 );
router.get( "/3" , controller.press_3 );
router.get( "/4" , controller.press_4 );
router.get( "/5" , controller.press_5 );
router.get( "/6" , controller.press_6 );
router.get( "/7" , controller.press_7 );
router.get( "/8" , controller.press_8 );
router.get( "/9" , controller.press_9 );
router.get( "/10" , controller.press_10 );
router.get( "/11" , controller.press_11 );
router.get( "/12" , controller.press_12 );

module.exports = router;
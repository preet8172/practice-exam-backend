const express = require ('express');
const router = express.Router ();
const  authcontroller = require ('../controllers/authcontrollers');

router.get( '/register', authcontroller.getRegister);
router.post('/register', authcontroller. register);
router.get ('/login', authcontroller.getlogin);
router.post ('login', authcontroller.login);
router.get ('logout',authcontroller.logout);

module.exports = router;    
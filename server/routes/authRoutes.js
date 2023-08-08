const router = require('express').Router();
const {getUser, registerUser, loginUser} = require('../controllers/authController')

router.get('/allusers', getUser)
router.post('/register', registerUser)
router.post('/login', loginUser )


module.exports = router;
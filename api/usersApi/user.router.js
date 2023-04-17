const {createUser,getUsers,getUserById,login}= require('./user.controller');
const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation') 

router.post('/createUser',checkToken,createUser)
router.get('/getAllUser',checkToken,getUsers)
router.get('/:id',checkToken,getUserById)
router.post('/login',login)
module.exports = router;
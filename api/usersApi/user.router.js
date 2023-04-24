const {createUser,getUsers,getUserById,login,deleteUserById,updateUserById,updateUserProfileById}= require('./user.controller');
const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation') 

router.post('/createUser',createUser)
router.get('/getAllUser',checkToken,getUsers)
router.get('/:id',checkToken,getUserById)
router.post('/login',login)
router.delete('/deleteUser/:id', deleteUserById);
router.put('/updateUser/:id', checkToken,updateUserById);
router.put('/updateUserProfile/:id', checkToken,updateUserProfileById); //needs testing


module.exports = router;

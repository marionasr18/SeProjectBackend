const {createUser,getUsers,getUserById,login,deleteUserById,updateUserById,updateUserProfileById,getUserByName, getUserByUsername}= require('./user.controller');
const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation') 

router.post('/createUser',createUser)
router.get('/getAllUser',getUsers)
router.get('/getUserById',checkToken,getUserById)
router.get('/getUser/:name',checkToken,getUserByName)   
router.get('/getUserByUsername/:name',getUserByUsername)   
router.post('/login',login)
router.delete('/deleteUser/:id', deleteUserById);
router.put('/updateUser/:id', checkToken,updateUserById);
router.post('/updateUserProfile', checkToken,updateUserProfileById); //needs testing


module.exports = router;

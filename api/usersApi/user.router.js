const {createUser,getUsers,getUserById,login}= require('./user.controller');
const router = require('express').Router();

router.post('/createUser',createUser)
router.get('/getAllUser',getUsers)
router.get('/:id',getUserById)
router.post('/login',login)
module.exports = router;
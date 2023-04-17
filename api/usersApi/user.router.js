const {createUser,getUsers,getUserById}= require('./user.controller');
const router = require('express').Router();

router.post('/createUser',createUser)
router.get('/getAllUser',getUsers)
router.get('/:id',getUserById)
module.exports = router;
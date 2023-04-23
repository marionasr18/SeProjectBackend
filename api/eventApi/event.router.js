const { createEvent, getEventToJoinnById, deleteEventById}= require('./event.controller');
const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation'); 



router.post('/createEvent',checkToken,createEvent)
// router.get('/getAllEvents',checkToken,getEvent)
router.get('/getEventToJoinById/:id', checkToken, getEventToJoinnById);
// router.get('/SportsName/:name', checkToken, getSportByName);
router.delete('/deleteEvent/:id',checkToken,deleteEventById);

module.exports = router;

//delete
//update

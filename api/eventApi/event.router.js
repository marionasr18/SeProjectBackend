const { createEvent, getEventToJoinnById, deleteEventById,requestToJoin, acceptOrDeclineRequest,getAllCreatedEvents,getRequestByEventId, viewRequestStatus}= require('./event.controller');
const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation'); 



router.post('/createEvent',checkToken,createEvent)
router.post('/requestToJoin',checkToken,requestToJoin)
router.post('/acceptDeclineRequest',checkToken,acceptOrDeclineRequest)
// router.get('/getAllEvents',checkToken,getEvent)
router.get('/getEventToJoinById/:id', checkToken, getEventToJoinnById);
router.get('/viewRequestStatus/:id', checkToken, viewRequestStatus);
router.get('/getAllCreatedEvents/:id', checkToken, getAllCreatedEvents);
router.get('/getRequestByEventId/:id', checkToken, getRequestByEventId);
// router.get('/SportsName/:name', checkToken, getSportByName);
router.delete('/deleteEvent/:id',checkToken,deleteEventById);

module.exports = router;

//delete
//update

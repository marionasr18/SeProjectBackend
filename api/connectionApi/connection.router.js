const {getMyFriends,sendFriendRequest, deleteAcceptedRequest,deletePendingRequest,getPendingRequest,getRequest,acceptFriendRequest,rejectFriendRequest}= require('./connection.controller');

const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation'); 

router.get('/friendRequests/pending/:id', checkToken, getPendingRequest);//zabatet
router.get('/getAllRequests',checkToken,getRequest) //zabta
router.get('/getMyFriends',checkToken,getMyFriends) //zabta
router.post('/sendFriendRequests', checkToken, sendFriendRequest); //zabatet
router.delete('/friendRequests/accepted/:id',checkToken, deleteAcceptedRequest); // btezbat bas 3al accepted but returns success if req is not accepted. Should be handled maybe with frontend.
router.delete('/friendRequests/pending/:id', checkToken,deletePendingRequest); // btezbat bas 3al accepted but returns success if req is not accepted. Should be handled maybe with frontend.
router.put('/friendRequests/accept/:id', checkToken,acceptFriendRequest);// works
router.put('/friendRequests/reject/:id', checkToken,rejectFriendRequest);// works bas I think useless, just delete request from db if rejected to allow requesting another time

module.exports = router;


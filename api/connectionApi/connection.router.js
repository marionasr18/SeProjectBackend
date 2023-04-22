const {sendFriendRequest, deleteAcceptedRequest,deletePendingRequest,getPendingRequest,getRequest}= require('./connection.controller');

const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation'); 

router.get('/friendRequests/pending/:userId', checkToken, getPendingRequest);//bada tozbit
router.get('/getAllRequests',checkToken,getRequest) //zabta
router.post('/sendFriendRequests', checkToken, sendFriendRequest); //bada tozbit
router.delete('/friendRequests/accepted/:id',checkToken, deleteAcceptedRequest); // btezbat bas 3al accepted but returns success if req is not accepted. Should be handled maybe with frontend.
router.delete('/friendRequests/pending/:id', checkToken,deletePendingRequest); // btezbat bas 3al accepted but returns success if req is not accepted. Should be handled maybe with frontend.


module.exports = router;


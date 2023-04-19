const {createSport,getSport,getSportById,getSportByName}= require('./sport.controller');
const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation'); 


router.post('/createSport',checkToken,createSport)
router.get('/getAllSports',checkToken,getSport)
router.get('/id/:id', checkToken, getSportById);
router.get('/name/:name', checkToken, getSportByName);

module.exports = router;

//delete
//update

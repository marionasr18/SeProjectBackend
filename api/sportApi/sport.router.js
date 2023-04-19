const {createSport,getSport,getSportById,getSportByName,deleteSportById}= require('./sport.controller');
const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation'); 



router.post('/createSport',checkToken,createSport)
router.get('/getAllSports',checkToken,getSport)
router.get('/SportsId/:id', checkToken, getSportById);
router.get('/SportsName/:name', checkToken, getSportByName);
router.delete('/deleteSport/:id',checkToken,deleteSportById);

module.exports = router;

//delete
//update

const {createSport,getSport,getSportById,getSportByName,deleteSportById}= require('./sport.controller');
const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation'); 



router.post('/createSport',createSport)
router.get('/getAllSports',getSport)
router.get('/SportsId/:id', getSportById);
router.get('/SportsName/:name', getSportByName);
router.delete('/deleteSport/:id',deleteSportById);

module.exports = router;


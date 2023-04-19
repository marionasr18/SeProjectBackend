const {createField,getField,getFieldById,getFieldByName,deleteFieldById}= require('./field.controller');
const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation'); 



router.post('/createField',checkToken,createField)
router.get('/getAllFields',checkToken,getField)
router.get('/FieldId/:id', checkToken, getFieldById);
router.get('/FieldName/:name', checkToken, getFieldByName);
router.delete('/deleteField/:id',checkToken,deleteFieldById);

module.exports = router;

//delete
//update

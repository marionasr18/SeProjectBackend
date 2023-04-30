const {createField,getField,getFieldById,getFieldByName,deleteFieldById}= require('./field.controller');
const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation'); 



router.post('/createField',createField)
router.get('/getAllFields',getField)
router.get('/FieldId/:id', getFieldById);
router.get('/FieldName/:name', getFieldByName);
router.delete('/deleteField/:id',deleteFieldById);

module.exports = router;

//delete
//update

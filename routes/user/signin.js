var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const User = require('../../model/user');

//router-> [POST]/user/signin
router.post('/', async(req, res)=>{
    try{
		const{email, password} = req.body;
        if(!email || !password){
            res.status(statusCode.OK).send(util.successFalse(statusCode.MORE_VALUE_NEED, resMessage.NULL_VALUE));
            return ;
        }
        
        User.login({email, password})
        .then(({code, json})=>res.status(code).send(json))
        .catch(err =>{
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        })

    }catch(err){
        console.log(err);
    }
});

module.exports = router;

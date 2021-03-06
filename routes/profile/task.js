var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const Profile = require('../../model/profile');
const authUtils = require('../../module/authUtils');
router.use('/',authUtils.isLoggedin);
//router-> [PUT]/profile/task
router.put('/', (req, res)=>{
    try{
        const userIdx = req.decoded.idx;

        const {task_one, task_two, task_three} = req.body;
        
        if(!task_one || !task_two || !task_three){
            res.status(statusCode.OK)
            .send(util.successFalse(resMessage.NULL_VALUE));

            return ;
        }
        Profile.task_update({userIdx, task_one, task_two, task_three})
        .then(({code, json})=> res.status(code).send(json))
        .catch(err=>{
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR,
                util.successFalse(resMessage.INTERNAL_SERVER_ERROR))
        })
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

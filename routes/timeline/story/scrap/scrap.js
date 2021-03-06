var express = require('express');
var router = express.Router({mergeParams: true});
const util = require('../../../../module/utils');
const statusCode = require('../../../../module/statusCode');
const resMessage = require('../../../../module/responseMessage');
const Scrap = require('../../../../model/scrap');
const au = require('../../../../module/authUtils');

router.use('/', au.isLoggedin);

//router-> [GET]/timeline/{timelineIdx}/story/{storyIdx}/scrap
router.get('/', (req, res)=>{
    try{
        const userIdx = req.decoded.idx;
        const {storyIdx} = req.params;
        Scrap.readAll(userIdx)
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

router.post('/', (req, res)=> {
    try{
        const userIdx = req.decoded.idx;
        const {storyIdx} = req.params;
        Scrap.create({userIdx, storyIdx})
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        });
    } catch(err) {
        console.log(err);
    }
});

//router-> [DELETE]/timeline/{timelineIdx}/story/{storyIdx}/scrap/{scrapIdx}
router.delete('/:scrapIdx', (req, res)=>{
    try{
        const userIdx = req.decoded.idx;
        const {storyIdx} = req.params;
        Scrap.delete({userIdx, storyIdx})
        .then(({code, json})=>{
            res.status(code).send(json);
        })
        .catch(err => {
            console.log(err);
            res.status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, resMessage.INTERNAL_SERVER_ERROR));
        });
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

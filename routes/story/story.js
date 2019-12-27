var express = require('express');
var router = express.Router();
const util = require('../../module/utils');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const story = require('../../model/story');

//router-> [GET]/story/{storyIdx}
router.get('/:storyIdx', async(req, res)=>{
    try{
        const storyIdx = req.params.storyIdx;
        const user = req.body.userIdx;
        story.story_content_read(user, storyIdx)
        .then(({code, json}) => {
            res.status(code).send(json);
        })
        .catch(err => {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(resMessage.INTERNAL_SERVER_ERROR));
        })
    }catch(err){
        console.log(err);
    }
});

//router-> [GET]/story/{category}
router.get('/:category', async(req, res)=>{
    try{

    }catch(err){
        console.log(err);
    }
});

module.exports = router;

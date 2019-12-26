const util = require('../module/utils');
const statusCode = require('../module/statusCode');
const resMessage = require('../module/responseMessage');
const db = require('../module/pool');

//create(회원가입,로그인->닉네임, id 둘다 중복 확인), signin(로그인), task_update(관심직군 수정), ability_update(보유역량 수정)
const USER = "회원가입";
const nick = "닉네임";
const email_c = "email";
const task = "관심직군";
const ability = "보유역량";
const table = 'user';
module.exports = {
    create:({name, password, salt, nickname, email, age, sex, phone}) =>{
        return new Promise(async (resolve, reject)=>{
            const checkEmailQuery = `SELECT email FROM user WHERE email = ?`;
            const checkEmailResult = await db.queryParam_Parse(checkEmailQuery, [email]);
            
            console.log(checkEmailResult)
            if(checkEmailResult.length != 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_X(email_c))
                });
                return ;
            }
            
            const checkNickQuery = `SELECT nickname FROM user WHERE nickname = ?`;
            const checkNickResult = await db.queryParam_Parse(checkNickQuery, [nickname]);

            if(checkNickResult.length != 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.NO_X(nick))
                });
                return ;
            }
            
            const field =  `name, password, salt, nickname, email, age, sex, phone`;
            //${name}','${password}','${salt}','${nickname}','${email}','${age}','${sex},'${phone}'
            const question = `?,?,?,?,?,?,?,?`;
            const values = [name, password, salt, nickname, email, age, sex, phone];
            const query = `INSERT INTO ${table} (${field}) VALUES(${question}) `;
    
            const result = await db.queryParam_Parse(query,values);
    
            if(!result || result.length == 0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.SIGNUP_FAIL)
                });
                return ;
            }
            
            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.SIGNUP_SUCCESS)
            })
        });
        
        
   },
    task_update:({task_one, task_two, task_three}) => {
         return new Promise(async(resolve, reject) => {
            const field = `task_one, task_two, task_three`;
            const question = `?,?,?`;
            const values = [task_one, task_two, task_three];
            const query = `INSERT INTO ${table} (${field}) VALUES (${question})`;

            const result = await db.queryParam_Parse(query, values);

            if(!result || result.length ==0){
                resolve({
                    code: statusCode.NOT_FOUND,
                    json: util.successFalse(resMessage.X_DELETE_FAIL(task))                });
                return ;
            }

            resolve({
                code: statusCode.OK,
                json: util.successTrue(resMessage.X_CREATE_SUCCESS(task))
            })
        });
    },
    ability_update:() => {

    },
    login:()=>{

    }
};
/**
 * 获取守望先锋英雄
 * @api {GET} /getAllData 获得某个英雄
 * @apiDescription 根据名字获得某个英雄
 * @apiName getAllData
 * @apiParam (path参数) {String} name 根据英雄名字输出英雄信息，如果为空则输出全部英雄信息
 * @apiParam (path参数) {Number/String} id 根据英雄ID输出英雄信息，如果为空则输出全部英雄信息
 * @apiParam (path参数) {String} sex 根据英雄SEX输出英雄信息，如果为空则输出全部英雄信息
 * @apiSampleRequest /getAllData
 * @apiGroup Hero
 * @apiVersion 1.0.0
 */

var express = require('express');
var router = express.Router();
var mysql =  require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'yang960309-*',
  database:'dashuaibi'
})

router.get('/', function(req, res, next) {
  let params = req.query;
  // 判断前端发送的参数是否为空，若为空则返回所有数据
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const element = params[key];
      if (element == "") {
        delete params[key]
      }
    }
  }
  let sql = Object.keys(params) == 0 ? mysql.format(`SELECT * FROM overwatch`) : mysql.format(`SELECT * FROM overwatch WHERE ?`,req.query);
  connection.query(sql, (error, results, fields) => {
    res.send(results);
  });
});

module.exports = router;
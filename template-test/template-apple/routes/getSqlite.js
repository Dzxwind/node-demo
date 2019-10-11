/**
 * 获取守望先锋英雄
 * @api {GET} /getSqlite 获取SQLite数据
 * @apiDescription 获取SQLite数据
 * @apiName getSqlite
 * @apiSampleRequest /getSqlite
 * @apiGroup SQLite
 * @apiVersion 1.0.0
 */
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
let liteData = [];


var db = new sqlite3.Database('db/front-end-autoconfig.db',sqlite3.OPEN_READWRITE);
db.all("SELECT * FROM CONFIG_PAGE ORDER BY SORT_NUM",(err,row) => {
  liteData = row;
})

router.get('/',(req,res,next) => {
  res.json(liteData);
})

module.exports = router;
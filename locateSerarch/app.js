const axios = require('axios');
const moment = require('moment');
const aMapKEY = "40e7ca9ac1694401b1a812376e61995e";
const bMapKEY = "vZOHQrkz1cOUZWWOZxCmnkV3IoU4pFU1";
const fs = require('fs')

let addressList = [
  "海盐馆",
  "北山街84号",
  "镜湖靠西冷桥",
  "金沙溪",
  "空疗品润茶楼",
  "霁虹桥",
  "马家湾",
  "长桥木桥",
  "长桥九曲桥",
]; 
axios.default.timeout = 10000;
// 135条是极限

let search = {
  aMapSearch() {
    let addressCity = "杭州";
    let addressArr = addressList.map(item => {
      return axios.get(encodeURI(`https://restapi.amap.com/v3/geocode/geo?address=${item}&city=${addressCity}&key=${aMapKEY}`));
    })
    axios.all(addressArr).then(axios.spread((...results) => {
      let data = results.map(item => item.data);
      returnData = data.map((item, index) => {
        if (item.geocodes.length > 0) {
          return {
            name: addressList[index],
            searchName:item.geocodes[0].formatted_address,
            position:item.geocodes[0].location.split(',')
          }
        } else {
          return {
            name: addressList[index],
            searchName:"找不到地点",
            position:"找不到地点"
          }
        }
      });
      let str_json = JSON.stringify(processData(returnData));
      fs.writeFile("./data/" + moment().format('YYYYMMDDHHmmss') + ".json", str_json, "utf8", () => {
        console.log("保存成功");
      })
    })).catch((...errors) => {
      console.log(errors);
      
    });
  },
  bMapSearch() {
    let addressArr = addressList.map(item => {
      return axios.get(encodeURI(`http://api.map.baidu.com/geocoder/v2/?address=${item}&output=json&ak=${bMapKEY}`));
    })
    axios.all(addressArr).then(axios.spread((...results) => {
      returnData = results.map((item,index) => {
        if (item.data.status != 0) {
          return {
            name: addressList[index],
            locate:"找不到地点"
          }
        } else {
          return {
            name: addressList[index],
            locate: [item.data.result.location.lng, item.data.result.location.lat]
          }
        }
      });
      let str_json = JSON.stringify(processData(returnData));
      fs.writeFile("./data2/" + moment().format('YYYYMMDDHHmmss') + ".json", str_json, "utf8", () => {
        console.log("保存成功");
      })
    }));
  }
}

function processData(data) {
  return data;
}

search.aMapSearch();
// search.bMapSearch();

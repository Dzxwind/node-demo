
const fs = require("fs")
let arr = []
fs.readdir('components', (err, fd) => {
  arr = fd;
  let str_json = JSON.stringify(arr);
  fs.writeFile("./fileName.json", str_json, "utf8", function() {
    console.log('save success');
  });
})


const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = '没想到吧！我就是单纯来耍你的！哈哈哈哈哈哈哈哈哈！';
});

console.log("服务启动");

app.listen(3000);
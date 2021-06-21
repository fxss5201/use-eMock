# eMock

使用 koa + mock.js 创建 mock 数据，项目中提供简单示例，并且可以将项目放在任何地方，启动就可以调试接口。

## start

`yarn dev` 实际执行的是 `nodemon`，使用 `nodemon.json` 配置文件，`nodemon.json`：

```js
{
  "watch": ["index.js", "controller.js", "global.js", "./controllers/*"]
}
```

`controller.js` 文件是用作自动获取 `controllers` 文件夹下的 `js` 文件，并自动注册为对应的路由。
`global.js` 文件用于存放公共内容，可以在全局中使用 `app.context.global = global`

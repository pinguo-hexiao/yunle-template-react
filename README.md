# front-server-koa
基于koa的reactjs, react-router, redux, immutablejs的前端开发框架
# 启动
###开发
1. npm i

2. npm run dev

3. ==> 🌎  Listening on port 5000. Open up http://localhost:5000/ in your browser.

###生产
1. npm i

2. npm run build

3. npm run start

4. ==> 🌎  Listening on port 8300. Open up http://localhost:8300/ in your browser.

## 目录结构

```
.
├── README.md           
├── dist                     // 项目build目录
├── config                   // 服务器配制目录
├── routes                   // koa路由目录
├── logs                     // 生产环境日志目录
├── src                      // 开发目录
│   ├── actions              // redux action目录
│   ├── assets               // css 和图片资源
│   ├── middleware           // redux 中间件目录
│   ├── components           // 组件
│   ├── reducers             // redux reducer目录
│   ├── store                // store配置
│   └── config               // api url等配置文件
│   └── constants            // redux types目录
│   └── routes               // react-router 路由配置目录
│   ├── util                 // 工具函数
│   └── views                // 页面目录
│   └── client.js            // 客户端入口
│   └── index.html           // html模板
├── test                     // 测试配置目录
├── webpack                  // Webpack配置目录
│   ├── webpack.base.config.js        // Webpack base 配置文件
│   ├── webpack.dev.config.js         // 开发环境的Webpack配置文件
│   ├── webpack.prod.config.js        // 生产环境的Webpack配置文件
├── .babelrc                 // babel配置文件
├── .eslintrc.js             // eslint配置文件
├── History.md               // 更新日志
├── nodemon.json             // nodemon配置文件
├── process.json             // pm2配置文件
├── server.js                // 项目server入口文件
├── webpack.config.js        // webpack.config配置文件
.
```

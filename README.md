# front-server-koa
基于koa的reactjs, react-router, redux, immutablejs的前端开发框架 
# koa
### 目录结构

```
.
├── README.md           
├── dist                     // 项目build目录
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
│   └── routes               // 路由配置目录
│   ├── util                 // 工具函数
│   └── views                // 页面目录
│   └── client.js            // 客户端入口
├── test                     // 测试配置目录
├── webpack                  // Webpack配置目录
│   ├── webpack.config.dev.client.js        // 开发的客户端Webpack配置文件
│   ├── webpack.config.prod.js              // 生产的Webpack配置文件
├── .eslintrc.js             // eslint配置文件
├── History.md               // 更新日志
├── nodemon.json             // nodemon配置文件
├── process.json             // pm2配置文件
├── server.js                // 项目server入口文件
.
```
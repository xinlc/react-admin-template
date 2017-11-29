
# react-admin-template
 后台前端模板，基于 react + redux + redux-saga + antd

## 使用
```bash
$ git clone https://github.com/xinlc/react-admin-template.git --depth=1
$ cd react-admin-template
$ npm install
$ npm start         # 访问 http://localhost:8000
```

更多信息请参考 [使用文档](http://pro.ant.design/docs/getting-started)。

## 构建

```bash
$ npm run build
```

## 部署
```bash
$ bash deploy.sh
```
## 目录结构
```
├── dist                     # 构建文件
├── mock                     # 本地模拟数据
├── src
│   ├── config               # 应用公用配置
│   ├── lib                  # 依赖, 工具库
│   ├── bundleTemplate       # 业务应用
│   │   ├── components       # 业务通用组件
│   │   ├── containers       # 组件容器，业务页面
│   │   ├── reducers         # redux
│   │   ├── services         # redux saga
│   │   ├── index.js         # bundle 入口
│   ├── theme.js             # 主题配置
│   ├── index.js             # 应用入口
│   ├── index.less           # 全局样式
│   ├── index.ejs            # HTML 模板
├── tests                    # 测试工具
├── README.md
└── package.json
```

## 模板
```
- Dashboard
  - 工作台
- 结果
  - 成功页
  - 失败页
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
- 帐户
  - 登录
  - 注册
  - 注册成功
```

## 兼容性

现代浏览器及 IE11。

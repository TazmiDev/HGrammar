# HGrammar - 搜索语法生成工具

HGrammar是一个基于Web的综合搜索语法生成工具，专为安全工作者设计。它可以快速生成各种搜索引擎的语法，包括Google、百度、360、FOFA、Hunter等，帮助安全工作者快速整理信息。

## 功能特性

- **模块化设计**: 每个搜索引擎独立模块，便于维护和扩展
- **多种搜索引擎支持**: Google、百度、360、FOFA、Hunter等
- **语法模板**: 预定义常用搜索语法模板
- **自定义语法**: 支持用户自定义搜索语法
- **批量生成**: 支持批量生成多个语法
- **导出功能**: 支持导出生成的语法

## 支持的搜索引擎

- **Google**: 支持各种Google搜索语法
- **百度**: 支持百度高级搜索语法
- **360搜索**: 支持360搜索引擎语法
- **FOFA**: 支持FOFA网络空间测绘语法
- **Hunter**: 支持Hunter威胁情报语法
- **Shodan**: 支持Shodan网络设备搜索语法

## 项目结构

```
HGrammar/
├── src/
│   ├── modules/          # 搜索引擎模块
│   │   ├── google.js
│   │   ├── baidu.js
│   │   ├── so360.js
│   │   ├── fofa.js
│   │   ├── hunter.js
│   │   └── shodan.js
│   ├── core/             # 核心功能
│   │   ├── generator.js
│   │   ├── quick-templates.js
│   │   ├── templates.js
│   │   └── utils.js
│   ├── ui/               # 用户界面
│   │   ├── style.css
│   │   └── script.js
│   └── data/             # 数据文件
│       └── templates.json
├── index.html            # 入口页面（已移至根目录）
├── package.json
└── README.md
```

## 安装依赖

```bash
npm install
```

## 开发启动

```bash
npm run build
npm start
```
访问：http://localhost:3000/index.html

## 构建发布

```bash
npm run build
npm start
```
压缩后的文件会生成在 `build/` 目录下。

## 访问方式

- 直接浏览器访问 `http://localhost:3000/`

## 注意事项

- **前端代码无法彻底隐藏**：所有HTML/JS/CSS代码用户都可以通过浏览器查看。请勿在前端存放任何敏感信息（如密钥、核心算法等）。
- **敏感逻辑请放在后端**：如需安全处理、鉴权、数据存储等，请自行开发后端API。
- **构建脚本仅做压缩混淆，不能防止源码泄露**。

## 贡献方式

欢迎提交PR或Issue！如需新增搜索引擎，只需在 `src/modules/` 下添加对应模块并实现标准接口。

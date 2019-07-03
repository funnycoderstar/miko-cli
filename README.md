# super-cli
super-cli

# 引用的一些包的用途
- [script-ext-html-webpack-plugin](https://github.com/numical/script-ext-html-webpack-plugin)通过脚本的不同部署选项增强html-webpack-plugin功能，包括'async'，'preload'，'prefetch'，'defer'，'module'，自定义属性和内联。
- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 轻量级CSS提取插件
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [deepmerge](https://github.com/TehShrike/deepmerge)深入合并两个或多个对象的可枚举属性。

- [commander.js](https://github.com/tj/commander.js/)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)：常用交互式命令行用户界面的集合。
- [shelljs](https://github.com/shelljs/shelljs)：node 中执行 shell 脚本
- [yo](https://github.com/yeoman/yo)
- [yeoman-generator](https://github.com/yeoman/generator-generator)
- [cross-spawn](https://github.com/moxystudio/node-cross-spawn)解决跨平台使用npm命令的问题的模块。
# 其他知识
## path中常用的路径
__dirname: 当前文件所在的`文件夹`的绝对路径
__filename: 当前文件所在的`文件`的绝对路径
cwd(Current Working Directory): 意思是当前工作目录，它是一个绝对路径，在node中可以使用`process.cwd()`获取 当前工作目录
./
../

其中前三个是绝对路径

path.resolve() 把一个路径序列解析成一个规范化的`绝对路径`, 和process.cwd()相比，这个方法的优势在于它还能根据当前工作目录往下拼接路径
path.join(): 连接任意多个路径字符串，要连接的多个路径可做为参数传入。

## npm link
假设项目是 my-peoject,需要用到一个独立的模块 my-utils模块

两个目录在一起
```js 
$ cd path/to/my-project
$ npm link path/to/my-utils
```
两个目录不在一起
```js
$ # 先去到模块目录，把它 link 到全局
$ cd path/to/my-utils
$ npm link
$
$ # 再去项目目录通过包名来 link
$ cd path/to/my-project
$ npm link my-utils
```
- 参考[你所不知道的模块调试技巧 - npm link ](https://github.com/atian25/blog/issues/17)

## 关于#!/usr/bin/env node

把这一行代码写在脚本中，使得操作系统把脚本当做可执行文件执行时，会找到对应的程序执行

## npm init -f
生成默认的package.json文件，无需手动填写。
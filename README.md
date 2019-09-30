## miko-cli
`miko-cli`一个用于生成常用的一个模板文件的`cli`工具。

目前支持一下模板：
- `vue`
- `vue-cli-plugin`
- `vuepress-lemon`
## 安装
```js
npm install -g miko-cli
# OR
yarn global add miko-cli
```
## 用法
```js

miko-cli create [dirname] [templateName]

```
- `dirname`: 生成项目的目录名称。可选参数，默认为当前目录 `./`。
- `templateName`： 选择成功的模板名称。可选参数。没有传入则需要选择 `vue`, `vue-cli-plugin`, `vuepress-lemon`

> 注意，cli工具在取命令行参数的时候是按照顺序来获取的， 所以一定要注意`[dirname]`和`[templateName]`
## demo
```js
miko-cli create myApp
cd myApp
npm run dev
```
## 如何在本地测试`miko-cli`工具
```bash
$ git clone https://github.com/funnycoderstar/miko-cli.git
$ cd miko-cli
$ npm i
```
- 在`miko-cli`目录下执行 `npm link`
- 创建`test`目录，进到`test`目录, 执行相关命令
   - `mkdir test`
   - `cd test`
   - `miko-cli create`
   - `miko-cli dev 或者 npm run dev`
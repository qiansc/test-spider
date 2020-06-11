# 说明

## 背景

小甲负责审核新闻资源http://106.12.192.227:3000/
最近领导要求他时刻关注资源有没有新增，以便及时审核，他很苦恼一直开着手机电脑刷页面，向你求助写一段程序，当有新的资源出现时能够及时提示他。

技术描述：
现在有一个资源网页
http://106.12.192.227:3000/
里面包含一些资源号（mxxxxxxxx），资源号随时会新增一些（新增的位置不定，但旧资源不会删除）。请编写一个爬虫，每次执行时检查这个页面，当有资源新增时，完成下面目标中的操作。



## Checkpoint 1

> 现场完成此目标获得★

每次运行完，如果有新增资源号，请将其写入data/output.data，如：

```
m91781946464
m91781946462
```
如果没新增，不必改变文件内容。

> 举例：第一次执行时，output.data里是全量的资源号；第二次执行，output.data里内容不变；第三次执行前资源号新增m8888888和m999999，执行后output.data里为m8888888和m999999。

## Checkpoint 2

> 在完成Checkpoint 1基础上，继续完成此处目标可以获得★

* 实现日志功能，当异常时记录警告和错误(日志存放在log/下)
* 能够同时支持更多类型的接口
  * http://106.12.192.227:3000/json
  * http://106.12.192.227:3000/list

## Checkpoint 3（T3~T4限定）

> 在完成Checkpoint 2基础上，完成以下可以获得★★

* 增加测试工具jest、测试覆盖率工具coveralls，参考https://github.com/searchfe/makit
* 测试覆盖率100%


## Checkpoint 4（T3~T4限定）

> 在完成Checkpoint 3基础上，完成以下可以获得★

* 在github上实现持续集成，展现测试覆盖率（请fork到自己代码仓库实现），参考https://github.com/searchfe/makit

## 提交代码

完成Checkpoint 1 & 2 请将代码提交到分支~

```
git push origin HEAD:yourname
```

完成Checkpoint 3 & 4 请提交到自己fork的仓库

## 提示

现在src下有一个初始项目，做了少量工作

* npm install
* src目录下已经有初始代码了，通过npm run start 或 node_modules/.bin/ts-node src/index.ts均可执行，目前执行的结果是显示http://106.12.192.227:3000/
的内容
* fetch-data.ts 已经写好了请求网页逻辑
* 你可以从init.ts 开始你的编写
* 每次抓取执行完毕，你可能需要存储当前已有的资源号，请放在data/existence.data
* 文件操作参考writeFileSync, readFileSync| https://www.runoob.com/nodejs/nodejs-fs.html
* 如果你需要测试，可以用自己的方法（mock接口）或本地API如下：
```bash
cd server
npm install
npm start

# http://localhost:3000/list
# 修改server/example.data模拟新增数据
```

* 循环执行的逻辑不必实现
* 你也可以改变现有的任何内容，或者不使用ts，只要达成目标并且合理！


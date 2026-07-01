# 项目长期记忆

## 项目概况
- 项目名：my personal website（个人主页）
- 框架：React + Vite + TypeScript + Tailwind CSS
- 字体：LXGW WenKai（霞鹜文楷）
- 部署：GitHub仓库 lemon0419/lemon-personal-website → EdgeOne Pages自动部署
- 本地路径：E:\个人\my personal website

## 用户信息
- 姓名：张巧楠
- 邮箱：490348253@qq.com
- 小红书：似我随性
- GitHub用户名：lemon0419

## 关键组件
- SplashPage.tsx：开场动画（手绘风透视房间+长发戴眼镜女孩）
- HomePage.tsx：主页（时间轴、作品集、联系方式、数字分身聊天）
- DigitalTwinChat.tsx：数字分身聊天（SYSTEM_PROMPT含联系方式和作品信息）
- ContactDock.tsx：左下角联系方式悬浮栏
- PortfolioSection.tsx：作品集网格
- FloatingDiscPlayer.tsx：浮动唱片机音乐播放器

## Git工作流
- 分支：master
- 远程：https://github.com/lemon0419/lemon-personal-website.git
- 构建命令：`npx vite build`（不用tsc -b，会报错）
- 输出目录：dist
- push后EdgeOne Pages自动构建部署

## 注意事项
- package.json中name仍为miaoda-react-admin（导出平台遗留）
- 曾有nul文件导致git报错，已删除
- vite.config.ts中排除了public/music/目录的watch

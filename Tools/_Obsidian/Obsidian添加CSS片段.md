---
tags:
  - Tutorial
  - Code
---
## 基本操作
1. 新建一个css文件
2. 将如下的代码放到css文件中：
1. 打开设置，进入*外观*，找到*CSS代码片段*的位置
	![[Pasted image 20240728161345.png|500]]
1. 点击上图的文件夹，将CSS文件放到这个文件夹中，然后启用这个css即可
## 代码
### 图片及表格居中
```
img {
	display: block !important;
	margin-left: auto !important;
	margin-right: auto !important;
}
 .markdown-source-view.mod-cm6 .cm-content > * {
	margin: auto auto !important;
}

table { 
	line-height: 120%;
	margin-left: auto!important;
	margin-right: auto!important;
} 
.markdown-preview-view table { 
	margin-left: auto; 
	margin-right: auto; 
}
```

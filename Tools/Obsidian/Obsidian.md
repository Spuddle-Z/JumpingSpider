---
tags:
  - Tutorial
---
## 语法
### 链接
- `[[note#title^block|name]]`：链接到笔记note的标题title的block块处，并命名为name
- `[name](link)`：链接到外部链接link，并命名为name
### Callout
```
> [!tag] title
> text
> text
```

## 快捷键

| 快捷键 ^dyo1vs              | 功能           | 所属插件或功能                   |
| ------------------------ | ------------ | ------------------------- |
| `Ctrl + ~`               | 打开设置         |                           |
| `Ctrl + Shift + ~`       | 打开命令行        |                           |
| `Ctrl + f`               | 查找与替换        |                           |
| `Ctrl + j`               | 切换编辑与预览模式    |                           |
| `Ctrl + n`               | 打开新标签页       |                           |
| `Alt + o`                | 前进           |                           |
| `Alt + u`                | 返回           |                           |
| `Ctrl + Shift + f`       | 在所有文件中搜索     |                           |
| `Ctrl + Shift + j`       | 导出为PDF       |                           |
| `Ctrl + Shift + n`       | 新建笔记         |                           |
| `Ctrl + Shift + O`       | 打开其它仓库       |                           |
| `Ctrl + Shift + t`       | 加载模板         | 模板                        |
| `Ctrl + d`               | 左右分屏         | 工作区布局                     |
| `Ctrl + Shift + d`       | 上下分屏         | 工作区布局                     |
| `Alt + j`                | 聚焦左方标签页组     | 工作区布局                     |
| `Alt + l`                | 聚焦右方标签页组     | 工作区布局                     |
| `Ctrl + Shift + e`       | 打开文件列表       | 工作区布局                     |
| `Ctrl + Shift + b`       | 加载工作区布局      | 工作区布局                     |
| `Ctrl + l`               | 插入内部链接       | 编辑文本                      |
| `Ctrl + u`               | 选中文本添加/去掉删除线 | 编辑文本                      |
| `Ctrl + ;`               | 增加文档属性       | 编辑文本                      |
| `Alt + 1-6`              | 设此行为1-6级标题   | 编辑文本                      |
| `Alt + i`                | 光标所在行与上一行交换  | 编辑文本                      |
| `Alt + k`                | 光标所在行与下一行交换  | 编辑文本                      |
| `Ctrl + Alt + UpArrow`   | 在上一行加入光标     | 编辑文本                      |
| `Ctrl + Alt + DownArrow` | 在下一行加入光标     | 编辑文本                      |
| `Alt + q`                | 设此行为无序列表     | 编辑文本                      |
| `Alt + w`                | 设此行为有序列表     | 编辑文本                      |
| `Alt + e`                | 设此行为待办事项     | 编辑文本                      |
| `Ctrl + t`               | 插入表格         | 编辑文本                      |
| `Alt + z`                | 进入禅模式        | Focus Mode                |
| `Ctrl + m`               | 打开思维导图       | Mind Map                  |
| `Ctrl + p`               | 暂停/继续番茄钟     | Status bar Pomodoro Timer |
| `Ctrl + Shift + p`       | 重启番茄钟        | Status bar Pomodoro Timer |
| `Shift + Alt + i`        | 上移表格中的行      | Table                     |
| `Shift + Alt + k`        | 下移表格中的行      | Table                     |
| `Shift + Alt + e`        | 在上方插入行       | Table                     |
| `Shift + Alt + d`        | 在下方插入行       | Table                     |
| `Shift + Alt + s`        | 在左侧插入列       | Table                     |
| `Shift + Alt + f`        | 在右侧插入列       | Table                     |
| `Ctrl + q`               | 开启/关闭打字机模式   | Typewriter Scroll         |
## 插件
### Callout Manager
自定义callout样式。以下为常用的callout：
> [!example] 
> 记录一些例题或者实际应用。

> [!note] Note
> 记录一些不是非常重要的tips，或是对上下文内容的一个总结。

> [!theorem] 
> 记录数学定理。

> [!definition] 
> 记录某个概念的定义，最常用的一个callout。

> [!proof] 
> 记录数学定理的证明过程。

> [!caution] 
> 记录一些要点或易错点。

### Clear Unused Images
清理掉没有被引用的图片或文件，呼出命令面板后，输入以下指令可实现相关功能：
- 清理未被引用的图片：`Clear Unused Images: Clear Unused Images`
- 清理未被引用的附件：`Clear Unused Images: Clear Unused Attachments`

### Focus Mode
禅模式：收起侧边栏，并高亮当前所在行。

### GitHub Copilot
在Obsidian中能用GitHub Copilot。

### Iconize
允许在文件夹前标记icon。

### LaTeX Suite
虽然看似与LaTeX有关，但完全可以当作一个text snippet插件来使用。详见[[LaTeX Suite]]。

### Mind Map
给当前笔记绘制思维导图。

### Mousewheel Image Zoom
按住`Alt`并滚动鼠标滚轮来快捷调整图片大小。

### Quiet Outline
优化大纲栏，令其展开到当前标题。

### Status Bar Pomodoro Timer
在状态栏中加入番茄钟。

### Style Setting
改变具体的外观。

### Typewriter Scroll
总保持光标所在行位于屏幕中间。

### Vault Size History
记录仓库中文件数量变化曲线。

### Word Splitting for Simplified Chinese in Edit Mode and Vim Mode
优化Obsidian的中文分词。

## CSS片段
- [[Obsidian添加CSS片段|使图片居中显示]]
## 配色

| HEX       | Preview                             | Application      | 所属部分    |
| --------- | ----------------------------------- | ---------------- | ------- |
| `#404D6F` | <font size=5 color=#404D6F>■</font> | 基础色<br>高亮的边界     | 窗口      |
| `#2A2D3E` | <font size=5 color=#2A2D3E>■</font> | 初级背景             | 窗口      |
| `#1B1F2B` | <font size=5 color=#1B1F2B>■</font> | 二级背景             | 窗口      |
| `#393F57` | <font size=5 color=#393F57>■</font> | 激活的背景<br>滚动条与边界  | 窗口      |
| `#B6B8CF` | <font size=5 color=#B6B8CF>■</font> | 激活的边界            | 窗口      |
| `#73B4D4` | <font size=5 color=#73B4D4>■</font> | 激活的边与节点<br>打开的开关 | 关系图谱    |
| `#393F57` | <font size=5 color=#393F57>■</font> | 边                | 关系图谱    |
| `#97D8F8` | <font size=5 color=#97D8F8>■</font> | 节点               | 关系图谱    |
| `#DCDCAA` | <font size=5 color=#DCDCAA>■</font> | 标签节点             | 关系图谱    |
| `#404D6F` | <font size=5 color=#404D6F>■</font> | 附件节点             | 关系图谱    |
| `#97D8F8` | <font size=5 color=#97D8F8>■</font> | Knowledge节点      | 关系图谱    |
| `#9E86C8` | <font size=5 color=#9e86c8>■</font> | Tutorial节点       | 关系图谱    |
| `#73BBB2` | <font size=5 color=#73bbb2>■</font> | Code节点           | 关系图谱    |
| `#97D8F8` | <font size=5 color=#97D8F8>■</font> | 一级标题             | 文本      |
| `#85C6E6` | <font size=5 color=#85C6E6>■</font> | 二级标题             | 文本      |
| `#73B4D4` | <font size=5 color=#73B4D4>■</font> | 三级标题             | 文本      |
| `#61A2C2` | <font size=5 color=#61A2C2>■</font> | 四级标题             | 文本      |
| `#4F90B0` | <font size=5 color=#4F90B0>■</font> | 五级标题             | 文本      |
| `#3D7E9E` | <font size=5 color=#3D7E9E>■</font> | 六级标题             | 文本      |
| `#B6B8CF` | <font size=5 color=#B6B8CF>■</font> | 普通文本             | 文本      |
| `#3A3F55` | <font size=5 color=#3A3F55>■</font> | 被选中文本的底色         | 文本      |
| `#88A9F6` | <font size=5 color=#88A9F6>■</font> | 未激活的链接           | 文本      |
| `#FFCB6B` | <font size=5 color=#FFCB6B>■</font> | 激活的链接            | 文本      |
| `#1B1F2B` | <font size=5 color=#1B1F2B>■</font> | 高亮文本的底色          | 文本      |
| `#666E95` | <font size=5 color=#666E95>■</font> | 菜单等部分的文本         | 文本      |
| `#D0DFB8` | <font size=5 color=#D0DFB8>■</font> | 斜体文本             | 文本      |
| `#FFCB6B` | <font size=5 color=#FFCB6B>■</font> | 粗体文本             | 文本      |
| `#FFCB6B` | <font size=5 color=#FFCB6B>■</font> | Example          | Callout |
| `#C3E88D` | <font size=5 color=#c3e88d>■</font> | Definition       | Callout |
| `#73BBB2` | <font size=5 color=#73bbb2>■</font> | Theorem          | Callout |
| `#97D8F8` | <font size=5 color=#97d8f8>■</font> | Note             | Callout |
| `#9E86C8` | <font size=5 color=#9e86c8>■</font> | Proof            | Callout |
| `#666E95` | <font size=5 color=#666e95>■</font> | Quote            | Callout |
| `#D04255` | <font size=5 color=#D04255>■</font> | Caution          | Callout |
^i97pkp

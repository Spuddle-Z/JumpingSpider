---
tags:
  - Tutorial
  - Code
---
## 基本介绍
Vimium C是一款在Edge中支持全键盘操作浏览器的插件。
## 键位
| Keys | Functions   |
| ---- | ----------- |
| `i`  | 向上滚动        |
| `k`  | 向下滚动        |
| `I`  | 向上滚动半个页面的高度 |
| `K`  | 向下滚动半个页面的高度 |
| `j`  | 滚动到顶部       |
| `l`  | 滚动到底部       |
| `r`  | 刷新当前子页面     |
| `u`  | 返回上一页面      |
| `o`  | 前进到下一页面     |
| `f`  | 点击网页中的链接和按钮 |
| `F`  | 在新标签页中打开链接  |
| `g`  | 聚焦到输入框      |
| `w`  | 关闭当前标签页     |
| `W`  | 打开关闭的标签页    |
| `e`  | 上一个标签页      |
| `d`  | 下一个标签页      |
| `c`  | 复制当前链接      |
^3jyly4

## Code
```json
unmapAll                      # 取消所有映射

map i scrollUp                # 向上滚动
map k scrollDown              # 向下滚动
map I scrollPageUp            # 向上滚动半个页面的高度
map K scrollPageDown          # 向下滚动半个页面的高度
map j scrollToTop             # 滚动到顶部
map l scrollToBottom          # 滚动到底部

map r reload                  # 刷新当前子页面
map u goBack                  # 返回上一页面
map o goForward               # 前进到下一页面

map f LinkHints.activate      # 点击网页中的链接和按钮
map F LinkHints.activateOpenInNewForegroundTab
map g focusInput              # 聚焦到输入框

map w removeTab               # 关闭当前标签页
map W restoreTab              # 打开关闭的标签页
map e previousTab             # 上一个标签页
map d nextTab                 # 下一个标签页

map c copyCurrentUrl          # 复制当前链接
```
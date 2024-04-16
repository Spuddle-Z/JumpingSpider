---
tags:
  - Tutorial
  - Code
---
## 键位说明
### 特殊操作

| Hotkeys      | Functions     |
| ------------ | ------------- |
| `Caps + P`   | 将焦点所在页置顶      |
| `Caps + Q`   | 唤出Qbar        |
| `Caps + T`   | 将当前窗口设为透明     |
| `Caps + Tab` | 使用TabScript功能 |
^zvbulv

### 文档操作

| Hotkeys          | Original Keys               |
| ---------------- | --------------------------- |
| `Caps + I`       | `UpArrow`                   |
| `Caps + K`       | `DownArrow`                 |
| `Caps + J`       | `LeftArrow`                 |
| `Caps + L`       | `RightArrow`                |
| `Caps + U`       | `Ctrl + LeftArrow`          |
| `Caps + O`       | `Ctrl + RightArrow`         |
| `Caps + E`       | `Backspace`                 |
| `Caps + R`       | `Delete`                    |
| `Caps + H`       | `Home`                      |
| `Caps + ;`       | `End`                       |
| `Caps + Alt + I` | `Shift + UpArrow`           |
| `Caps + Alt + K` | `Shift + DownArrow`         |
| `Caps + Alt + J` | `Shift + LeftArrow`         |
| `Caps + Alt + L` | `Shift + RightArrow`        |
| `Caps + Alt + U` | `Ctrl + Shift + LeftArrow`  |
| `Caps + Alt + O` | `Ctrl + Shift + RightArrow` |
| `Caps + Alt + R` | `Shift + Delete`            |
| `Caps + Alt + H` | `Shift + Home`              |
| `Caps + Alt + ;` | `Shift + End`               |

^qi4ypa

### 鼠标操作

| Hotkeys        | Functions |
| -------------- | --------- |
| `Caps + Space` | 鼠标左键      |
| `Caps + .`     | 鼠标右键      |
| `Caps + W`     | 鼠标上移      |
| `Caps + S`     | 鼠标下移      |
| `Caps + A`     | 鼠标左移      |
| `Caps + D`     | 鼠标右移      |
| `Caps + ,`     | 鼠标滚轮向下    |
| `Caps + M`     | 鼠标滚轮向上    |

^yip6rv

## Qbar使用说明
Qbar可以通过`Caps + Q`键唤出，通过输入关键词来实现相关功能。
- 在以下第一张表格中的前缀后加入想要搜索的内容，即可到对应网页中进行搜索，若无前缀则默认使用必应搜索；
- 输入第二张表格中的关键词，即可执行相关任务。

| Prefix | Search Engine |
| ------ | ------------- |
| `B`    | 必应            |
| `BL`   | 哔哩哔哩          |
| `G`    | Google        |
| `GH`   | GitHub        |
| `T`    | 有道            |
| `YT`   | YouTube       |

| Key Words | Functions  |
| --------- | ---------- |
| `D`       | 打开草稿记事本    |
| `M`       | 播放纯音乐      |
| `G`       | 打开Google主页 |
| `GH`      | 打开GitHub主页 |
| `GLM`     | 打开智谱清言     |
## Code
```ini
;------------ Encoding: UTF-16 ------------
;请对照 CapsLock+settingsDemo.ini 来配置相关设置
[Global]
autostart=1
loadScript=scriptDemo.js

[QSearch]
default = http://cn.bing.com/search?q={q}
B       = http://cn.bing.com/search?q={q}
BL      = http://www.bilibili.com/search?keyword={q}
G       = http://www.google.com/search?q={q}
GH      = http://www.github.com/search?q={q}
T       = https://youdao.com/result?word={q}&lang=en
YT      = https://www.youtube.com/results?search_query={q}

[QRun]
D = D:/Hormuz/Draft.txt
M = D:/Life/Music/Peace.mp3

[QWeb]
G   = http://www.google.com
GH  = http://www.github.com
GLM = https://chatglm.cn/main/detail

[TabHotString]
tel = **此处省略电话号码**
eml = **此处省略常用邮箱**
id  = **此处省略身份证号**

[QStyle]
borderBackgroundColor=0x404040
borderRadius=12
textBackgroundColor=0xffffff
textColor=0x404040
textFontName=Consolas bold
textFontSize=16
listBackgroundColor=0x202020
listColor=0xc0c0c0

[TTranslate]
```
此处的键位映射保留两个版本：
- 此为全功能版本，该有的键位映射全部启用；
	```ini
	[Keys]
	press_caps = keyFunc_esc
	
	caps_a = keyfunc_mouse_left
	caps_b = keyFunc_doNothing
	caps_c = keyFunc_doNothing
	caps_d = keyfunc_mouse_right
	caps_e = keyFunc_backspace
	caps_f = keyFunc_doNothing
	caps_g = keyFunc_doNothing
	caps_h = keyFunc_home
	caps_i = keyFunc_moveUp
	caps_j = keyFunc_moveLeft
	caps_k = keyFunc_moveDown
	caps_l = keyFunc_moveRight
	caps_m = keyfunc_wheel_up
	caps_n = keyFunc_doNothing
	caps_o = keyFunc_moveWordRight
	caps_p = keyFunc_winPin
	caps_q = keyFunc_qbar
	caps_r = keyFunc_delete
	caps_s = keyfunc_mouse_down
	caps_t = keyFunc_winTransparent
	caps_u = keyFunc_moveWordLeft
	caps_v = keyFunc_doNothing
	caps_w = keyfunc_mouse_up
	caps_x = keyFunc_doNothing
	caps_y = keyFunc_doNothing
	caps_z = keyFunc_doNothing
	
	caps_1 = keyFunc_doNothing
	caps_2 = keyFunc_doNothing
	caps_3 = keyFunc_doNothing
	caps_4 = keyFunc_doNothing
	caps_5 = keyFunc_doNothing
	caps_6 = keyFunc_doNothing
	caps_7 = keyFunc_doNothing
	caps_8 = keyFunc_doNothing
	caps_9 = keyFunc_doNothing
	caps_0 = keyFunc_doNothing
	
	caps_minus     = keyFunc_doNothing
	caps_equal     = keyFunc_doNothing
	caps_backspace = keyFunc_doNothing
	
	caps_tab = keyFunc_tabScript
	
	caps_leftSquareBracket  = keyFunc_doNothing
	caps_rightSquareBracket = keyFunc_doNothing
	caps_backslash          = keyFunc_doNothing
	
	caps_semicolon = keyFunc_end
	caps_quote     = keyFunc_doNothing
	caps_enter     = keyFunc_doNothing
	
	caps_comma = keyfunc_wheel_down
	caps_dot   = keyfunc_click_right
	caps_slash = keyFunc_doNothing
	
	caps_space     = keyfunc_click_left
	caps_right_alt = keyFunc_doNothing
	
	caps_f1  = keyFunc_doNothing
	caps_f2  = keyFunc_doNothing
	caps_f3  = keyFunc_doNothing
	caps_f4  = keyFunc_doNothing
	caps_f5  = keyFunc_doNothing
	caps_f6  = keyFunc_doNothing
	caps_f7  = keyFunc_doNothing
	caps_f8  = keyFunc_doNothing
	caps_f9  = keyFunc_doNothing
	caps_f10 = keyFunc_doNothing
	caps_f11 = keyFunc_doNothing
	caps_f12 = keyFunc_doNothing
	
	caps_lalt_a = keyFunc_doNothing
	caps_lalt_b = keyFunc_doNothing
	caps_lalt_c = keyFunc_doNothing
	caps_lalt_d = keyFunc_doNothing
	caps_lalt_e = keyFunc_doNothing
	caps_lalt_f = keyFunc_doNothing
	caps_lalt_g = keyFunc_doNothing
	caps_lalt_h = keyFunc_selectHome
	caps_lalt_i = keyFunc_selectUp
	caps_lalt_j = keyFunc_selectLeft
	caps_lalt_k = keyFunc_selectDown
	caps_lalt_l = keyFunc_selectRight
	caps_lalt_m = keyFunc_doNothing
	caps_lalt_n = keyFunc_doNothing
	caps_lalt_o = keyFunc_selectWordRight
	caps_lalt_p = keyFunc_doNothing
	caps_lalt_q = keyFunc_doNothing
	caps_lalt_r = keyFunc_deleteLine
	caps_lalt_s = keyFunc_doNothing
	caps_lalt_t = keyFunc_doNothing
	caps_lalt_u = keyFunc_selectWordLeft
	caps_lalt_v = keyFunc_doNothing
	caps_lalt_w = keyFunc_doNothing
	caps_lalt_x = keyFunc_doNothing
	caps_lalt_y = keyFunc_doNothing
	caps_lalt_z = keyFunc_doNothing
	
	caps_lalt_1 = keyFunc_doNothing
	caps_lalt_2 = keyFunc_doNothing
	caps_lalt_3 = keyFunc_doNothing
	caps_lalt_4 = keyFunc_doNothing
	caps_lalt_5 = keyFunc_doNothing
	caps_lalt_6 = keyFunc_doNothing
	caps_lalt_7 = keyFunc_doNothing
	caps_lalt_8 = keyFunc_doNothing
	caps_lalt_9 = keyFunc_doNothing
	caps_lalt_0 = keyFunc_doNothing
	
	caps_lalt_minus     = keyFunc_doNothing
	caps_lalt_equal     = keyFunc_doNothing
	caps_lalt_backspace = keyFunc_doNothing
	
	caps_lalt_tab = keyFunc_doNothing
	
	caps_lalt_leftSquareBracket  = keyFunc_doNothing
	caps_lalt_rightSquareBracket = keyFunc_doNothing
	caps_lalt_backslash          = keyFunc_doNothing
	
	caps_lalt_semicolon = keyFunc_selectEnd
	caps_lalt_quote     = keyFunc_doNothing
	caps_lalt_enter     = keyFunc_doNothing
	
	caps_lalt_comma = keyFunc_doNothing
	caps_lalt_dot   = keyFunc_doNothing
	caps_lalt_slash = keyFunc_doNothing
	
	caps_lalt_space = keyFunc_doNothing
	```
- 第二个则去掉了除特殊操作外的全部键位映射，此版本用于习惯正常电脑上编辑文档的操作。
	```ini
	[Keys]
	press_caps = keyFunc_toggleCapsLock
	
	caps_a = keyFunc_doNothing
	caps_b = keyFunc_doNothing
	caps_c = keyFunc_doNothing
	caps_d = keyFunc_doNothing
	caps_e = keyFunc_doNothing
	caps_f = keyFunc_doNothing
	caps_g = keyFunc_doNothing
	caps_h = keyFunc_doNothing
	caps_i = keyFunc_doNothing
	caps_j = keyFunc_doNothing
	caps_k = keyFunc_doNothing
	caps_l = keyFunc_doNothing
	caps_m = keyFunc_doNothing
	caps_n = keyFunc_doNothing
	caps_o = keyFunc_doNothing
	caps_p = keyFunc_winPin
	caps_q = keyFunc_qbar
	caps_r = keyFunc_doNothing
	caps_s = keyFunc_doNothing
	caps_t = keyFunc_winTransparent
	caps_u = keyFunc_doNothing
	caps_v = keyFunc_doNothing
	caps_w = keyFunc_doNothing
	caps_x = keyFunc_doNothing
	caps_y = keyFunc_doNothing
	caps_z = keyFunc_doNothing
	
	caps_1 = keyFunc_doNothing
	caps_2 = keyFunc_doNothing
	caps_3 = keyFunc_doNothing
	caps_4 = keyFunc_doNothing
	caps_5 = keyFunc_doNothing
	caps_6 = keyFunc_doNothing
	caps_7 = keyFunc_doNothing
	caps_8 = keyFunc_doNothing
	caps_9 = keyFunc_doNothing
	caps_0 = keyFunc_doNothing
	
	caps_minus     = keyFunc_doNothing
	caps_equal     = keyFunc_doNothing
	caps_backspace = keyFunc_doNothing
	
	caps_tab = keyFunc_tabScript
	
	caps_leftSquareBracket  = keyFunc_doNothing
	caps_rightSquareBracket = keyFunc_doNothing
	caps_backslash          = keyFunc_doNothing
	
	caps_semicolon = keyFunc_doNothing
	caps_quote     = keyFunc_doNothing
	caps_enter     = keyFunc_doNothing
	
	caps_comma = keyFunc_doNothing
	caps_dot   = keyFunc_doNothing
	caps_slash = keyFunc_doNothing
	
	caps_space     = keyFunc_doNothing
	caps_right_alt = keyFunc_doNothing
	
	caps_f1  = keyFunc_doNothing
	caps_f2  = keyFunc_doNothing
	caps_f3  = keyFunc_doNothing
	caps_f4  = keyFunc_doNothing
	caps_f5  = keyFunc_doNothing
	caps_f6  = keyFunc_doNothing
	caps_f7  = keyFunc_doNothing
	caps_f8  = keyFunc_doNothing
	caps_f9  = keyFunc_doNothing
	caps_f10 = keyFunc_doNothing
	caps_f11 = keyFunc_doNothing
	caps_f12 = keyFunc_doNothing
	
	caps_lalt_a = keyFunc_doNothing
	caps_lalt_b = keyFunc_doNothing
	caps_lalt_c = keyFunc_doNothing
	caps_lalt_d = keyFunc_doNothing
	caps_lalt_e = keyFunc_doNothing
	caps_lalt_f = keyFunc_doNothing
	caps_lalt_g = keyFunc_doNothing
	caps_lalt_h = keyFunc_doNothing
	caps_lalt_i = keyFunc_doNothing
	caps_lalt_j = keyFunc_doNothing
	caps_lalt_k = keyFunc_doNothing
	caps_lalt_l = keyFunc_doNothing
	caps_lalt_m = keyFunc_doNothing
	caps_lalt_n = keyFunc_doNothing
	caps_lalt_o = keyFunc_doNothing
	caps_lalt_p = keyFunc_doNothing
	caps_lalt_q = keyFunc_doNothing
	caps_lalt_r = keyFunc_doNothing
	caps_lalt_s = keyFunc_doNothing
	caps_lalt_t = keyFunc_doNothing
	caps_lalt_u = keyFunc_doNothing
	caps_lalt_v = keyFunc_doNothing
	caps_lalt_w = keyFunc_doNothing
	caps_lalt_x = keyFunc_doNothing
	caps_lalt_y = keyFunc_doNothing
	caps_lalt_z = keyFunc_doNothing
	
	caps_lalt_1 = keyFunc_doNothing
	caps_lalt_2 = keyFunc_doNothing
	caps_lalt_3 = keyFunc_doNothing
	caps_lalt_4 = keyFunc_doNothing
	caps_lalt_5 = keyFunc_doNothing
	caps_lalt_6 = keyFunc_doNothing
	caps_lalt_7 = keyFunc_doNothing
	caps_lalt_8 = keyFunc_doNothing
	caps_lalt_9 = keyFunc_doNothing
	caps_lalt_0 = keyFunc_doNothing
	
	caps_lalt_minus     = keyFunc_doNothing
	caps_lalt_equal     = keyFunc_doNothing
	caps_lalt_backspace = keyFunc_doNothing
	
	caps_lalt_tab = keyFunc_doNothing
	
	caps_lalt_leftSquareBracket  = keyFunc_doNothing
	caps_lalt_rightSquareBracket = keyFunc_doNothing
	caps_lalt_backslash          = keyFunc_doNothing
	
	caps_lalt_semicolon = keyFunc_doNothing
	caps_lalt_quote     = keyFunc_doNothing
	caps_lalt_enter     = keyFunc_doNothing
	
	caps_lalt_comma = keyFunc_doNothing
	caps_lalt_dot   = keyFunc_doNothing
	caps_lalt_slash = keyFunc_doNothing
	
	caps_lalt_space = keyFunc_doNothing
	```
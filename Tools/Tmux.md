---
tags:
  - Tutorial
---
## 具体操作
### 会话管理
#### 新建会话
启动的Tmux窗口会自动编号，编号默认从`0`开始，以此类推。为方便区分会话，我们可以按以下命令新建一个指定名称的会话。
```shell
$ tmux new -s <sessionName>
```

#### 分离与接入会话
按下`Ctrl+b d`可使当前会话与窗口分离，但会话中的进程仍然会在后台执行。

使用下面的命令或`Ctrl+b s`可以查看所有会话：
```shell
$ tmux ls
```

再使用以下命令即可接入回已存在的会话：
```shell
$ tmux attach -t <sessionName>
```

或在某一会话中直接切换到其它会话：
```shell
$ tmux switch -t <sessionName>
```
#### 重命名会话
使用`Ctrl+b $`重命名会话。
#### 结束会话
使用以下命令来结束会话：
```shell
$ tmux kill-session -t <sessionName>
```

### 窗格管理
Tmux可以将一个窗口分成多个窗格，更加方便操作。使用`Ctrl+b %`将当前所在窗格划分为左右两个窗格；使用`Ctrl+b "`则可以将当前所在窗格划分为上下两个窗格。

### 激活鼠标
在Tmux中使用`Ctrl+b :`，再输入`set -g mouse on`即可。

## 快捷键

| Hotkeys        | Functions     | Part |
| -------------- | ------------- | ---- |
| `Ctrl + b` `d` | 分离当前会话        | 会话   |
| `Ctrl + b` `s` | 列出所有会话        | 会话   |
| `Ctrl + b` `$` | 重命名当前会话       | 会话   |
| `Ctrl + b` `"` | 将当前窗格划分为上下两部分 | 窗格   |
| `Ctrl + b` `%` | 将当前窗格划分为左右两部分 | 窗格   |
| `Ctrl + b` `x` | 关闭当前窗格        | 窗格   |
| `Ctrl + b` `q` | 显示窗格编号        | 窗格   |

^78b5a6


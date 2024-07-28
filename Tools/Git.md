---
tags:
  - Tutorial
---
## 基本概念
![[git_structure.jpg]]
> [!definition] 工作区 (Workspace)
> 在此处编辑项目，存储的都是实实在在的文件。

> [!definition] 暂存区 (Staging Area)
> 暂存已经修改的文件。

> [!definition] 本地仓库 (Local Repository)
> 将某一个确定版本的工作区中文件以自己的形式存储在本地的`.git`文件夹中，用户不可读。

> [!definition] 远端仓库 (Remote Repository)
> 托管在互联网上的仓库，如GitHub。

## 常用操作
### 新建本地仓库
1. 在想要建立为仓库的文件夹下，使用`git init`命令生成一个名为`.git`的文件夹，此时所在文件夹就已经成为了一个本地仓库。
2. 执行`git add *`，其中
	- `add`操作是将工作区文件提交至暂存区
	- `*`是shell通配符，代表当前目录下的所有文件和文件夹（除了被`.gitignore` 文件指定的内容）
1. 执行`git commit -m "<message>"`，将暂存区的修改同步到本地仓库。
### 本地仓库链接远程仓库
1. 在本地仓库的文件夹下，执行`git remote add origin <url>`，其中
	- `remote`是一个用于管理远程仓库设置的子命令；
	- `add origin <url>`表示将`<url>`地址下的远程仓库与本地仓库连接起来，并且将其标识为`origin`（理论上可以使用任何名称来标识远程仓库，但一般都用`origin`来标识，尤其是本地仓库只连接一个远程仓库的情况下）。
1. 执行`git push -u origin main`，其中
	- `push`命令推送本地`main`分支到远程仓库`origin`的`main`分支上；
	- `-u`则是`--set-upstream`的简写，此命令会将`origin`仓库的`main`分支设为当前分支的上游分支，未来进行`git push`或`git pull`时，将默认对此远程仓库的此分支进行操作。
1. 执行`git remote -v`查看本地仓库连接了几个远程仓库。

> [!caution] 注*
> 执行`git push`后出现`The requested URL returned error: 403 Forbidden while accessing`则说明没有权限修改远端仓库，需要将`.git/config`中`[remote "origin"]`下的`url = https://github.com/<username>/<repository>.git`修改为`url = https://<username>:<password>@github.com/<username>/<repository>.git`

### 远程仓库到本地
1. **克隆(Clone)**：输入`git clone <url>`，系统会在当前文件夹下生成一个文件，用来存储仓库。
1. **抓取(Fetch)**：执行`git fetch <repo> <branch>`，即将远端仓库`<repo>`里的`<branch>`分支的更新都抓取到本地，*不会合并*；如果不指定`<repo>`和`<branch>`，则抓取所有分支。
3. **拉取(Pull)**：执行`git pull <repo> <branch>`，即将远端仓库`<repo>`里的`<branch>`分支的更新拉取到本地，并*自动合并*（等同于`fetch`+`merge`），如果不指定`<repo>`和`<branch>`，则拉取所有分支。

> [!caution] 
> `fetch`和`pull`只会同步修改的文件，需要先将远程仓库克隆到本地，并在存储远程仓库文件的文件夹中新建仓库后，再正常使用抓取拉取指令，*对刚刚新建的空仓库没效果*。

### 分支相关
1. 使用`git branch <name>`新建名为`<name>`的分支，来存储自己的版本。
2. 使用`git branch -D <branch>`来强制删除`<branch>`分支。

> [!caution] 
> 合并两分支的方法：若某处只有一个分支有修改，则保留修改；若某处两个分支都有修改，且不一致，则标记为冲突，需要手动修改。

## 命令列表
### 常用操作
- `git clone <url>`：将远程仓库克隆到当前目录下的一个文件夹中；
- `git checkout <branch>`：切换到已有分支（可通过`git checkout -b <branch>`创建并切换到新分支）；
- `git add <file>`：从工作区添加文件到暂存区（使用`git add -A`可将工作区同步到暂存区）；
- `git commit -m <message>`：更新暂存区的状态到本地仓库；
- `git push`：将本地仓库同步到远端仓库；
### 其它操作
- `git init`：初始化当前目录为仓库；
- `git status`：查看仓库状态，如当前分支名称、未暂存的修改等；
- `git log`：查看提交日志（可使用`git log --pretty=oneline --all --abbrev-commit --graph`美化输出）；
- `git reset --hard <commit id>`：回退到某个版本；
- `git reflog`：查看命令历史（可借助此指令找回丢失的commit id）；
- `git merge <branch>`：合并某分支到当前分支；
- `git diff`：查看修改内容；
- `git branch -d <branch>`：删除分支；

## VSCode中的Git操作
### 标记状态
- `U`：Untracked，未跟踪的，一般是新创建出来的，只在工作区中存在。
- `A`：Added，新增的，新创建出的文件只加入了暂存区，还没提交过。
- `M`：Modified，被修改的，其在本地仓库中已经存在，但在工作区已经被修改。
- `D`：Deleted，被删除的，其在本地仓库中已经存在，但在工作区中已经被删除。

[基于 VScode 的 git 详细使用指南【保姆级！建议收藏！】_vscode git-CSDN博客](https://blog.csdn.net/weixin_48024605/article/details/136037857)

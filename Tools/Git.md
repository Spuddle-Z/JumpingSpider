---
tags:
  - Tutorial
---
## 基本概念
![[git_structure.jpg]]
- **工作区 (Workspace)**：在此处编辑项目；
- **暂存区 (Staging Area)**：暂存已经修改的文件；
- **本地仓库 (Local Repository)**：最终确定的文件作为一个新的版本统一保存到仓库，对他人可见；
- **远端仓库 (Remote Repository)**：托管在互联网上的仓库，如GitHub。
## 基本操作
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

> [!warning] 注*
> - 执行`git push`后出现`The requested URL returned error: 403 Forbidden while accessing`则说明没有权限修改远端仓库，需要将`.git/config`中`[remote "origin"]`下的`url = https://github.com/<username>/<repository>.git`修改为`url = https://<username>:<password>@github.com/<username>/<repository>.git`
> - 合并两分支的方法：若某处只有一个分支有修改，则保留修改；若某处两个分支都有修改，且不一致，则标记为冲突，需要手动修改。

---
tags:
  - Tutorial
aliases:
  - Secure Shell
---
## 基本命令
- `ssh <username>@<ip>`：登录远程服务器；
- `scp <username>@<ip>:<remote_path> <local_path>`：从远程服务器下载文件；
- `scp <local_path> <username>@<ip>:<remote_path>`：上传文件到远程服务器。

## 免密登录
### 操作步骤
下面的步骤实现的是本地主机master免密登录远端slave的操作。
1. 在master上使用命令`ssh-keygen -t rsa`生成密钥，对于Windows系统来说，密钥生成在当前用户文件夹下的`.ssh`文件夹中，即`id_ras.pub`文件（如果此目录下已经生成了，无须重复生成）；
2. 登录slave，在`~/.ssh/`下找到`authorized_keys`文件，将刚刚生成的`id_ras.pub`文件中的内容复制粘贴到此文件中，即完成免密登录配置。

### 具体原理
1. 客户端向服务端发出连接申请；
2. 服务端发送一个随机信息；
3. 客户端使用私钥加密此信息，并将加密后的信息发送给服务端；
5. 服务端使用公钥解密信息，若解密后的信息与之前发送的匹配，则信任客户端。

![[Pasted image 20240815100243.png|650]]

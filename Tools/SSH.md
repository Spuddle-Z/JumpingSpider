---
tags:
  - Tutorial
---
## 基本命令
- `ssh <username>@<ip>`：登录远程服务器；
- `scp <username>@<ip>:<remote_path> <local_path>`：从远程服务器下载文件；
- `scp <local_path> <username>@<ip>:<remote_path>`：上传文件到远程服务器。

## 免密登录
下面的步骤实现的是本地主机master免密登录远端slave的操作。
1. 在master上使用命令`ssh-keygen -t rsa`生成密钥，对于Windows系统来说，密钥生成在当前用户文件夹下的`.ssh`文件夹中，即`id_ras.pub`文件（如果此目录下已经生成了，无须重复生成）；
2. 登录slave，在`~/.ssh/`下找到`authorized_keys`文件，将刚刚生成的`id_ras.pub`文件中的内容复制粘贴到此文件中，即完成免密登录配置。

其具体原理如下： #Missing
![[Pasted image 20240731102432.png]]1、ssh 客户端向 ssh 服务器端发送连接请求

2、ssh 服务器端发送一个随机的信息

3、ssh 客户端使用本地的私钥对服务器端发送过来的信息进行加密

4、ssh 客户端向服务器端发送加密过后的信息

5、ssh 服务器端使用公钥对该信息进行解密

6、若解密之后的信息和之前发送的信息匹配，则信任客户端，否则不信任。


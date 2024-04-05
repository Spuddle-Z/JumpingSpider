---
tags:
  - Tutorial
---
## 常用指令
- `conda create -n <env> python=3.x`：创建名为`<env>`的环境，指定python版本为3.x；
- `conda create -n <new\_env> --clone <env>`：克隆环境`<env>`，并将新环境命名为`<new\_env>`；
- `conda env create -f xxx.yaml`：通过`.yaml`文件创建新环境；
- `conda env list`：查看所有环境；
- `conda remove -n <env> --all`：删除环境`<env>`；
- `conda activate <env>`：激活环境`<env>`；
- `conda deactivate`：退出当前环境；
- `conda list`：查看已安装的包；
- `conda install <package>`：安装`<package>`；
- `conda remove <package>`：卸载`<package>`；

> [!waring] 注*：
> 定期执行以下指令，可以清理环境，释放空间：
> - `conda clean -p`：清理未使用的包；
> - `conda clean -t`：清理软件包的压缩包。

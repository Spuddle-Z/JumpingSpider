## 文件说明
在`trajectory-model.ipynb`的基础上，将其扩展成了一个项目。
- `main.py`：主程序。
- `generate_graph.py`：使用NetworkX库生成网格图或平面图。
- `generate_traj.py`：生成最短路径。
- `data_process.py`：处理数据，如分批量。
- `model.py`：定义模型结构。
- `visualize.py`：数据可视化。
- `utils.py`：一些其它函数。
## 具体修改
- 将图（即便是网格图）生成为NetworkX库的图格式，并加入了生成随机平面图的功能。图的边权重不同，其欧式距离大小即为其权重大小。
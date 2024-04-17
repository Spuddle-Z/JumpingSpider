---
tags:
  - Knowledge
  - Code
---
## 基本概念
**PageRank**是Google的看家算法，其可以对海量的网页进行重要性分析，并按照其重要性排序。
## 随机游走模型
- **随机游走模型(Random Walk)**：将整个互联网看作一个巨大的有向图，每个网页都是一个节点，而超链接则是从一个页面指向另一个页面的有向边。在这个模型中，我们假设一个网页的浏览者会按照某个固定概率，经过有向边随机跳转到其链接的其它页面，那么在一个无限长的时间内，这种跳转行为会趋于稳定。在这个平衡分布中，每个节点被访问的概率即为这个网页的PageRank值。

因此，我们可以在此基础上建立一个流模型。可以将每条边上的权重看作概率，则每个节点出链的权重和为1，出链则平均分配这些权重，如图：
![[Pasted image 20240415201656.png|175]]
我们设节点$v$的PageRank值为$PR(v)$，出度为$L(v)$，所有指向$v$的节点集合为$B(v)$，节点总数为$N$，则第$t$次迭代的PR值为：
$$PR_{t}(v)=\sum_{u\in B(v)}\frac{PR_{t-1}(u)}{L(u)}$$
这样一个线性变换可以使用一个转移矩阵$M$表达：
$$PR_{t}=M\cdot PR_{t-1}$$
除去两种特殊的情况，经过多次迭代后，PR值最终会收敛，即使得$PR_{t}=PR_{t-1}$。因此其实最终收敛到的PR值就是$M$特征值为1的特征向量，可以由此直接计算出PR值。
## 存在的问题及解决方法
1. 当这个网页组成的图不是[[图论#^dn9bhk|强连通图]]时，会出现如下图的情况，即在多次迭代之后，红色与蓝色点的PR值将变为零（蓝色点释放掉了一些权重，因为其没有出度；绿色点则吸收了剩下的权重）。
	![[Pasted image 20240415204139.png|145]]
1. 绿色部分还会存在周期性的问题，即权重会在里面打转，导致无法达到平衡。

以上两种情况可以通过随机传送来解决：
- **随机传送(Ramdom Teleports)**：引入一个概率$\beta$，使得每个节点上都有$1-\beta$的概率传送到一个随机的节点上。

因此，谷歌使用的矩阵为
$$A=\beta M+(1-\beta)\left[ \frac{1}{N} \right]_{N\times N}$$
## Code
```python
import networkx as nx

# 加载数据
G_tmp = nx.read_edgelist('../input/google-web-graph/web-Google.txt', create_using = nx.DiGraph)
# 留下最大的弱连通分量
G = max(nx.weakly_connected_components(G_tmp), key=len)
# 打印图的一些信息
print(nx.info(G))
# 直接调用PageRank算法
pagerank_nx = nx.pagerank(G, alpha=0.85, tol=1e-10)
```
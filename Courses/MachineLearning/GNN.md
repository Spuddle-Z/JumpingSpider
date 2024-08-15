---
tags:
  - Knowledge
  - Code
aliases:
  - 图神经网络
  - Graph Neural Network
---
## Node2vec
### 基本概念
**符号表示**：
- $N(u)$表示节点$u$的邻居节点；
- $z_{u}$表示节点$u$嵌入后得到的向量；
- $P(v|z_{u})$表示从向量$z_{u}$随机游走到向量$z_{v}$的概率。

我们令$z_{u}^Tz_{v}$为体现向量$z_{u},z_{v}$距离的一个量，此值越大，从$z_{u}$随机游走到$z_{v}$的概率越大，$u,v$距离越近。为将其转化为概率，我们利用softmax函数
$$P(v|z_{u})=\frac{\exp(z_{u}^Tz_{v})}{\sum_{n\in V}\exp(z_{u}^Tz_n)}$$
嵌入的目标函数是
$$\max_{z}\sum_{u\in V}\sum_{v\in N(u)}\log P(v|z_{u})$$
即令嵌入后的相邻节点所对应的向量尽可能近。

为减少计算$\log\frac{\exp(z_{u}^Tz_{v})}{\sum_{n\in V}\exp(z_{u}^Tz_n)}$的开销，我们按照下式近似替换
$$
\begin{aligned}
&\log\frac{\exp(z_{u}^Tz_{v})}{\sum_{n\in V}\exp(z_{u}^Tz_n)}\\
\approx&\log(\sigma(z_{u}^Tz_{v}))-\sum_{i=1}^{k}\log(\sigma(z_{u}^Tz_{n_i})))
\end{aligned}
$$
其中$n_i$符合所有节点的随机分布。

> [!definition] 截断随机游走 (Truncated Random Walk)
> 选择一个根节点，以之为起点进行[[数据科学基础#^rpjv8d|随机游走]]，固定每次随机游走的跳转次数，即称为截断随机游走。

但截断随机游走依然是一种非常固定的算法，没有任何的超参数可以调节。此时我们引入带偏随机游走模型：

> [!definition] 带偏随机游走 (Biased Random Walk)
> 在截断随机游走的基础上增加两种跳转策略：
> - BFS重点覆盖周围的节点，但是太局部(Local)；
> - DFS能覆盖更远处的节点，但是太全局(Global)。
> ![[Pasted image 20240507173730.png|400]]
> 
> 使用两个超参数$p,q$来调节这两种策略的比重。

令节点$u$作为根节点，执行$r$次步数为$l$的带偏随机游走，能够得到$r$个长度为$l$且以$u$为起点的节点序列，将这些序列看作$r$个词数为$l$的句子，使用word2vec算法，像求词向量一样求得每个节点的嵌入。
### 示例代码
```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import sklearn
%matplotlib inline

# 处理图的库
import nodevectors
import networkx as nx

class Node2Vec(nodevectors.Node2Vec):
    """
    Parameters
    ----------
    p : float
        p parameter of node2vec
    q : float
        q parameter of node2vec
    d : int
        dimensionality of the embedding vectors
    w : int
        length of each truncated random walk
    """
    def __init__(self, p = 1, q = 1,d = 32, w = 10):
        super().__init__(
                    n_components = d,
                    walklen = w,
                    epochs = 50,
                    return_weight = 1.0 / p,
                    neighbor_weight = 1.0 / q,
                    threads = 0,
                    w2vparams = {'window': 4,
                                'negative': 5, 
                                'iter': 10,
                                'ns_exponent': 0.5,
                                'batch_words': 128})
```

```python
# 使用NetworkX生成一个哑铃图
toy_barbell = nx.barbell_graph(7, 2)
nx.draw_kamada_kawai(toy_barbell)
```
![[Pasted image 20240513220353.png|259]]
```python
# 使用Node2Vec类嵌入节点
n2v = Node2Vec(p = 1, q = 1, d = 2)
n2v.fit(toy_barbell)
embeddings = []
for node in toy_barbell.nodes:
    embeddings.append(list(n2v.predict(node)))

# 展示嵌入后的向量
toy_colors = ['red'] * 8 + ['blue'] * 8
df = pd.DataFrame(embeddings, columns = ['x', 'y'])
df.plot.scatter(x = 'x', y = 'y', c = toy_colors)
```
![[Pasted image 20240513220428.png|363]]

## Readout
在一些涉及图数据的模型中，我们通常需要将整个图的信息整合到一个向量中，readout函数即是用来实现此功能的。

## GNN
基于[[图论#^gk7iej|同配性]]，GNN的核心思想就是归拢其邻居的信息。
![[Pasted image 20240509214440.png|575]]
如上图，左侧图的结构就决定了右侧GNN的网络结构。
> [!note] 
> GNN一般不会很深，因为
> - 每层的节点个数将随层数指数增长，算不动；
> - 稍微深一点儿的网络就会包含几乎全图的节点，这样训练出来的节点与节点之间会过于同质化。

GNN的计算一般遵循以下形式：
$$h_{vl}=\sigma\left( B_lh_{vl}+W_l\frac{1}{|N(v)|}\sum_{u\in jN(v)}h_{ul} \right)$$
其中$h_{v0}$是原节点$v$，$h_{vL}$是输出的节点$v$，$W_l,B_l$都是可训练的参数矩阵，$\sigma$为激活函数。其本质就是一个每层的输入为邻居节点平均值与自身的一个多层感知机。

> [!note] 
> Node2vec方法的缺点：
> - 只考虑了点在图中的关系，如果节点有标签等其它特征，node2vec嵌入方法是考虑不到的；
> - 在完成嵌入后，如果有新加入的节点想要嵌入，只能重新训练。
> 
> GNN刚好克服了node2vec的缺点：
> - GNN可以进行监督训练，如根据周围节点的标签预测某节点的标签；
> - 由于整张图共享参数矩阵，因此在训练完成后，依然可以加入新的节点。


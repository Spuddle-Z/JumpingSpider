---
tags:
  - Knowledge
aliases:
  - 图神经网络
  - Graph Neural Network
---
## 节点嵌入
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

### 带偏随机游走
> [!definition] 截断随机游走 (Truncated Random Walk)
> 选择一个根节点，以之为起点进行[[PageRank#^rpjv8d|随机游走]]，固定每次随机游走的跳转次数，即称为截断随机游走。

但截断随机游走依然是一种非常固定的算法，没有任何的超参数可以调节。此时我们引入带偏随机游走模型：

> [!definition] 带偏随机游走 (Biased Random Walk)
> 在截断随机游走的基础上增加两种跳转策略：
> - BFS重点覆盖周围的节点，但是太局部(Local)；
> - DFS能覆盖更远处的节点，但是太全局(Global)。
> ![[Pasted image 20240507173730.png|400]]
> 
> 使用两个超参数$p,q$来调节这两种策略的比重，使得计算出出现在每个节点的概率更加符合其下游任务。

令每一个节点作为根节点，执行带偏随机游走，
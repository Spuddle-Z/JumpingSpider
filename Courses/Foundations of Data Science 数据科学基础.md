---
tags:
  - Knowledge
---
## 课程信息
- 推荐教材：The Mining of Massive Datasets
- 成绩组成
	- 平时成绩 10%（出勤、随堂小测）
	- 4次作业 + Lab 45%
	- 大作业 45%
## 统计学基础
### 数据的基本统计描述
#### 中心趋势
- **平均数(Mean)**：有算术平均、几何平均
- **中位数(Median)**
- **众数(Mode)**
- 对于以上三者，在数据分布为*单峰*时有此经验公式：$$Mean-Mode\simeq 3\times(Mean-Median)$$如图所示：![[Pasted image 20240304102748.png]]
#### 离散程度
- **方差(Variance)**：$\sigma^2=\mathbb{E}[x^2]-\mathbb{E}^2[x]$
- **标准差(Standard Deviation)**：是方差的平方根
- 无论数据如何分布，至少有$1-\frac{1}{k^2}$的点在$Mean\pm k\sigma$之内
- **四分位数(Quartile)**：
	- $Q_1$：下四分位数，25%
	- $Q_3$：上四分位数，75%
	- $IQR$：四分位距，$IQR=Q_3-Q_1$
#### 常用图
- **箱形图(Boxplot)**：![[Pasted image 20240227165111.png|450]]
	- **下限(Min)**：$Q_1 - 1.5*IQR$
	- **上限(Max)**：$Q_3 + 1.5*IQR$
	- **异常值(Outlier)**：落在上下限之外的点
- **分位图(Quantile-Quantile Plot, Q-Q Plot)**：使用两组数据中的同一位置的分位数作为一个点的横纵坐标。
	![[Pasted image 20240304110136.png|450]]
	如图可知，Branch 1的价格更低。

### 相似性与差异性
- **闵可夫斯基距离(Minkowski Distance)**：有两向量$x=(x_1,x_2,...,x_n),y=(y_1,y_2,...,y_n)$，则闵可夫斯基距离表示为
$$D=\left(\sum_{i=1}^n|x_i-y_i|^p\right)^{\frac{1}{p}}$$
- **余弦距离(Cosine Similarity)**：对于两个向量$x,y$，其余弦相似度就是其夹角的余弦值：
$$\cos(x,y)=\frac{x\cdot y}{||x||\cdot||y||}$$
	两向量夹角越小，越相似。
- **杰卡德距离(Jaccard Distance)**：对于两个集合$A,B$，*Jaccard相似系数*$J(A,B)=\frac{|A\cup B|}{|A\cap B|}$用来描述两个集合的相似度，而Jaccard距离则用于度量两个集合的差异性：$$d_{J}(A,B)=1-J(A,B)=1-\frac{|A\cup B|}{|A\cap B|}$$
### 概率不等式
#### 马尔可夫不等式 Markov's Inequality
对于非负随机变量$X$，$\forall c>0$：$$P(X\geq c)\leq\frac{\mathbb{E}[X]}{c}$$
证明：
$$
\begin{aligned}
\mathbb{E}[X]&=\int_0^cxf(x)\ dx+\int_c^\infty xf(x)\ dx \\
&\geq\int_c^\infty xf(x)\ dx \\
&\geq c\int_c^\infty f(x)\ dx \\
&=c\cdot P(X\geq c)
\end{aligned}
$$
#### 切比雪夫不等式 Chebyshev's Inequality
对于$\forall c>0$：$$P\left(|X-\mu|\geq c\right)\leq\frac{\sigma^2}{c^2}$$
证明：
$$
\begin{aligned}
P\left(|X-\mu|\geq c\right)&=P\left((X-\mu)^2\geq c^2\right)\\
&\leq\frac{\mathbb{E}\left[(X-\mu)^2\right]}{c^2}(\text{Markov's inequality})\\
&=\frac{\sigma^2+\mathbb{E}^2\left[(X-\mu)\right]}{c^2}\\
&\leq\frac{\sigma^2}{c^2}
\end{aligned}
$$
#### 切尔诺夫界 Chernoff Bound
设$X_1,...,X_t$是一串在$[0,1]$范围内独立同分布的随机变量，其期望值为$\mu$，则对于这$t$个变量的均值$X=\frac{1}{t}\sum_iX_i$，当$0<\delta<1$时，有$$P(|X-\mu|\geq\delta\mu)\leq2\exp\left(-\frac{\delta^2\mu t}{3}\right)$$
## MapReduce
### 基本概念
**MapReduce**是一种编程思想，即把大的问题细分为小的问题，然后再分别调度、处理。

类比成一个很大的饭店为许多食客做菜的过程：数据——食材，简单重复但大量的任务——切菜、烧水，复杂任务——烹饪。
![[Pasted image 20240305161123.png|475]]
如上图，我们可以将制作一道菜的完整流程分交给不同的人做。
### 工作原理
- 将最原始的数据抽象成key-value的形式，我们将数据处理过程抽象成两个步骤，即map与reduce；
- Map：将相同key的数据聚合起来；
- Reduce：分别处理这些key不同的数据，并输出。
![[Pasted image 20240305163846.png]]
- 例：自然连接两个表格![[Pasted image 20240305170543.png|500]]
	- Map：将$b$提取为key，将$R$中的每个元组变为$(b,(a,R))$的形式，$S$同理；
	- Reduce：将$b$相同但来自不同表格的key-value对进行合并，并输出成$(a,c)$的形式。
## 局部敏感哈希
### 寻找相似文件
如下图，主要分为三个步骤：
![[Pasted image 20240312162142.png|600]]
#### Shingling
- **Shingling**：将文件转化成token串的集合，$k$-shingle则为长度为$k$的token串（如令$k=2$，文件$D=abcab$的$2$-shingles为$S(D)=\{ab,bc,ca\}$）。
- 我们在shingles的基础上，使用Jaccard距离来衡量两文件的差异性，并使用如下图的表格表示这些文件：![[Pasted image 20240312170447.png|200]]
#### MinHashing
## PageRank

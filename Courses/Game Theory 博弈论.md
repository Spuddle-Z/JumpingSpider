---
tags:
  - Knowledge
---
# 课程信息
- 记录 10%
- 5次作业 50%
- 研究/总结项目 40%
	- 工作 20%
	- 展示 10%
	- 报告 10%
# 概述
## 研究课题
- 在一定空间下，每个人绝对自私时，整个系统是否有稳定的状态
- 评估这个最终状态是否好
- 如何控制这个最终的状态
## 基本概念
- 玩家(Players/Agents)
- 策略(Strategy)与行动(Action)：策略包括了所有情况下的行动
- 效用(Utility/Payoff)：用以表示玩家得到的收益与损失
- 结果(Outcomes)

> [!example] Braess’ Paradox
> ![[Pasted image 20240220152402.png|400]]
> 共有60个人要从s点到t点。最优解是各分30人走上下两路，此时所有人通勤时间为90min；但此时走x-0-x那条路对于每个人会更省时间，因此人们会选择走这条路，直到所有人的通勤时间变为120min。此时Price of Anarchy (PoA) = $\frac{NE}{OPT}$ = $\frac{2}{1.5}$

---
## 数学层面
- 最优化理论(Optimization Theory)：对于决策变量$x\in\mathbb{R}^n$，$$
	\begin{aligned}
		\text{Maximize}&\sum_i u_i(x) \\
		\text{Subject to}\ &x\in X\subset\mathbb{R}^n
	\end{aligned}
	$$
- 而博弈论则是一个多代理的决策问题：系统中有$n$个代理，而每个代理都会以最大化他们自己的效用函数$u_i(x)$为目的，来选择决策变量，即$$\text{Maximize}\ u_i(x_i,x_{-i})$$其中，$x_{-i}=(x_1,...,x_{i-1},x_{i+1},...,x_n)$
# 战略形式博弈 Strategic Form Game
## 基本定义
**战略形式博弈(Strategic Form Game)**：也称**标准形式博弈(Normal Form Game)**，有如下特点
- 有$n$个玩家
- 其策略集是一个*有限*的*离散*集合，$a_i\in A_i$
- 对于玩家$i$，他的效用是$u_i(a_1,a_2,...,a_n)$
## 纯策略与混合策略
- **纯策略(Pure Strategy)**：在给定的信息下，每个玩家只能选择一种策略，这个策略称为纯策略。
- **混合策略(Mixed Strategy)**：与纯策略相对的，一个玩家选择的策略不是确定的，而是有一定的概率选择某一种策略，那么这种策略称为混合策略。
混合策略下的payoff按下式计算：
$$\sum_{a_1\in A_1}\sum_{a_2\in A_2}...\sum_{a_n\in A_n}u_i(a_1,a_2,...,a_n)p_1(a_1)p_2(a_2)...p_n(a_n)$$
此时，玩家$i$的best response是$BP_{i}(p_{-i})$
- 其中$p_i(a_j)$指$i$玩家采用$j$策略的概率，$p_{-i}$指除了玩家$i$之外其它玩家的策略
- $BP_i(p_{-i})$即指对于其它决策为$p_{-i}$时，玩家$i$的最优策略(Best Response Action)的*集合*
- $BP_i(p_{-i})$是一个凸集
## 纳什均衡
- **纳什均衡(Nash Equilibrium, NE)**：对于$\forall i$，若$u_i(p_i^*,p_{-i}^*) \geq u_i(p_i,p_{-i}^*)$，$p^*=(p_1^*,p_2^*,...,p_n^*)$是一个NE，即对于所有人来说，$p_i^*$都是给定了其他人策略$p_{-i}^*$的情况的最优策略。其数学表达如下：$$p^*\in BP(p^*)$$其中$p^*$和$BP(p^*)$都是一个$n$维向量，也即表示$\forall i,p_i^*\in BP_i(p_i^*)$。由此可得出，若算子$BP$有一个不动点(Fixed Point)，则这个博弈有一个解是NE。
> [!example] 举例
> 对于小组作业，有以下效用矩阵：
> 
|      | Work          | Lazy    |
| ---- | ------------- | ------- |
| Work | (10, 10)      | (-5, 5) |
| Lazy | (5, -5) | (0, 0) |
> - 对于pure决策：两人都work与两人都lazy都是NE。
> - 对于mixed决策：可以设玩家1 work的概率为$x$，玩家2 work的概率为$y$，则可算出$$x^*=
> 	\left\{\begin{aligned}
> 		1,&y>\frac{1}{2} \\
> 		0,&y<\frac{1}{2} \\
> 		[0,1],&y=\frac{1}{2}
> 	\end{aligned}\right.,\quad y^*=
> 	\left\{\begin{aligned}
> 		1,&x>\frac{1}{2} \\
> 		0,&x<\frac{1}{2} \\
> 		[0,1],&x=\frac{1}{2}
> 	\end{aligned}\right.$$
> 	在图中画出取二者的交集，得到三个NE——$(0,0)(1,1)(\frac{1}{2},\frac{1}{2})$。
## 占优均衡
- **占优策略(Dominant Strategy)**：对于玩家$i$来说，如果对于$\forall a_i,a_{-i}$，都有$u_i(a_i,a_{-i})\leq u_i(a_i^*,a_{-i})$，则$a_i^*$称为占优策略；也即无论其它玩家选择什么策略，$a_i^*$都是玩家$i$能选择的最优策略。
- **占优均衡(Dominant Equilibrium)**：若策略组合$A=(a_1^*,a_2^*,\cdots,a_{n}^*)$，对于所有玩家$i$来说，$a_i^*$均为占优策略，则称$A$为占优均衡。占优均衡*不一定*存在。
- **被占优策略(Dominanted Strategy)**：对于玩家$i$来说，若$\exists a_i'$，使得对于$\forall a_{-i}$都有$u_i(a_i',a_{-i})>u_i(a_i,a_{-i})$，则称那些$a_i$为被占优策略；也即无论其它玩家选择什么策略，被占优策略$a_i$都不是最优策略。
## 相关均衡

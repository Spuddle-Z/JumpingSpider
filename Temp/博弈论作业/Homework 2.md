#### Problem 1
求对对方的最佳策略函数，即令两玩家的效用函数关于自己策略的偏导数为零
$$
\left\{\begin{aligned}
\frac{\partial u_1}{\partial a_1}&=1-2a_1-a_2=0\\
\frac{\partial u_2}{\partial a_2}&=1-a_1-2a_2=0
\end{aligned}\right.
\implies
\begin{bmatrix}
a_1\\
a_2
\end{bmatrix}
=
\begin{bmatrix}
2&1\\
1&2
\end{bmatrix}^{-1}
\begin{bmatrix}
1\\1
\end{bmatrix}
=
\begin{bmatrix}
\frac{1}{3}\\\frac{1}{3}
\end{bmatrix}
$$
由此，其PNE为$a_1=a_2=\frac{1}{3}$
#### Problem 2
1. 如果$p_i<c$，$i$公司将遭受损失，无论$p_j$如何，令$c<p_i$都将避免损失，无法平衡，因此$p_i$一定大于等于$c$；
2. 在上一条的基础上，当$p_i<p_j$时，$j$公司可以通过将价格压到$[c,p_i]$的范围内，来将自己的利润从$0$提升到$f(p_j)(p_j-c)$或$\frac{1}{2}f(p_j)(p_j-c)$，无法平衡；
3. 当$c<p_i=p_j$时，$i$公司可以将价格降低一个非常小的$\varepsilon$来获得全部的需求，来提升自己的利润，也无法平衡；
4. 排除了前三条之后，只剩下$c=p_i=p_j$一种情况，易验证其平衡。

综上，$c=p_1=p_2$是唯一的纳什均衡。
#### Problem 3
#### Problem 4
1. 易知，对于玩家$i$的总成本
	$$C_i(R_i,R_{-i})=\sum_{e\in R_i}\frac{c_{e}}{f_e}$$
	则对于所有玩家的总成本
	$$\sum_iC_i(R_i,R_{-i})=\sum_i\sum_{e\in R_i}\frac{c_{e}}{f_{e}}$$
	等式右侧交换求和符号，即得
	$$\sum_iC_i(R_i,R_{-i})=\sum_{e:f_{e}\geq1}\sum_{i:e\in R_i}\frac{c_{e}}{f_{e}}=\sum_{e:f_{e}\geq1}c_{e}$$
	QED.
1. 考虑势能函数$\Phi(R_i,R_{-i})=\sum_{e}\sum_{k=1}^{f_{e}}\frac{c_{e}}{k}$，可证
	$$
	\begin{aligned}
	\Delta\Phi&=\Phi(R_i',R_{-i})-\Phi(R_i,R_{-i})\\
	&=\sum_{e\in R_i'\setminus R_i}\frac{c_{e}}{f_{e}+1}-\sum_{e\in R_i\setminus R_i'}\frac{c_{e}}{f_{e}}\\
	&=C_i(a_i',a_{-i})-C_i(a_i,a_{-i})\\
	&=\Delta C_i
	\end{aligned}
	$$
	已知有
	$$\Phi(\hat{R})\leq\Phi(R^*)$$
	令
	$$
	\begin{aligned}
	\Delta\Phi&=\Phi(R^*)-\Phi(\hat{R})\\
	&=\sum_{i=1}^{n}\Delta C_i
	\end{aligned}
	$$
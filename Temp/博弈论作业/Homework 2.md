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
为简化符号，我们令$C(x)=C_{B}(x)$，并设OPT中流过B的流量为$x$。欲证
$$\frac{NE}{OPT}=\frac{rC(r)}{\min_x(r-x)C(r)+xC(x)}\leq\frac{3\sqrt{3}}{3\sqrt{3}-2}$$
只需证
$$
\begin{aligned}
&\frac{rC(r)}{(r-x)C(r)+xC(x)}\leq\frac{3\sqrt{3}}{3\sqrt{3}-2}\\
\Longleftrightarrow&\frac{x[C(r)-C(x)]}{rC(r)}\leq\frac{2}{3\sqrt{3}}
\end{aligned}
$$
将不等式左侧展开，并将分子分母同时除以$a$，由于$\frac{b}{a},\frac{c}{a}$同样大于零，因此可以直接用$b,c$表示，则此时$C(x)=x^2+bx+c$，简化了计算。

展开上式，并进行一步放缩，得到
$$
\begin{aligned}
&\frac{x(r^2+br-x^2+bx)}{r(r^2+br+c)}\leq\frac{2}{3\sqrt{3}}\\
\implies&\frac{x(r^2+br-x^2+bx)}{r(r^2+br)}\leq\frac{2}{3\sqrt{3}}\\
\Longleftrightarrow&\frac{x(r+x+b)(r-x)}{r^2(r+b)}\leq\frac{2}{3\sqrt{3}}
\end{aligned}
$$
只需证明此式即可。

我们令$\lambda=\frac{x}{r}$，则上式变为
$$\lambda(1-\lambda)\left( 1+\lambda-\frac{\lambda b}{r+b} \right)\leq\frac{2}{3\sqrt{3}}$$
再次放缩得到
$$h(\lambda)=\lambda(1-\lambda)(1+\lambda)\leq\frac{2}{3\sqrt{3}}$$
对其求导得到
$$h'(\lambda)=1-3\lambda^2$$
$$
\left\{\begin{aligned}
h'(\lambda)>0,\lambda\in\left( 0,\frac{1}{\sqrt{3}} \right)\\
h'(\lambda)<0,\lambda\in\left(\frac{1}{\sqrt{3}},1\right)
\end{aligned}\right.
$$
综上，有
$$h(\lambda)\leq h\left( \frac{1}{\sqrt{3}} \right)=\frac{2}{3\sqrt{3}}$$
QED.
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
	而
	$$
	\begin{aligned}
	\sum_iC_i(\hat{R})&=\sum_{e}c_{e}\\
	&\leq\sum_{e}\sum_{k=1}^{f_{e}}\frac{c_{e}}{k}\\
	&=\Phi(\hat{R})
	\end{aligned}
	$$
	同时
	$$
	\begin{aligned}
	\left( 1+\frac{1}{2}+...+\frac{1}{n} \right)\sum_iC_i(R_i^*,R_{-i}^*)&=\sum_{e}\sum_{k=1}^{n}\frac{c_{e}}{k}\\
	&\geq\sum_{e}\sum_{k=1}^{f_{e}}\frac{c_{e}}{k}\\
	&=\Phi(R^*)
	\end{aligned}
	$$
	因此有
	$$\sum_iC_i(\hat{R_i},\hat{R_{-i}})\leq\left( 1+\frac{1}{2}+...+\frac{1}{n} \right)\sum_iC_i(R_i^*,R_{-i}^*)$$
	QED.
#### Problem 5
1. 设此博弈的策略空间为有界闭凸集。对于玩家1来说，$u_1$是关于$a_1$的凹函数；对于玩家2来说，因为$u_2=-u_1$，且$u_1$关于$a_2$严格凹，所以$u_2$是关于$a_2$的凹函数。综上，此博弈有PNE，即鞍点。与此同时，由于$u_1$对$a_1$、$u_2$对$a_2$是严格凹的，因此在有界闭集上，两函数都应该只有唯一的最值点，因此其鞍点也唯一。
1. 为了使用角谷静夫不动点定理，需要构造一个函数$g(a)$用来表示博弈策略迭代的过程，而$L(v,a)$则是构造$g(a)$的一个中间函数，表示的是玩家根据其他玩家的策略调整后玩家期望的收益之和。
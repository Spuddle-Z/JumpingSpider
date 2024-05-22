#### Problem 1
令$W_{t}=\sum_{i=1}^{n}W_t(i)$，则
$$
\begin{aligned}
W_{t+1}&=\sum_{i=1}^{n}W_t(i)(1-\varepsilon C_t(i))\\
&=W_t-\varepsilon\sum_{i=1}^{n}W_t(i)C_t(i)\\
&=W_t\left( 1-\varepsilon\sum_{i=1}^{n}P_t(i)C_t(i) \right)
\end{aligned}
$$
等式两边同求自然对数，并进行一步缩放，得到
$$
\begin{aligned}
\ln W_{t+1}&\leq\ln W_t+\ln\left( 1-\varepsilon\sum_{i=1}^{n}P_t(i)C_t(i) \right)\\
&\leq\ln W_t-\varepsilon\sum_{i=1}^{n}P_t(i)C_t(i)
\end{aligned}
$$
进一步得到
$$
\begin{aligned}
\ln W_t-\ln W_{t+1}&\geq\varepsilon\sum_{i=1}^{n}P_t(i)C_t(i)\\
\ln W_1-\ln W_{T+1}&\geq\varepsilon\sum_{t=1}^{T}\sum_{i=1}^{n}P_t(i)C_t(i)\\
\ln n-\varepsilon\sum_{t=1}^{T}\sum_{i=1}^{n}P_t(i)C_t(i)&\geq\ln W_{T+1}
\end{aligned}
$$
现在令$i^*=\mathop{\arg\!\min}_{i}\sum_{t=1}^{T}C_t(i)$，则有
$$
\begin{aligned}
W_{T+1}&\geq W_{T+1}(i^*)=\prod_{t=1}^{T}\left(1-\varepsilon C_t(i^*)\right)\\
\ln W_{T+1}&\geq\sum_{t=1}^{T}\ln(1-\varepsilon C_t(i^*))
\end{aligned}
$$
易证
$$\ln(1-\varepsilon)\geq-\frac{\varepsilon}{1-\varepsilon}$$
则
$$\ln(1-\varepsilon C_t(i^*))\geq-\frac{\varepsilon C_t(i^*)}{1-\varepsilon C_t(i^*)}\geq-\frac{\varepsilon C_t(i^*)}{1-\varepsilon}$$
用不等式传递性将其代入前面的式子，得到
$$
\begin{aligned}
\ln n-\varepsilon\sum_{t=1}^{T}\sum_{i=1}^{n}P_t(i)C_t(i)&\geq-\sum_{t=1}^{T}\frac{\varepsilon C_t(i^*)}{1-\varepsilon}\\
\sum_{t=1}^{T}\sum_{i=1}^{n}P_t(i)C_t(i)&\leq\frac{\ln n}{\varepsilon}+\frac{1}{1-\varepsilon}\sum_{t=1}^{T}C_t(i^*)
\end{aligned}
$$
由于
$$Regret_T=\sum_{t=1}^{T}\sum_{i=1}^{n}P_t(i)C_t(i)-\sum_{t=1}^{T}C_t(i^*)$$
所以有
$$
\begin{aligned}
Regret_T&\leq\frac{\ln n}{\varepsilon}+\frac{\varepsilon}{1-\varepsilon}\sum_{t=1}^{T}C_t(i^*)\\
&\leq\frac{\ln n}{\varepsilon}+\frac{\varepsilon T}{1-\varepsilon}
\end{aligned}
$$
我们认为$\varepsilon$比较小，肯定有$\varepsilon<\frac{1}{2}$，所以有$\frac{\varepsilon}{1-\varepsilon}\leq2\varepsilon$；再设$\varepsilon=\sqrt{\frac{\ln n}{2T}}$，则最终得到
$$Regret_T\leq2\sqrt{2T\ln n}$$
QED.
#### Problem 2
目标函数为
$$\max_{\mu_i}E(U_i)$$
先考虑玩家1，其中
$$E(U_1)=(v_1-b_1)P(b_1>b_2)+\frac{v_1-b_1}{2}P(b_1=b_2)$$
接下来分类讨论：
1. $c>0$时，有
	$$
	\left\{\begin{aligned}
	P(b_1>b_2)&=P(v_1>v_2)=1-v_1\\
	P(b_1=b_2)&=0
	\end{aligned}\right.
	$$
	则
	$$U_1=(1-v_1)(v_1-cv_1-d)$$
	因此
	$$\max U_1\implies b_1=0$$
1. $c<0$时，有
	$$
	\left\{\begin{aligned}
	P(b_1>b_2)&=P(v_1<v_2)=v_1\\
	P(b_1=b_2)&=0
	\end{aligned}\right.
	$$
	则
	$$U_1=v_1(v_1-cv_1-d)$$
	因此
	$$\max U_1\implies b_1=0$$
1. $c=0$时，有
	$$
	\left\{\begin{aligned}
	P(b_1>b_2)&=0\\
	P(b_1=b_2)&=1
	\end{aligned}\right.
	$$
	则
	$$U_1=\frac{v_1-b_1}{2}$$
	因此
	$$\max U_1\implies b_1=0$$

综上，我们需要$v_1$为任何值时，$b_1$都为0，因此
$$
\left\{\begin{aligned}
c=0\\
d=0
\end{aligned}\right.
$$
买家2与买家1同理。
#### Problem 3
设
$$\Phi(q_i,q_{-i})=\sum_{i=1}^{I}q_iP(Q)-cq_i$$
则
$$
\begin{aligned}
\Delta\Phi&=\Phi(q_i',q_{-i})-\Phi(q_i,q_{-i})\\
&=[Q'P(Q')-QP(Q)]-c(Q'-Q)
\end{aligned}
$$
而
$$\Delta u_i=[q_i'P(Q')-q_iP(Q)]-c(Q'-Q)$$
其中$\Delta\Phi$反映的是整个市场的利润变化，而$\Delta u_i$则仅反映$i$公司的利润变化，由于$P$是典型的逆需求函数，可以认为此潜在函数与公司自身的利益变化同向，因此此博弈为ordinal potential game。
#### Problem 4
题目需要证明当$T\to\infty$时，有
$$\forall i,\frac{1}{T}\left( \sum_{t=1}^{T}l^{t}w^{t}-\sum_{t=1}^{T} l_i^{t}\right)\to0$$
定义$R(w^{t},l^{t})=l^{t}\cdot w^{t}\cdot\mathbb{1}^{d}-l^{t}$，且$S=\mathbb{R}^{d}_{\leq0}$，则原题目变为
$$\forall l^{t},\exists w^{t},\text{s.t.}\quad T\to\infty\implies d\left( \frac{1}{T}\sum_{t=1}^{T}R(w^{t},l^{t}),S \right)\to0$$
即证明$S$是可接近的。再根据Blackwell's Approachability Theorem，原题目又等价于所有包含$S$的半空间$H$都是可接近的，即
$$\forall H=\{x\in\mathbb{R}^{d}:a^Tx\leq0,a\in\Delta^{d}\},\exists w^{t}:\forall l^{t},r(w^{t},l^{t})\in H$$
令$w^{t}=a$，则
$$a^Tr(w^{t},l^{t})=0$$
即$r(w^{t},l^{t})\in H$，QED.
#### Problem 5
竞拍者$i$的收益如下
$$u_i=(v_i-b_i)P_{win}$$
其中$P_{win}$为其他所有买家出价都低于$b_i$的概率
$$P_{win}=b_i^{N-1}$$
欲求最大收益，则令$u_i$对$b_i$的导数为零
$$
\begin{aligned}
&\frac{\partial }{\partial b_i}(v_i-b_i)b_i^{N-1}=0\\
\implies&(N-1)(v_i-b_i)b_i^{N-2}-b_i^{N-1}=0\\
\implies&b_i=\frac{N-1}{N}v_i^{N}
\end{aligned}
$$
对于第二高价拍卖来说，$b_i=v_i$，因此卖方收益即为第二高的估价。由顺序统计量可知， 第二高估价的概率密度函数为
$$f(x)=\frac{N!}{(N-2)!}x^{N-2}(1-x)$$
其期望为
$$
\begin{aligned}
E_{second}&=\int_{0}^{1}\ xf(x)dx\\
&=N(N-1)\left( \frac{1}{N}-\frac{1}{N+1} \right)\\
&=\frac{N-1}{N+1}
\end{aligned}
$$

对于所有支付拍卖来说，其总出价的期望为
$$E_{all}=N\int_{0}^{1}\ \frac{N-1}{N}x^{N}dx=\frac{N-1}{N+1}$$ 综上，二者期望相同，QED.
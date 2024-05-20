#### Problem 1
所以有
$$
\begin{aligned}
W_{t+1}&=\sum_{i=1}^{n}W_t(i)(1-\varepsilon)^{C_t(i)}\\
&\leq\sum_{i=1}^{n}W_t(i)(1-\varepsilon C_t(i))\\
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
W_{T+1}&\geq W_{T+1}(i^*)=(1-\varepsilon)^{\sum_{t=1}^{T}C_t(i^*)}\\
\ln W_{T+1}&\geq\ln(1-\varepsilon)\cdot\sum_{t=1}^{T}C_t(i^*)
\end{aligned}
$$ 
将其代入上一步的式子，得到
$$
\begin{aligned}
\ln n-\varepsilon\sum_{t=1}^{T}\sum_{i=1}^{n}P_t(i)C_t(i)&\geq\ln(1-\varepsilon)\cdot\sum_{t=1}^{T}C_t(i^*)\\
\sum_{t=1}^{T}\sum_{i=1}^{n}P_t(i)C_t(i)&\leq\frac{\ln n}{\varepsilon}-\frac{\ln(1-\varepsilon)}{\varepsilon}\sum_{t=1}^{T}C_t(i^*)
\end{aligned}
$$
易证
$$-\ln(1-\varepsilon)\leq\frac{\varepsilon}{1-\varepsilon}$$
所以
$$\sum_{t=1}^{T}\sum_{i=1}^{n}P_t(i)C_t(i)\leq\frac{\ln n}{\varepsilon}-\frac{1}{1-\varepsilon}\sum_{t=1}^{T}C_t(i^*)$$
由于
$$Regret\cdot T=\sum_{t=1}^{T}\sum_{i=1}^{n}P_t(i)C_t(i)-\sum_{t=1}^{T}C_t(i^*)$$
所以有
$$
\begin{aligned}
Regret&\leq\frac{1}{T}\left(\frac{\ln n}{\varepsilon}+\frac{\varepsilon}{1-\varepsilon}\sum_{t=1}^{T}C_t(i^*)\right)\\
&\leq\frac{\ln n}{\varepsilon T}+\frac{\varepsilon}{1-\varepsilon}
\end{aligned}
$$
我们认为$\varepsilon$比较小，肯定有$\varepsilon<\frac{1}{2}$，所以有$\frac{\varepsilon}{1-\varepsilon}\leq2\varepsilon$；再设$\varepsilon=\sqrt{\frac{\ln n}{2T}}$，则最终得到
$$Regret\leq2\sqrt{\frac{2\ln n}{T}}\implies\lim_{T\to\infty}Regret=0$$
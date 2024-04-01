可知对于不同的$i$，$\mathbb{1}(h_{\pi_i}(C_1)=h_{\pi_i}(C_2))$是相互独立的随机变量，记为$X_i$，且其期望与方差为
$$
\left\{\begin{aligned}
E(X_i)&=J\\
D(X_i)&=E(X_i^2)-E(X_i)^2=J-J^2
\end{aligned}\right.
$$
由此可推出
$$
\left\{\begin{aligned}
E(\hat{J})&=J\\
D(\hat{J})&=\frac{J(1-J)}{k}
\end{aligned}\right.
$$
根据Chebyshev不等式，可以得到
$$Pr(|J-\hat{J}|\geq\epsilon)\leq\frac{J(1-J)}{k\epsilon^2}\implies Pr(|J-\hat{J}|\leq\epsilon)\geq1-\frac{J(1-J)}{k\epsilon^2}$$
因此只需证明
$$\frac{J(1-J)}{k\epsilon^2}<\delta$$
将$k=O\left( \frac{1}{\epsilon^2\delta} \right)$代入，则有
$$\frac{J(1-J)}{\delta\epsilon^2}<O\left( \frac{1}{\delta\epsilon^2} \right)$$
由于$J$为一常数，易证上式成立。
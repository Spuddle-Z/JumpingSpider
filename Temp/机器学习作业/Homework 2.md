#### Problem 1
似然函数为
$$P=\prod_{i=1}^{n}p_i^{y_i}(1-p_i)^{1-y_i}$$
其对数似然则为
$$
\begin{aligned}
\log P&=\sum_{i=1}^{n}\left(y_i\log p_i+(1-y_i)\log(1-p_i)\right)\\
&=\sum_{i=1}^{n}[y_ih_i^T\beta-\log(1+\exp(h_i^T\beta))]
\end{aligned}
$$
因此，其对数似然函数形式如下：
$$\mathcal{L}(\beta,\alpha)=\sum_{i=1}^{n}\left\{y_iA-\log\left[1+\exp A\right]\right\}$$
其中
$$A=\sum_{k=1}^{d}\beta_kh_{ik}=\sum_{k=1}^{d}\beta_kReLU(X_i^T\alpha_k)$$
#### Problem 2
由第一问可以推出对$\beta$的梯度为
$$
\begin{aligned}
\frac{\partial \mathcal{L}}{\partial \beta}&=\sum_{i=1}^{n}\left( y_i-\frac{1}{1+e^{-A}} \right)\frac{\partial A}{\partial \beta}\\
&=\sum_{i=1}^{n}(y_i-p_i)h_i
\end{aligned}
$$
对$\alpha_k$的梯度为
$$\frac{\partial \mathcal{L}}{\partial \alpha_k}=\sum_{i=1}^{n}\frac{\partial \mathcal{L}}{\partial h_{ik}}\frac{\partial h_{ik}}{\partial \alpha_k}$$
其中
$$
\begin{aligned}
\frac{\partial \mathcal{L}}{\partial h_{ik}}&=\left( y_i-\frac{1}{1+e^{-A}} \right)\frac{\partial A}{\partial \alpha_k}\\
&=(y_i-p_i)\beta_k
\end{aligned}
$$
又有
$$
\begin{aligned}
\frac{\partial h_{ik}}{\partial \alpha_k}&=\left(\frac{\partial }{\partial \alpha_k}\alpha_k^TX_i\right)ReLU'(\alpha_k^TX_i)\\
&=X_i\mathbb{1}(\alpha_k^TX_i)
\end{aligned}
$$
综上
$$
\left\{\begin{aligned}
\frac{\partial \mathcal{L}}{\partial \beta}
&=\sum_{i=1}^{n}(y_i-p_i)h_i\\
\frac{\partial \mathcal{L}}{\partial \alpha_k}&=\sum_{i=1}^{n}(y_i-p_i)\beta_kX_i\mathbb{1}(\alpha_k^TX_i)
\end{aligned}\right.
$$
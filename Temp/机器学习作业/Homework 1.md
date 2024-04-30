$$
\begin{aligned}
\mu&=\tau^2X^T(\tau^2XX^T+\sigma^2I_n)^{-1}Y\\
&=X^T\left( XX^T+\frac{\sigma^2}{\tau^2}I_n \right)^{-1}Y
\end{aligned}
$$
由于$\lambda\geq0$为可调一参数，$\sigma^2$与$\varepsilon$有关，但$\tau^2$只与$\beta$有关，同样可调，则可令$\lambda=\frac{\sigma^2}{\tau^2}$，有
$$\mu=X^T(XX^T+\lambda I_n)^{-1}Y$$
又因为
$$X^T(XX^T+\lambda I_n)=X^TXX^T+\lambda X^T=(X^TX+\lambda I_{p})X^T$$
等式两侧同时左乘$(X^TX+\lambda I_{p})^{-1}$并右乘$(XX^T+\lambda I_n)^{-1}Y$，得
$$(X^TX+\lambda I_{p})^{-1}X^TY=X^T(XX^T+\lambda I_n)^{-1}Y$$
即证明二者等价。
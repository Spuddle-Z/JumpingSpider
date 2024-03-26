## 基本原理
原Logistic回归问题如下（其中$h_\theta(x)=\frac{1}{1+e^{\theta^Tx}}$）：
$$\min_\theta\ \frac{1}{m}\sum^m_{i=1}\left[y(-\log h_\theta(x))+(1-y)(-\log(1-h_\theta(x)))\right]+\frac{\lambda}{2m}\sum^m_{i=1}\theta_i^2$$
其中$-\log h_\theta(x)$与$-\log(1-h_\theta(x))$（下图蓝线）可近似为$cost_1(\theta^Tx)$与$cost_2(\theta^Tx)$（下图红线），如此处理可简化计算。

    \begin{center}

        \includegraphics[width=0.4\textwidth]{figure/log1.png}

        \includegraphics[width=0.4\textwidth]{figure/log2.png}

    \end{center}

    然后乘一个常数，原问题解不变，原问题变为：

    $$\min_\theta\ C\sum^m_{i=1}\left[y\cdot cost_1(\theta^Tx)+(1-y)\cdot cost_2(\theta^Tx)\right]+\frac{1}{2}\sum^m_{i=1}\theta_i^2$$

    C越大，决策边界的间隔（margin）越硬；C越小，决策边界的间隔越软。

\end{formal}

\subsubsection{核函数}

\begin{formal}

    核函数$k(x,l)$表现了$x$对点$l$的相似度，如高斯核函数$k(x,l)=e^{-\frac{\left\lVert x-l\right\rVert^2}{2\sigma^2}}$。可用$f^{(i)}_j=k(x^{(i)},l_j)$将原数据$x^{(i)}$转换为新特征$f^{(i)}$，此时可以使用SVM

    $$\min_\theta\ C\sum^m_{i=1}\left[y\cdot cost_1(\theta^Tf)+(1-y)\cdot cost_2(\theta^Tf)\right]+\frac{1}{2}\sum^m_{i=1}\theta_i^2$$

    对于高斯核函数，$\sigma$是另一个需要调节的参数。$\sigma$过大，核函数平缓，欠拟合；$\sigma$过小，核函数陡峭，过拟合。

\end{formal}

核技巧对样本点的处理可参考下图：

\begin{center}

    \includegraphics[width=0.5\textwidth]{figure/kernal.png}

\end{center}

即将样本点升维，令其线性可分。






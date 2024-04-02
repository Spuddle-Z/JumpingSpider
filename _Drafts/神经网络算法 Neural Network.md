  

\subsection{神经网络算法 Neural Network}

\subsubsection{原理}

\begin{formal}

    神经网络算法的基本原理如下图所示：

    \begin{center}

        \includegraphics[width=0.4\textwidth]{figure/neural_network.png}

    \end{center}

    设输入层、隐藏层与输出层共L层，则第l层神经元的值$a^{(l)}$由下式算得：

    $$a^{(l)}=\Theta^{(l-1)T}g(\hat{a}^{(l-1)})$$

    其中函数$g$为激活函数（logistic函数）；$\hat{a}$为加入偏置项后的神经元；$a^{(L)}$即为假设函数，i.e.$h_\Theta(x)=a^{(L)}$。这样从前向后计算的前向传播（forward propagation）可以得到$h_\Theta(x)$的值，进而算得代价函数$J(\Theta)$：

    $$J(\Theta)=-\frac{1}{m}\sum^m_{i=1}\left[y\log h_\Theta(x)+(1-y)\log(1-h_\Theta(x))\right]+\frac{\lambda}{2m}\sum_{l=1}^{L-1}\sum_{i=1}^{s_1}\sum_{j=1}^{s_{l+1}}(\Theta_{ij}^{(l)})^2$$

    其中，$\Theta_{ij}^{(l)}$为第l层第i行第j列的参数，$\frac{\lambda}{2m}\sum_{l=1}^{L-1}\sum_{i=1}^{s_1}\sum_{j=1}^{s_{l+1}}(\Theta_{ij}^{(l)})^2$为正则化项。\par

    与之相对的，反向传播（backpropagation）可从结果向前计算误差。先设$\Delta^{(l)}_{ij}=0$：

$$

\left\{\begin{aligned}

    \delta^{(L)}&=a^{(L)}-y \\

    \delta^{(l)}&=\Theta^{(l)T}\delta^{(l+1)}.*a^{(l)}.*(1-a^{(l)}) \\

    \Delta^{(l)}&:=\Delta^{(l)}+\delta^{(l+1)}a^{(l)T} \\

    D^{(l)}_{ij}&=

    \left\{\begin{aligned}

        &\frac{1}{m}\Delta^{(l)}_{ij}+\lambda\Theta^{(l)}_{ij},&if\ j\neq0 \\

        &\frac{1}{m}\Delta^{(l)}_{ij},&if\ j=0

    \end{aligned}\right. \\

    \frac{\partial}{\partial\Theta_{ij}^{(l)}}J(\Theta)&=D^{(l)}_{ij}

\end{aligned}\right.

$$

由反向传播可以得到$\frac{\partial}{\partial\Theta_{ij}^{(l)}}J(\Theta)$。\par

\end{formal}

\begin{unimportant}

    此外，利用神经网络算法解决多元分类问题时，其输出是由多个bool值组成的K维向量，因此相应地，其代价函数也变为

    $$J(\Theta)=-\frac{1}{m}\sum^m_{i=1}\sum^K_{k=1}\left[y_k\log h_\Theta(x)_k+(1-y_k)\log(1-h_\Theta(x)_k)\right]+\frac{\lambda}{2m}\sum_{l=1}^{L-1}\sum_{i=1}^{s_1}\sum_{j=1}^{s_{l+1}}(\Theta_{ij}^{(l)})^2$$

\end{unimportant}

\subsubsection{梯度检验 Gradient Check}

\begin{formal}

    为防止反向传播计算偏导数的过程中出现bug，还可用下式求得梯度近似值进行比较：

    $$\frac{\partial}{\partial\theta_i}J(\Theta)=\frac{J(\theta_1,...,\theta_i+\varepsilon,...,\theta_n)-J(\theta_1,...,\theta_i-\varepsilon,...,\theta_n)}{2\varepsilon}$$

    其中，$\varepsilon$取较小值如$10^{-4}$。将此近似值与用反向传播算出的偏导数比较，若差距过大，则原程序存在bug。

\end{formal}

\begin{warning}

    注*：以此方法求梯度的计算量很大，若已验证程序正常，则要确定关掉梯度检验再进行正式运算，否则程序运行将非常缓慢。

\end{warning}

\subsubsection{随机初始化}

若以全零矩阵初始化$\Theta$，则将有$a^{(l)}_1=a^{(l)}_2=...=a^{(l)}_n$，假设函数信息量极少，浪费算力。

\begin{formal}

    因此，一般会设定一$\varepsilon>0$，然后随机生成初始$\Theta$，满足$\Theta_{ij}^{(l)}\in(-\varepsilon,\varepsilon)$。

\end{formal}

\subsubsection{使用步骤}

a. 首先选择合适的神经网络架构（包括合适的隐藏层数与隐藏神经元数）；\par

b. 训练神经网络

\begin{lstlisting}

    double g(x); // 激活函数

    double J(Theta); // 代价函数

    double Theta = random, Delta = 0; // 初始化

    for (int i=0; i<m; i++) // 对m个样本依次执行

    {

        // 执行前向传播，计算各神经元及假设函数

        a_1 = x[i];

        a_2 = g(Theta_1 * a_1);

        ...

        a_L = g(Theta_(L-1) * a_(L-1));

        // 计算代价函数

        cost = J(Theta);

        // 执行反向传播，计算偏导数

        delta_L = a_L - y;

        delta_(L-1) = Theta_(L-1).T * delta_L .* a_(L-1) .* (1-a_(L-1));

        ...

        delta_2 = Theta_2.T * delta_3 .* a_2 .* (1-a_2);

        Delta_(l-1) += delta_l * a_(l-1).T;

        costp = Jp(Theta);

        // 执行梯度检验

        check(costp, Theta);

        if not pass {

            raise error;

        }

        else{

            turn off gradient check;

        }

    }

\end{lstlisting}\par

c. 利用梯度下降法或其他高级优化算法最小化代价函数。
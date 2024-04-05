---
tags:
  - Knowledge
aliases:
  - 线性判别算法
  - Linear Discriminant Analysis
---
## 定义
![[Pasted image 20240319105559.png|400]]
- **线性判别算法(Linear Discriminant Analysis, LDA)**：是一种监督学习中的降维技术。LDA通过将高维数据投影到低维空间中，*使投影后的类内方差最小，类间方差最大*。LDA的目标是找到最符合以上条件的投影平面。

LDA的目标函数如下，其中$S=\frac{\sigma^2_{between}}{\sigma^2_{within}}$：$$\max_{\beta}S$$
其中$\beta$即为其投影平面，因此我们只需要求得其方向，而其模长并不重要。
## 推导过程
对于一个二分类模型，其推导过程如下：

定义以下符号：$\mu_{+},\mu_{-}$分别为正负样本的均值，$\sigma_{+}^2,\sigma_{-}^2$分别为投影后正负样本的方差，$\Sigma_{+},\Sigma_{-}$分别为正负样本的[[概率论#^8w027v|协方差矩阵]]，$n_{+},n_{-}$分别为正负样本的个数。

对于投影后的类间方差，我们用投影后的正负样本均值差来表示：$$\begin{aligned}
\sigma^2_{between}&=(\mu_{+}^T\beta-\mu_{-}^T\beta)^2\\
&=[(\mu_{+}-\mu_{-})^T\beta]^2
\end{aligned}$$
对于投影后的类内方差，我们分别计算$\sigma^2_{+},\sigma^2_{-}$并将其加权求和：
$$\sigma^2_{within}=n_{+}\sigma^2_{+}+n_{-}\sigma^2_{-}$$
其中
$$
\begin{aligned}
\sigma_{+}^2&=E[(X_{+}^T\beta-\mu_{+}^T\beta)^2]\\
&=\beta^TE[(X_{+}-\mu_{+})(X_{+}-\mu_{+})^T]\beta\\
&=\beta^T\Sigma_{+}\beta
\end{aligned}
$$
同理，$\sigma_{-}^2=\beta^T\Sigma_{-}\beta$。此时我们需要找到一个合适的投影$\beta$，使得$S$最大化。易推出$$S=\frac{\sigma^2_{between}}{\sigma^2_{within}}=\frac{\beta^TS_{B}\beta}{\beta^TS_{W}\beta}$$
其中$$\left\{\begin{aligned}
S_{B}&=(\mu_{+}-\mu_{-})(\mu_{+}-\mu_{-})^T\\
S_{W}&=n_{+}\Sigma_{+}+n_{-}\Sigma_{-}
\end{aligned}\right.$$
由于分子分母都有$\beta$，因此$\beta$的模长并不重要，可以随意放缩，我们令$\beta^TS_{W}\beta=1$，即可得到$$\max_{\beta}\beta^TS_{B}\beta,s.t.\beta^TS_{W}\beta=1$$
此处使用拉格朗日乘子法：
$$\begin{aligned}
&L=\beta^TS_{B}\beta-\lambda(\beta^TS_{W}\beta-1)\\
\implies &\frac{\partial L}{\partial \beta}=2S_{B}\beta-2\lambda S_{W}\beta=0\\
\implies &S_{W}^{-1}S_{B}\beta=\lambda\beta
\end{aligned}$$
由此可知，$\beta$是$S_{W}^{-1}S_{B}$的特征向量。我们只需求出$\beta$的方向，这里将$S_{W}^{-1}S_{B}\beta$展开，可知$\beta$与$S_{W}^{-1}(\mu_{+}-\mu_{-})$同向，因此最终$$\beta\sim S_{W}^{-1}(\mu_{+}-\mu_{-})$$
## 使用方法
1. 计算$S_{W}^{-1}(\mu_{+}-\mu_{-})$，并将其标准化，得到$\beta$；
2. 将原数据集$X$通过$\beta$投影，$\beta^TX$即为降维后的数据集。
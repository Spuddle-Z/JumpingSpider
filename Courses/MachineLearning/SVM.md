---
tags:
  - Knowledge
aliases:
  - 支持向量机
  - Support Vector Machine
---
## 基本概念
> [!definition] 支持向量机 (Support Vector Machines, SVM)
> 是一种二分类模型。对于空间上两组线性可分的数据点，SVM通过找到一个使两组数据点间隔最大的超平面，来实现对数据的分类。
> ![[Pasted image 20240417211538.png|325]]
## 原理
### 目标函数推导
对于一组数据点，其中第$i$个数据点我们表示为$(X_i,y_i)$，其中$X_i\in\mathbb{R}^n,y_i\in\{-1,+1\}$。那么$n$维空间中的一个超平面可以表示为$w^Tx+b=0$，$w$也是一个$n$维向量，其与这个平面垂直。对于$\forall X_i$，若其与$w$在超平面同侧，则$w^TX_i+b>0$；反之，则$w^TX_i+b<0$。

在此基础上，我们再乘上$y_i$，得到$\gamma_i=y_i(w^TX_i+b)$，此时只有数据点$i$分类正确时，才有$\gamma_i>0$，数据点离超平面越远，$\gamma$越大。我们称$\gamma$为**margin**。

我们需要让margin尽可能大，但如果直接最大化$\gamma_i$，由于$w,b$都是不确定的参数，$w,b$可能会水涨船高变得无限大，因此需要除以其模长控制其大小，即调整$\gamma_i$为$$\gamma_i=y_i\frac{w^Tx_i+b}{||w||}$$
但实际上，我们需要最大化的只是所有数据中最小的那个margin，设其为$\tau$，则有
$$\max_{\tau,w,b}\frac{\tau}{||w||}\quad s.t.\forall i,y_i(w^Tx_i+b)\geq\tau$$
将$\tau$固定，则最大化$\frac{\tau}{||w||}$等同于最小化$||w||$，再将其平方使其光滑，前面加上系数方便求导，则上式变为
$$\min_{w,b}\frac{1}{2}||w||^2\quad s.t.\forall i,y_i(w^Tx_i+b)\geq1$$
### 求解方法
上面得到的目标优化问题的[[凸优化#拉格朗日乘子法|拉格朗日函数]]为
$$L(w,b,\lambda)=\frac{1}{2}||w||^2-\sum_{i=1}^{n}\lambda_i\left[y_i(w^TX_i+b)-1\right]$$
根据[[凸优化#KKT条件|KKT条件]]，使
$$\frac{\partial L}{\partial w}=\frac{\partial L}{\partial b}=0$$
推得
$$
\left\{\begin{aligned}
\sum_{i=1}^{n}\lambda_iy_iX_i&=w\\
\sum_{i=1}^{n}\lambda_iy_i&=0
\end{aligned}\right.
$$
将其代入$L(w,b,\lambda)$，得到
$$L(w,b,\lambda)=\sum_{i=1}^{n}\lambda_i-\frac{1}{2}\sum_{i=1}^{n}\sum_{j=1}^{n}y_iy_j\lambda_i\lambda_jX_i^TX_j$$
设上式为$W(\lambda)$，则原问题变为
$$
\begin{aligned}
\max_{\lambda}\ &W(\lambda)\\
s.t.\ &\forall i,\lambda_i\geq0\\
&\sum_{i=1}^{n}\lambda_iy_i=0
\end{aligned}
$$
此优化问题易于求解，求得$\lambda^*$后便可根据$w=\sum_{i=1}^{n}\lambda_iy_iX_i$求出$w^*$，并进一步根据$b=-\frac{1}{2}(\min_{i:y_i=+1}w^TX_i+\max_{i:y_i=-1}w^TX_i)$求出$b^*$。
## 核方法与核技巧
### 核方法
> [!definition] 核方法 (Kernel Method)
> 当数据点不再线性可分时，就需要对原本的数据进行处理，得到新的特征，使之能够线性可分。我们记对$X$处理后的特征为$\phi(X)$，并用$\phi(X_i)$替代SVM过程中所有的$X_i$。

核方法对样本点的处理可参考下图：
![[kernal.png|400]]
### 核技巧
在SVM的步骤中，我们会发现所有计算中，涉及$X_i$的地方，都是以内积$\left\langle X_i,X_j\right\rangle$的形式出现的，如：
- 当我们要分类某个点$X_i$时，我们需要计算$w^TX_i+b$，将$w=\sum_{i=1}^{n}\lambda_iy_iX_i$代入可得
	$$
	\begin{aligned}
	w^TX_i+b&=\left(\sum_{j=1}^{n}\lambda_jy_jX_j\right)^TX_i+b\\
	&=\sum_{j:\lambda_j>0}\lambda_jy_j\left\langle X_j,X_i\right\rangle+b
	\end{aligned}
	$$
- 求解$L(w,\lambda,\mu)$时，其中也只出现了内积$\left\langle X_i,X_j\right\rangle$

由此看出，在实际计算中，我们其实可以直接将$\left\langle X_i,X_j\right\rangle$看作一个整体来计算，使用核技巧替换为$\phi(X_i)$后也是如此。

因此，我们定义**核函数(Kernel Function)**为
$$K(X_i,X_j)=\phi(X_i)^T\phi(X_j)$$
> [!definition] 核技巧 (Kernel Trick)
> 即直接计算核函数，从而避开对两$\phi$的分别计算，因为一些情况下，前者的计算量会比后者更小。
### 核函数的选择
较为基础的$\phi$会通过将原本的数据投射到高维空间中，来使其线性可分，如$\phi(X)=[x_1,x_2,\cdots,x_{n},x_1^2,x_2^2,\cdots,x_{n}^2]$就将原数据投射到了二维空间中。投射到越多的高维空间中，数据点就会越容易线性可分，因此，我们来尝试将其投射到无限维。
> [!definition] 径向基函数 (Radial Basis Function, RBF)
> 是指沿径向对称的函数，往往是关于两样本点欧式距离的单调函数，其中最常用的是高斯核函数。

> [!definition] 高斯核 (Gaussian Kernel)
> 这个核函数便是由两个无限维的$\phi$合成的，其公式如下
> $$K(X_i,X_j)=\exp\left( -\frac{||X_i-X_j||^2}{2\sigma^2} \right)$$
> 其中$\sigma$是一个可以调节的参数，$\sigma$过大，核函数平缓，容易欠拟合；$\sigma$过小，核函数陡峭，容易过拟合。

观察高斯核可以发现：两样本点距离较近，则$K\to1$；距离较远，则$K\to0$。这个分类方式类似于K-Means。
## 软边界SVM
![[Pasted image 20240417211328.png|250]]
数据样本中可能会出现**异常值(Outlier)**，不值得为它们调整超平面，此时引入$\xi$来软化边界，其几何意义如上图所示。则原问题变为：
$$
\begin{aligned}
\min_{\xi,w,b}&\quad\frac{1}{2}||w||^2+C\sum_{i=1}^{n}\xi_i\\
s.t.&\quad y_i(w^Tx_i+b)\geq1-\xi_i\\
&\quad\xi_i\geq0
\end{aligned}
$$
此时其约束条件可以总结为
$$s.t.\quad \xi_i\geq\max(0,1-y_i(w^Tx_i+b))$$
由于原问题是求最小值，$\xi_i$肯定是要尽量小的，因此可以直接将其代入目标函数得到
$$\min_{w,b}\quad\frac{1}{2}||w||^2+C\sum_{i=1}^{n}\underbrace{\max(0,1-y_i(w^Tx_i+b))}_{\text{Hinge Loss}}$$
上式中被括起来的部分就是[[机器学习#^5tx2cc|Hinge loss]]，即对于越过margin的样本点会有一个线性增长的惩罚。$C$为一可调参数，$C$越大，越界的惩罚越大，边界越硬，容易过拟合。
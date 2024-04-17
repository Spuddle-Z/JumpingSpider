---
tags:
  - Knowledge
aliases:
  - 支持向量机
  - Support Vector Machine
---
## 基本概念
- **支持向量机(Support Vector Machines, SVM)**：是一种二分类模型。对于空间上两组线性可分的数据点，SVM通过找到一个使两组数据点间隔最大的超平面，来实现对数据的分类。
## 原理
### 目标函数推导
对于一组数据点，其中第$i$个数据点我们表示为$(X_i,y_i)$，其中$X_i\in\mathbb{R}^n,y_i\in\{-1,+1\}$。那么$n$维空间中的一个超平面可以表示为$w^Tx+b=0$，$w$也是一个$n$维向量，其与这个平面垂直。对于$\forall X_i$，若其与$w$在超平面同侧，则$w^TX_i+b>0$；反之，则$w^TX_i+b<0$。

在此基础上，我们再乘上$y_i$，得到$\gamma_i=y_i(w^TX_i+b)$，此时只有数据点$i$分类正确时，才有$\gamma_i>0$，数据点离超平面越远，$\gamma$越大。我们称$\gamma$为**margin**。

我们需要让margin尽可能大，但如果直接最大化$\gamma_i$，由于$w,b$都是不确定的参数，$w,b$可能会水涨船高变得无限大，因此需要除以其模长控制其大小，即调整$\gamma_i$为$$\gamma_i=y_i\frac{w^Tx_i+b}{||w||}$$
但实际上，我们需要最大化的只是所有数据中最小的那个margin，设其为$\tau$，则有
$$\max_{\tau,w,b}\frac{\tau}{||w||}\quad s.t.\forall i,y_i(w^Tx_i+b)\geq\tau$$
将$\tau$固定，则最大化$\frac{\tau}{||w||}$等同于最小化$||w||$，再将其平方使其光滑，前面加上系数方便求导，则上式变为
$$\min_{w,b}\frac{1}{2}||w||^2\quad s.t.\forall i,y_i(w^Tx_i+b)\geq1$$
### 计算方法
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
## 核技巧
回到$w^TX_i+b$，将$w=\sum_{i=1}^{n}\lambda_iy_iX_i$代入可得
$$
\begin{aligned}
w^TX_i+b&=\left(\sum_{j=1}^{n}\lambda_jy_jX_j\right)^TX_i+b\\
&=\sum_{j:\lambda_j>0}\lambda_jy_j\left\langle X_j,X_i\right\rangle+b
\end{aligned}
$$


---
## 基本原理
原Logistic回归问题如下（其中$h_\theta(x)=\frac{1}{1+e^{\theta^Tx}}$）：
$$\min_\theta\ \frac{1}{m}\sum^m_{i=1}\left[y(-\log h_\theta(x))+(1-y)(-\log(1-h_\theta(x)))\right]+\frac{\lambda}{2m}\sum^m_{i=1}\theta_i^2$$
其中$-\log h_\theta(x)$与$-\log(1-h_\theta(x))$（下图蓝线）可近似为$cost_1(\theta^Tx)$与$cost_2(\theta^Tx)$（下图红线），如此处理可简化计算。
![[Pasted image 20240402112219.png|650]]
然后乘一个常数，原问题解不变，原问题变为：
$$\min_\theta\ C\sum^m_{i=1}\left[y\cdot cost_1(\theta^Tx)+(1-y)\cdot cost_2(\theta^Tx)\right]+\frac{1}{2}\sum^m_{i=1}\theta_i^2$$
C越大，决策边界的间隔（margin）越硬；C越小，决策边界的间隔越软。
### 核函数
核函数$k(x,l)$表现了$x$对点$l$的相似度，如高斯核函数$k(x,l)=e^{-\frac{\left\lVert x-l\right\rVert^2}{2\sigma^2}}$。可用$f^{(i)}_j=k(x^{(i)},l_j)$将原数据$x^{(i)}$转换为新特征$f^{(i)}$，此时可以使用SVM
$$\min_\theta\ C\sum^m_{i=1}\left[y\cdot cost_1(\theta^Tf)+(1-y)\cdot cost_2(\theta^Tf)\right]+\frac{1}{2}\sum^m_{i=1}\theta_i^2$$
对于高斯核函数，$\sigma$是另一个需要调节的参数。$\sigma$过大，核函数平缓，欠拟合；$\sigma$过小，核函数陡峭，过拟合。

核技巧对样本点的处理可参考下图：
![[kernal.png|400]]
即将样本点升维，令其线性可分。






---
tags:
  - Knowledge
---
## 基本概念
机器学习需要用给出的数据$X_i,y_i$去训练一个模型的参数$\beta$，使得将$X_i$输入模型后，模型的输出能尽量接近于$y_i$。这个训练的过程一般通过最小化损失函数$$\mathcal{L}(\beta)=\sum_{i=1}^nL(y_i,X_i^T\beta)$$来实现，其中$L(y_i,X_i^T\beta)$是其中第$i$组数据的损失。
## 常见损失函数
### 线性回归的损失函数
#### Huber Loss
平方误差对于异常点十分敏感，因此引入Huber loss，即绝对值较低部分使用平方误差，$\delta$之外的部分则变为线性误差，其公式如下：
$$
L(y_i,X_i^T\beta)=
\left\{\begin{aligned}
&\frac{1}{2}(y_i,X_i^T\beta)^2 &,|y_i,X_i^T\beta|\leq\delta \\
&\delta|y_i,X_i^T\beta|-\frac{\delta^2}{2} &,\text{otherwise}
\end{aligned}\right.
$$
![[Pasted image 20240305110220.png|400]]
### 分类模型的损失函数
#### 逻辑回归损失函数
对于逻辑回归，我们需要最大化其似然函数$$\prod_{i=1}^{n}P(y_{i}|X_{i},\beta)$$，此函数代表模型参数为$\beta$，输入为$X$时，输出为$y$的概率。
1. 若$y_{i}\in\left\{0,1\right\}$，我们称其为0/1响应，此时
	$$
	\begin{aligned}
	P(y_{i}|X_{i},\beta)&=P(y_{i}=1|X_{i},\beta)^{y_{i}}P(y_{i}=0|X_{i},\beta)^{1-y_{i}}\\
	&=\left[ \frac{\exp(X_{i}^{T}\beta)}{1+\exp(X_{i}^{T}\beta)} \right]^{y_{i}}\left[ \frac{1}{1+\exp(X_{i}^{T}\beta)} \right]^{1-y_{i}}\\
	&=\frac{\exp(y_{i}X_{i}^{T}\beta)}{1+\exp(X_{i}^{T}\beta)}
    \end{aligned}
    $$
    而为了简便计算，我们将最终的损失函数定为负的对数似然函数$$L(y_i,X_i^T\beta)=-[y_i,X_i^T\beta-\log(1+\exp(X_{i}^{T\beta}))]$$
1. 若$y_{i}\in\{+1,-1\}$，我们称为$\pm$响应，此时
	$$
	\left\{\begin{aligned}
    P(y_{i}=+1)&=\frac{1}{1+\exp(-X_{i}^{T}\beta)}\\
    P(y_{i}=-1)&=\frac{1}{1+\exp(X_{i}^{T}\beta)}
    \end{aligned}\right.
	$$
	其损失函数同样取负对数似然函数$$L(y_i,X_i^T\beta)=\log[1+\exp(-y_iX_i^T\beta)]$$
#### 其它分类模型损失函数
- Logistic loss：用于逻辑回归。$$\log(1+\exp(-y_iX_i^T\beta))$$
- Hinge loss：此函数计算较logistic loss更为简便，一般用于支持向量机。$$\max(0,1-y_iX_i^T\beta)$$
- Exponential loss：此函数一般用于AdaBoost。$$\exp(-y_iX_i^T\beta)$$
- Zero-one loss：此函数无法求导，一般用于计算被错误分类的样本个数。$$\mathbb{1}(y_iX_i^T\beta<0)$$

![[Pasted image 20240311210123.png|450]]
以上四种函数关系如上图，
- 由图可以看出，hinge loss与exponential loss其实都是对logistic loss的近似。
- 图中横轴为$m_{i}=y_{i}X_{i}^{T}\beta$，也即这四种函数均是基于$y_{i}X_{i}^{T}\beta$的，我们将此值$m_{i}$称为样本$(y_{i},X_{i})$的**margin**。Margin为负时，模型将受到惩罚，越负惩罚越大；当margin为比较小的正值时，依然会受到一定的惩罚，因此我们其实是希望margin能够尽可能地大，以此巩固已经正确了的分类结果。
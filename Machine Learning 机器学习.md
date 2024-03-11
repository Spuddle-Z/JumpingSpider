---
tags:
  - Knowledge
---
# 三种模型
- 生成模型(Generative Model)：$P_\theta(X,Y)$，
- 判定模型(Discriminative Model)：$P_\theta(Y|X)$，
- 模型(Descriptive Model)：$P_\theta(X)$
# Linear Model
- **MLE**(Maximum Likelihood Estimation)：最大似然估计
## Logistic Regression
目标是求
$$\max_\beta P(y_1^*,y_2^*,...,y_n^*|x_1,x_2,...,x_n,\beta)$$
# 损失函数 Loss Function
## 基本概念
机器学习需要用给出的数据$X_i,y_i$去训练一个模型的参数$\beta$，使得将$X_i$输入模型后，模型的输出能尽量接近于$y_i$。这个训练的过程一般通过最小化损失函数$$\mathcal{L}(\beta)=\sum_{i=1}^nL(y_i,X_i^T\beta)$$来实现，其中$L(y_i,X_i^T\beta)$是其中第$i$组数据的损失。
## 线性回归的损失函数
### Huber Loss
平方误差对于异常点十分敏感，因此引入Huber loss，即绝对值较低部分使用平方误差，$\delta$之外的部分则变为线性误差，其公式如下：
$$
L(y_i,X_i^T\beta)=
\left\{\begin{aligned}
&\frac{1}{2}(y_i,X_i^T\beta)^2 &,|y_i,X_i^T\beta|\leq\delta \\
&\delta|y_i,X_i^T\beta|-\frac{\delta^2}{2} &,\text{otherwise}
\end{aligned}\right.
$$
![[Pasted image 20240305110220.png|400]]
## 逻辑回归的损失函数
### 0/1响应
- Zero-one loss：没有办法求导。$$\mathbb{1}(y_i,X_i^T\beta<0)$$
- Hinge loss：$$\max(0,1-y_i,X_i^T\beta)$$
- Exponential loss：$$\exp(-y_i,X_i^T\beta)$$
- Logistic loss：$$\log(1+\exp(-y_i,X_i^T\beta))$$
![[Pasted image 20240305112319.png|450]]
$$\left( \frac{}{} \right)$$
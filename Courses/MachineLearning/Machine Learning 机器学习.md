---
tags:
  - Knowledge
---
# 概论
- 生成模型(Generative Model)的目标是最大化$P_\theta(X,Y)$。
- **判定模型(Discriminative Model)**的目标是最大化$P_\theta(y|X)$，也即在输入为$X$的情况下，令参数为$\theta$的模型输出$y$的概率最大。训练判定模型的本质是根据已知的$X,y$，找到$P_{\theta}(y|X)$的[[Probability Theory 概率论#^tyfz0r|最大似然估计]]，也即是一个最小化$P_{\theta}(y|X)$与$P_{Data}(y|X)$之间的[[Information Theory 信息论#^ejkg5c|KL散度]]的过程。
- 模型(Descriptive Model)：$P_\theta(X)$
# Linear Model
- **MLE**(Maximum Likelihood Estimation)：最大似然估计
## Logistic Regression
目标是求
$$\max_\beta P(y_1^*,y_2^*,...,y_n^*|x_1,x_2,...,x_n,\beta)$$
### CE

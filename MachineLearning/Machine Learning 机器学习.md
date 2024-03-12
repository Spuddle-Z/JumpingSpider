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
### CE

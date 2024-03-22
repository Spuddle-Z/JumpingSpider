---
tags:
  - Knowledge
---
## 对偶问题
### Farkas引理
设$A\in\mathbb{R}^{m\times n},b\in\mathbb{R}^{m}$，则以下两个论断有且只有一个是对的：
1. $\exists x\in\mathbb{R}^{n}$，使得$Ax=b$，且$x\geq0$；
2. $\exists y\in\mathbb{R}^{m}$，使得$A^Ty\geq0$，且$b^Ty<0$。

直观证明可见[知乎上Johnny Richards的回答](https://www.zhihu.com/question/279644412/answer/565859435)。
### 线性规划的对偶问题
考虑一个标准的线性规划
$$\begin{aligned}
\min&\ c^Tx\\
\text{subject to}&\ Ax=b,x\succeq0
\end{aligned}$$
则其对偶问题为
$$\begin{aligned}
\max&\ -b^T\nu\\
\text{subject to}&\ A^T\nu+c\succeq0
\end{aligned}$$
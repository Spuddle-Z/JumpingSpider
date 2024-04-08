#### Problem 1
- 玩家1的最佳策略是：
	- 如果玩家2选择L，那么玩家1选择U；
	- 如果玩家2选择M，那么玩家1选择M；
	- 如果玩家2选择R，那么玩家1选择D；
- 玩家2的最佳策略是：
	- 如果玩家1选择U，那么玩家2选择M；
	- 如果玩家1选择M，那么玩家2选择L；
	- 如果玩家1选择D，那么玩家2选择R；

因此，我们可以发现存在一个唯一的纯策略均衡，即(D, R)。

若U,M上同时有正权重，为使自己的收益最大化，玩家2若在L,M上有正权重，只会在L,M之一上有正权重，同时给玩家1带来较大损失；此时玩家1则被迫调整策略到U,M中的一种策略上，玩家2则会有较大损失；最终会在(U, L)->(U, M)->(M, M)->(M, L)->(U, L)->...中循环，无法平衡。

若只有U, D上有正权重，则玩家2只会在M, R上有权重，一部分依旧会在(U, L)->(U, M)->(M, M)->(M, L)->(U, L)->...中循环，无法平衡。

因此只有在权重全部在(D, R)上时，才会达到平衡。
#### Problem 2
设 $g(x)=\inf_{y\in Y}f(x,y)$ 和 $h(y)=\sup_{x\in X}f(x,y)$。我们可以知道，对于所有的 $x\in X,y\in Y$，有 $g(x)\leq f(x,y)$ 和 对于所有的 $x\in X,y\in Y$，有 $f(x,y)\leq h(y)$。

我们有 $\sup_{x\in X}g(x)\leq f(x,y)$ 和 $f(x,y)\leq \inf_{y\in Y}h(y)$，即 $\sup_{x \in X} \inf_{y \in Y} f(x, y) \leq \inf_{y \in Y} \sup_{x \in X} f(x, y)$。
#### Problem 3
我们设
$$
A=
\begin{bmatrix}
4&3&1&4\\
2&5&6&3\\
1&0&7&0
\end{bmatrix}
$$
我们可以通过解
$$
\begin{aligned}
\max_x\min_y\ x^TAy
\end{aligned}
$$
来求得鞍点。进一步来说，我们可以将其拆分为两个LP：
$$
\begin{aligned}
\min_y&\ v\\
s.t.\quad Ay&\leq v\mathbb{1}\\
y^T\mathbb{1}&=1\\
y&\geq0
\end{aligned}
\quad\text{and}\quad
\begin{aligned}
\max_x&\ u\\
s.t.\quad A^Tx&\geq u\mathbb{1}\\
x^T\mathbb{1}&=1\\
x&\geq0
\end{aligned}
$$
然后通过以下的代码来求解线性规划：
```python
from scipy.optimize import linprog

def find_saddle_point(matrix):
    c = [0] * len(matrix) + [-1]
    A_ub = [[-i for i in row]+[1] for row in zip(*matrix)]
    b_ub = [0] * len(matrix[0])
    A_eq = [[1] * len(matrix) + [0]]
    b_eq = 1
    bounds = [(0, None) for _ in range(len(matrix))] + [(None, None)]
    res_A = linprog(c, A_ub=A_ub, b_ub=b_ub, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method='highs')

    c = [0] * len(matrix[0]) + [1]
    A_ub = [x+[-1] for x in matrix]
    b_ub = [0] * len(matrix)
    A_eq = [[1] * len(matrix[0]) + [0]]
    b_eq = 1
    bounds = [(0, None) for _ in range(len(matrix[0]))] + [(None, None)]
    res_B = linprog(c, A_ub=A_ub, b_ub=b_ub, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method='highs')

    return res_A.x[:len(matrix)], res_B.x[:len(matrix[0])], res_A.fun


matrix = [[4, 3, 1, 4],
		  [2, 5, 6, 3],
		  [1, 0, 7, 0]]

res = find_saddle_point(matrix)
print("Player A's strategy:", res[0])
print("Player B's strategy:", res[1])
print("Value of the game:", res[2])
```
其输出为：
```
Player A's strategy: [0.57142857 0.42857143 0.        ]
Player B's strategy: [0.71428571 0.         0.28571429 0.        ]
Value of the game: -3.142857142857145
```
#### Problem 4
我们只需要将第三题中的矩阵替换为如下矩阵，即可套用相同的理论与代码求得解。
$$\begin{bmatrix}
0&5&-2\\
-3&0&4\\
6&-4&0
\end{bmatrix}$$
程序输出为：
```
Player A's strategy: [0.36363636 0.34965035 0.28671329]
Player B's strategy: [0.30769231 0.29370629 0.3986014 ]
Value of the game: -0.6713286713286711
```
#### Problem 5
经过计算，无论初始的策略在任何一点，最终都会归到($a_1,b_1$)。因此，即使初始策略为混合策略，也同样会汇聚到$(a_1,b_1)$。
#### Problem 6
可以设玩家1选择$U$策略的概率为$x$，玩家2选择$L$策略的概率为$y$，则可以求得
$$
\left\{\begin{aligned}
u_1&=-3(y+1)x+10y\\
u_2&=(3x-10)y+3x+2
\end{aligned}\right.
$$
因此，$\left\{\begin{aligned}x&\in[0,1]\\y&=0\end{aligned}\right.$上的点均为NE，所以$\hat{y}=y^*=0$，则$(x^*,\hat{y})$与$(\hat{x},y^*)$也是NE。
#### Problem 7
将$A$看作$n$个$m$维的行向量，则$x\geq0$时，$Ax$可以看作一个由这$n$个向量张成的凸锥；而$y$则可以看作一个过原点的有向超平面的法向量。若某个向量与$y$的乘积大于0，则此向量在超平面的正面；若乘积小于0，则在其反面。

此时同样是$m$维的向量$b$会有两种情况：
1. $b$在凸锥之内时，存在一组$A$中列向量的线性组合等于$b$，对应引理的第一种情况；
2. $b$在凸锥之外时，由凸集分离定理易证，存在一个过原点的超平面，可以将这个凸锥和$b$分开，对应引理的第二种情况。

综上，Farka’s Lemma得证。
#### Problem 8
设$f:[a,b]\to[a,b]$，其中$a,b\in\mathbb{R}$。再令$g(x)=f(x)-x$，由于$f$连续，易证$g$连续。由$f$的值域可知，$g(a)\geq0$且$g(b)\leq0$，则：
1. 若$g(a)=0$或$g(b)=0$，则直接成立；
2. 若$\left\{\begin{aligned}g(a)>0\\g(b)<0\end{aligned}\right.$，则由介值定理，$\exists c\in(a,b)$，使得$g(c)=0$，即$f(c)=c$。

综上，得证。
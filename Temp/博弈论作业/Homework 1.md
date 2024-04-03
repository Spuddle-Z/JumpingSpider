#### Problem 1
- Player 1's best response is:
	- Player 2 choose L, then player 1 choose U;
	- Player 2 choose M, then player 1 choose M;
	- Player 2 choose R, then player 1 choose D;
- Player 2's best response is:
	- Player 2 choose U, then player 1 choose M;
	- Player 2 choose M, then player 1 choose L;
	- Player 2 choose D, then player 1 choose R;

So we can find that there is a unique pure-epuilibrium which is (D, R).

- If player 1 put the same positive weight on both U and M, choosing R will be the best response for player 2. Then player 1 will change his strategy to D. 
- If player 1 put different positive weight on U and M, player 2 will always choose the strategy which is bad for player 1.

So player 1 won't put positive weight on both U and M.

#### Problem 2
Let $g(x)=\inf_{y\in Y}f(x,y)$ and $h(y)=\sup_{x\in X}f(x,y)$. We can know that $\forall x\in X,y\in Y,g(x)\leq f(x,y)$ and $\forall x\in X,y\in Y,f(x,y)\leq h(y)$. 

We have $\sup_{x\in X}g(x)\leq f(x,y)$ and $f(x,y)\leq\inf_{y\in Y}h(y)$, i.e. $\sup_{x \in X} \inf_{y \in Y} f(x, y) \leq \inf_{y \in Y} \sup_{x \in X} f(x, y)$.
#### Problem 3
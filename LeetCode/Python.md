---
tags:
  - Tutorial
  - Code
---
## 基础Python
### 字符串
#### split函数
- 语法：
	```python
	str.split(str="",
			  num=string.count(str))
	```
- 参数：
	- `str`：分隔符。默认为空格，但*不能为空*。
	- `num`：分割次数。如果此参数存在，则只分隔成`num+1`个子字符串。

#### filter函数
- 语法：
	```python
	filter(function, iterable)
	```
- 描述：将可迭代对象`iterable`中的元素依次输入判断函数`function`中，将所有返回值为`False`的元素去掉。
- 返回值：一个迭代器对象。

## 高级Python
```python  
if __name__ == "__main__":
	# --- CODE ---
```
此代码表示如果这段代码所在文件是被直接运行的，则运行下面的代码；如果所在文件是被调用运行的，则忽略下面的代码。
## Python常用包
### Fire
可以将命令行中输入的参数直接传递给暴露的特定函数。
### wandb
用于深度学习中的可视化。
### dill
是扩展的pickle库。
### PySpark
#### `toDF()`函数
- 语法：
	```python
	df = rdd.toDF()
	```
- 描述：将一个RDD对象`rdd`转化成DataFrame对象`df`。
### Scipy
#### `linprog()`函数
- 使用：对于一个标准的线性规划
	$$
	\begin{aligned}
	\min_{x}&\ c^Tx\\
	s.t.\quad A_1x&\leq b_1\\
	A_2x&=b_2\\
	x&\geq0
	\end{aligned}
	$$
	可以用如下函数来求解
	```python
	from scipy.optimize import linprog
	bounds = np.array([[0,None] for _ in range(len(c))]))
	x = linprog(c      = c,
				A_ub   = A_1,
				b_ub   = b_1,
				A_eq   = A_2,
				b_eq   = b_2,
				bounds = bounds,
				method = 'highs')
	```
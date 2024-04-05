---
tags:
  - Tutorial
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
## PySpark
#### `toDF()`函数
- 语法：
	```python
	df = rdd.toDF()
	```
- 描述：将一个RDD对象`rdd`转化成DataFrame对象`df`。
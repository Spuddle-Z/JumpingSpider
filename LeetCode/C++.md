---
tags:
  - Knowledge
  - Code
---
## 基础语法
### Lambda
> [!example] 加法
> ```cpp
> auto plus = [] (int v1, int v2) -> int { return v1 + v2; }
> ```
## C++标准库
### 基本概念
> [!definition] 标准模板库 (Standard Template Library, STL)
> 是一套功能强大的 C++ 模板类和函数的集合，包括容器(Containers)、迭代器(Iterators)、算法(Algorithms)、函数对象(Function Objects)和适配器(Adapters)等。
### 容器
#### Vector
```cpp
#include <vector>
```
- `v.size()`：返回向量长度。
- `v.erase(p)`：删除迭代器`p`所指向的元素。
	> [!caution] 
	> `p`是迭代器类型，可以用`v.begin()`得到。
- `sort(v.begin(), v.end(), cmp)` ：将向量[`v.begin()`, `v.end()`)范围内的元素按函数`cmp`排序。
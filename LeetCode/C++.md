---
tags:
  - Code
  - Tutorial
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
### 常用
#### 常用函数库
```cpp
#include <stdlib.h>
```
- `rand()`：返回一个随机整数，使用`rand() % n`生成0到n-1之间的随机整数。
#### Algorithm
```cpp
#include <algorithm>
```
- `min(a,b)` `max(a,b)`：求`a` `b`中的较小/较大值。

### 容器
#### String
```cpp
#include <string>
```
- `s.begin()` `s.end()`：返回指向字符串开头/末尾的两个迭代器。
	> [!note] 迭代器与指针的区别
	> 一般情况下，可以将迭代器理解成指针，都可以使用解引用操作。
- `s.back()`：返回字符串最后一个字符。
- `s.size()`：返回字符串长度。
- `s.push_back(c)`：在末尾加入字符`a`。
- `s.pop_back()`：敲掉末尾的字符。
- `reverse(p, q)`：反转`p`到`q`字符串（`p` `q`都是迭代器）。
#### Vector
```cpp
#include <vector>
```
- `v.resize(n)`：将`v`的长度初始化为`n`。
- `v.begin()` `v.end()`：返回指向向量开头/末尾的两个迭代器。
- `v.size()`：返回向量长度。
- `v.push_back(a)`：在末尾加入`a`。
- `v.pop_back()`：敲掉末尾的元素。
- `v.erase(p)`：删除迭代器`p`所指向的元素（`p`是迭代器）。
- `sort(v.begin(), v.end())` ：将向量[`v.begin()`, `v.end()`)范围内的元素由小到大排序，无返回值；如果想由大到小排序，需要使用`v.rbegin()`与`v.rend()`。

#### Queue
```cpp
#include <queue>
```
- `q.push(a)`：将`a`入队。
- `q.pop()`：将队首的元素出队，*并不返回任何值*。
- `q.front()`：返回队首的元素。
- `q.empty()`：队列若为空则返回`true`。
#### 哈希表
```cpp
#include <unordered_map>
```
- `hash[key]`：返回`key`所对应的值。
- `hash.count(key)`：返回`key`所对应值的数量。
- `hash.insert({key, value})`：插入键值对。
- `hash.erase(key)`：删除`key`所对应的键值对，并返回删除键值对的数量。
## 常用操作
### 基本
```cpp
#include <iostream>
using namespace std;

int main() {
	return 0;
}
```
### 输入数据
```cpp
string s;
cin >> s;
```
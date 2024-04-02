---
tags:
  - Knowledge
aliases:
  - 局部敏感哈希
  - Locality Sensitive Hashing
---
## 概述
**局部敏感哈希(Locality Sensitive Hashing, LSH)**：是一种近似搜索算法。对于一个拥有海量数据的数据集，通过一一比对来进行搜索是不现实的。近似搜索即只搜索与目标比较接近的一部分数据，大大降低了搜索量。
## 具体过程
### 概述
如下图，LSH算法主要分为三个步骤：*Shingling*、*MinHashing*与*Banding*。
![[Pasted image 20240329151102.png|500]]
### Shingling
- **Shingling**：将文件转化成token串的集合，$k$-shingle则为长度为$k$的token串（如令$k=2$，文件$D=abcab$的$2$-shingles为$S(D)=\{ab,bc,ca\}$）。

有了shingle集，我们就可以根据它创建一个one-hot编码。
![[Pasted image 20240329151418.png|500]]
### MinHashing
- **最小哈希(MinHashing)**：将上一步得到的稀疏的one-hot向量转换为稠密的**签名(Signature)**。

假设我们现在要将一个*6维的one-hot*转化为一个*4维签名*，则其步骤如下：
![[minHash 1.gif|500]]
1. 生成4个长度为6的递增序列，并随机打乱，作为MinHash函数；
2. 从1开始依次检查one-hot对应位置；
3. 若对应位置为0，则继续检查下一个数字；
4. 若为1，则返回当前的数字作为此MinHash函数的输出。

![[Pasted image 20240329153939.png|500]]
可以证明信息的相似性在MinHash操作的前后得到了保留。
### Banding
有了签名之后，我们有两种思路去比较两个签名的相似度。
![[Pasted image 20240401204920.png|375]]
- 一种是AND的思路，即只有两个签名的每一位都相等，二者的哈希才会相同，如图中*蓝线*；
- 另一种是OR的思路，即只要两个签名中的某一位相等，我们便认为二者相等，如图中*绿线*。

但我们希望的是如图中*红线*一样，在相似到某个程度之后，才被分到一个**哈希桶(Hash Bucket)**中，此时便需要结合两种思路的特点。

- **Banding**：将整个的签名拆分成子向量，在子向量中使用AND思路，在子向量间使用OR思路，即两个签名中只要有一个子向量相等，便将这两个签名记为一个候选对。![[Pasted image 20240329160309.png|600]]

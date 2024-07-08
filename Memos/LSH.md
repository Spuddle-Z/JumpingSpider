---
tags:
  - Knowledge
  - Code
aliases:
  - 局部敏感哈希
  - Locality Sensitive Hashing
---
## 定义
> [!definition] 局部敏感哈希 (Locality Sensitive Hashing, LSH)
> LSH是一种近似搜索算法。对于一个拥有海量数据的数据集，通过一一比对来进行搜索是不现实的。近似搜索即只搜索与目标比较接近的一部分数据，大大降低了搜索量。
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
## 代码示例
```python
import pandas as pd
import numpy as np
from tqdm import tqdm

# Load data
'''
此处的数据是200个文件，每个文件都已经被转化成了一个长度为1e6的one-hot向量
'''
df = pd.read_csv("/kaggle/input/docs-for-lsh/docs_for_lsh.csv")
data = df.iloc[:, 1:].to_numpy()

# Set parameters
v = 1000000    # Length of one-hot
f = 200        # Numbers of file
n = 100        # Length of signature
b = 20         # Numbers of bands
r = n // b     # Rows per band

# 创建n个哈希函数，n为签名的长度
np.random.seed(n)
hashes = np.array([np.random.permutation(v) for _ in tqdm(range(n))])
print("Hashes:", hashes.shape)

# 根据创建出的哈希函数与one-hot向量算出签名
def minHash(hashes, one_hot):
    signature = np.full(hashes.shape[0], np.inf)
    for i, flag in enumerate(one_hot):
        if flag:
            signature = np.minimum(signature, hashes[:, i])
    return signature.tolist()

signs = np.array([minHash(hashes, data[:,col]) for col in tqdm(range(200))])
print("Signs:", signs.shape)

import hashlib

# 创建哈希桶
buckets = {}
for file in tqdm(range(n)):
    for band in range(b):
        hashObj = hashlib.md5()
        begin = file * r
        tmp = str(signs[file][begin:begin+r])
        hashObj.update(tmp.encode())
        tag = hashObj.hexdigest()
        if tag not in buckets:
            buckets[tag] = [file]
        elif file not in buckets[tag]:
            buckets[tag].append(file)

# 找到与0号文件在同一个桶中的文件，只计算这些文件与0号文件的相似性
similar_docs = {}
for bucket in buckets.values():
    if 0 in bucket:
        for doc_id in bucket:
            if doc_id != 0 and doc_id not in similar_docs:
                similarity = jaccard_score(data[0], data[doc_id])
                similar_docs[doc_id] = similarity

# 按照相似度排序，并输出前30位
sorted_similar_docs = sorted(similar_docs.items(), key=lambda x: x[1], reverse=True)

top_30 = sorted_similar_docs[:30]

for doc_id, similarity in top_30:
    print(f"Document ID: {doc_id}  \tSimilarity: {similarity}")
```
---
tags:
  - Knowledge
aliases:
  - Bidirectional Encoder Representations from Transformers
---
## 模型结构
**BERT(Bidirectional Encoder Representations from Transformers)**：是一种基于Transformer encoder的预训练模型，其结构如下图所示：
![[BERT.png|200]]

BERT的输入是三部分相加而得：
![[BERT_input.png|625]]
- **Token Embedding**：求每个输入token的词向量；
- **Segment Embedding**：同一个句子内的token，其segment embedding一样；
- **Position Embedding**：不同于transformer的正余弦位置编码，BERT的position embedding是从0到511线性的，并且其为随机初始化，模型需要自己去学习。

图中的`[CLS]`和`[SEP]`是特殊的token。在做分类任务时，最终的步骤是要将`[CLS]`位置的输出向量输入分类器；`[SEP]`则用于分割两个句子。
## 预训练方法
由于BERT需要大量的数据进行预训练，因此较为经济的方法是使用无标签的数据进行无监督学习。BERT的预训练任务有两个，分别是**MLM(Masked Language Model)**和**NSP(Next Sentence Prediction)**。

MLM是在原输入的基础上，随机mask掉一些token，然后让模型通过上下文来预测这些token。具体来说，每个token有15%的概率被mask掉，然后这些被mask掉的token，有80%的概率被替换成`[Mask]`，有10%的概率被替换成一个随机的token，有10%的概率不变。

NSP是用来判断连贯性的。其正样本为语料库中连续的两个段落，负样本则为不连续的段落，然后通过前面提到的`[CLS]`来做连贯或不连贯的二分类任务。
## 微调技巧
- 将微调的层次进行更加细致的拆分；
	> [!example] 
	> 以微博文本的情感分析为例：
	> 1. **Pretrain**：使用大量通用语料进行预训练（如中文谷歌BERT）；
	> 2. **Domain Transfer**：使用大量微博文本继续训练；
	> 3. **Task Transfer**：使用微博情感文本进行微调；
	> 4. **Fine-tuning**：更加具体的小任务。

- 每次epoch前，都随机mask一遍数据，而不是一直使用mask固定的数据；
- Learning rate设为1e-5量级，防止灾难性遗忘；
- Epoch数目为3-4，batch size为16-32。
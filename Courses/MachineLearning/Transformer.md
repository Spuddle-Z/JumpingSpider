---
tags:
  - Knowledge
---
## 编码器-解码器架构
> [!definition] 编码器-解码器架构 (Encoder-Decoder)
> 一个机器学习模型可以被抽象成一个编码器-解码器架构，如下图所示：
> ![[EncoderDecoder.png|450]]
> 编码器的作用是将输入编程为一个机器比较好学习的**中间状态(State)**，而解码器的作用则是将这个中间状态总结成输出。值得注意的是，解码器也可以接受输入。

类比到CNN当中，底部的卷积层即为编码器，顶部的全连接层即为解码器，中间状态则是卷积层提取到的特征。

## Seq2seq
> [!definition] Seq2seq
> 这是一种属于Encoder-Decoder架构的模型，其编码器与解码器均是RNN，其中由于解码器的输入是上一状态的输出，因此不能使用双向RNN。
> ![[seq2seq.png|600]]
> 如上图，seq2seq的编码器负责读取输入seq，将其中的信息保存在最后时刻的隐状态中，并将其输出给解码器；其解码器负责将上一状态的输出作为此状态的输入，按序生成结果序列。

此结构允许输入输出的序列长度不相等。
> [!caution] 
> 训练时解码器的输入使用目标序列（即下图红框处），而非其真正生成的结果作为下一个输入，这样可以避免预测长序列时由于时序上深度的增加产生的巨大偏差。
> ![[seq2seqTrain.png|500]]

## 束搜索
贪心搜索用时较少，但其准确度不能保证，可以构造如下例子证明：
![[greedy.png|575]]

此时引入束搜索来解决这个问题
> [!definition] 束搜索 (Beam Search)
> 第一步在$n$个概率中选出前$k$大的概率，然后在之后每一步的$kn$个概率中同样选出前$k$大的概率。下图为$k=2,n=5$时的前几步：![[beamSearch.png|575]]

^b477c5

此算法的时间复杂度为$O(knT)$，最终每个序列的分数为
$$\frac{1}{L^\alpha}\log p(y_1,y_2,...,y_L)$$
其中$\frac{1}{L^\alpha}$（$\alpha$一般取0.75）是用来平衡序列长度对最后分数的影响的，防止更短的序列得分偏高。

## 注意力机制
### 背景
> [!definition] 随意线索与不随意线索 (Volitional Cue & Nonvolitional Cue)
> 从心理学角度来说，人类的注意点是根据不随意线索和随意线索来选择的（这里“随意”的意思是顺遂自己的意图，而非“随便”）。所谓不随意线索是一个环境中最引人注目，但未必是我想要关注的特征；而随意线索则相反，是我想要去关注的特征，但不一定是最显眼的。

卷积、全连接、池化等都只考虑不随意线索，此时我们引入注意力机制来考虑随意线索。

### 注意力机制
> [!definition] 注意力机制 (Attention)
> ![[attention.png|500]]
> Query是我们想要去注意的随意线索，key是数据中初步提取的不随意线索，value则是key所对应的值。现在我们已知query、key与key所对应的value，想要知道query所对应的value是多少。此时我们可以对各个key施以适当的权重，然后用对应的value加权求和即可，这些权重则通过注意力分数求得。
> > [!definition] 注意力分数 (Attention Score)
> > 代表了key与query的相关度，相关度越高，注意力分数越高；将注意力分数进行softmax归一化后，即得到注意力权重。

常用于计算注意力分数的函数一般有两种：
- Additive attention的注意力分数为$$a(k,q)=v^T\tanh(W_kk+W_qq)$$其等价于将key与query合并放到输入一个单隐藏层、输出大小为1的MLP中。
- Scaled dot-product attention的注意力分数为$$a(Q,K)=\frac{QK^T}{\sqrt{d}}$$其中$Q\in\mathbb{R}^{n\times d},K\in\mathbb{R}^{m\times d},a(Q,K)\in\mathbb{R}^{n\times m}$，此处$Q,K$宽度必须相等，$\frac{1}{\sqrt{d}}$是为了消除宽度对梯度的影响。

当然，可以在计算注意力分数时引入一些可训练的参数，使计算注意力的层可以学习。

### 多头自注意力
> [!definition] 自注意力 (Self-attention)
> 当key,value,query均相同时，称为自注意力。将输入的序列分别与三个矩阵做乘法，得到key,value,query，得到的输出序列中的每个元素便都包含了其它元素的信息。

相较于CNN，自注意力可以在一层内整合所有数据的信息，解决了长序列的长期依赖问题；相较于RNN，自注意力则允许更高的并行度。

对希望抽取同一组key,value,query中不同的信息，如短距离与长距离关系，此时引入多头注意力。
> [!definition] 多头注意力 (Multi-head Attention)
> 多头注意力中的每个**头(Head)**使用独立的注意力池化，允许其抽取相同数据的不同特征，最终拼接各个头得到最终的输出，可以类比于*CNN中的通道*。
> ![[multi-head.png|450]]

当解码器对序列中的一个元素输出时，不应该考虑此元素之后的元素。此时可通过掩码来遮盖后方的信息，即当计算输出$x_i$时，假装当前序列长度为$i$。因此在解码器的结构中，会使用**带掩码的多头注意力(Masked Multi-head Attention)**。

## 层归一化
批量归一化需要对一个批次内不同样本同一位置的数据进行归一化，因此在处理长度不一致的序列时会出现两个问题。一是长序列靠后位置所对应的短序列中的位置是没有信息的，此时若强行填补空白并进行归一化是没有意义的；二是序列在时序上通常是有关系的，若直接进行样本间的归一化则会抹杀这种关系。

此时引入层归一化：
> [!definition] 层归一化 (Layer Normalization)
> 将输入的序列归一化，保留序列在时序上的关系，但也忽略了样本间的关系。

## 位置编码
与CNN及RNN不同，注意力机制本身的结构中并没有考虑数据的位置信息。此时引入位置编码，将位置信息添加到输入里，而非体现在模型的结构中。

> [!definition] 位置编码 (Positional Encoding)
> 设原始输入为$X\in\mathbb{R}^{n\times d}$，则引入位置编码矩阵$P\in\mathbb{R}^{n\times d}$，其中元素遵循以下公式：
> $$
> \left\{\begin{aligned}
> p_{i,2j}&=\sin\left(\frac{i}{10000^{\frac{2j}{d}}}\right) \\
> p_{i,2j+1}&=\cos\left(\frac{i}{10000^{\frac{2j}{d}}}\right)
> \end{aligned}\right.
> $$
> 下图为$P$的热力图：
> ![[positionalEncoding.png|250]]
> $X+P$即为加入位置编码后的输入。

由于$i+\delta$处的位置编码可以由$i$处的位置编码线性变换而来，令$\omega_j=\frac{1}{10000^{\frac{2j}{d}}}$，那么
![[positionTransform.png|400]]
此处的变换矩阵与$i$无关，也即其可以记录原数据的相对位置。

## Transformer
> [!definition] Transformer
> Transformer同样使用Encoder-Decoder架构。与seq2seq不同，transformer以含有注意力机制的模块替代了RNN。Transformer的具体结构如下图所示：
> ![[transformer.png|425]]
> 其中embedding块用来将输入的数据转化为可以被输入网络中的向量形式；add \& norm块展开图如下，此处add代表加入了一个残差网络，norm则代表层归一化。
> > [!definition] 基于位置的前馈神经网络 (Position-wise Feed Forward Network, Position-wise FFN)
> > 相当于两层核大小为1的一维卷积层，进行进一步的处理。
> > ![[add&norm.png|150]]

编码器与解码器之间的信息传递并没有其它的层，编码器的输出将作为解码器中每一个transformer块中多头注意力的key和value，其query则来自于目标序列，这就意味着编码器与解码器的输出维度是一样的。
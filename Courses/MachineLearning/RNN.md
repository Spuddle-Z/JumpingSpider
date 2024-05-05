---
tags:
  - Knowledge
aliases:
  - Recurrent Neural Network
  - 循环神经网络
---
## 背景
时序数据的特点是之后的数据不独立于之前的数据，知道$x_{t-1}$的值才能预测出$x_t$的值，即
$$p(\mathbf{x})=p(x_1)\cdot p(x_2|x_1)\cdot p(x_3|x_1,x_2)\cdot...\cdot p(x_T|x_1,...,x_{T-1})$$
> [!definition] 自回归 (Autoregression, AR)
> 给定前$n$个数据，去预测第$n+1$个数据。

对于自回归问题的建模有两种方案：
1. 马尔可夫假设：当前数据只与$\tau$个过去的数据点相关，即
	$$p(x_t|x_1,...,x_{t-1})=p(x_t|x_{t-\tau},...,x_{t-1})$$
1. 潜变量模型：引入潜变量$h_t=f(x_1,...,x_{t-1})=g(x_{t-1},h_{t-1})$来表示过去的信息，即
	$$p(x_t|x_1,...,x_{t-1})=p(x_t|h_t)$$
## 基础RNN
> [!definition] 循环神经网络 (Recurrent Neural Networks, RNN)
> RNN基本结构如下图所示，每个箭头都代表一个MLP：
> ![[Pasted image 20240504200135.png|450]]
> $$
> \left\{\begin{aligned}
> s_t&=f(Ux_t+Ws_{t-1})\\
> o_t&=g(Vs_t)
> \end{aligned}\right.
> $$
> 其中$s$为隐藏状态，$f,g$为元素级的非线性函数，$U,V,W$为MLP参数。

RNN的不同结构与其实际应用：
![[RNNApplication.png|600]]
## LSTM
一个序列中并非每个状态都十分重要，因此单纯参考前面的所有状态或只参考之前$\tau$个状态的做法并不好，需要引入关注和遗忘的机制来突出序列中的关键信息。
> [!definition] 长短期记忆网络 (Long Short Term Memory, LSTM)
> - $X$是输入；
> - $h$是隐藏状态；
> - $C$是记忆细胞，用来存储一些需要长期保留的记忆；
> - 符号“$\odot$”表示按位乘法。
> $$
> \left\{\begin{aligned}
> F_t&=\sigma(X_tW_{xf}+H_{t-1}W_{hf}+b_f) \\
> I_t&=\sigma(X_tW_{xi}+H_{t-1}W_{hi}+b_i) \\
> \tilde{C}_t&=\tanh(X_tW_{xc}+H_{t-1}W_{hc}+b_c) \\
> O_t&=\sigma(X_tW_{xo}+H_{t-1}W_{ho}+b_o) \\
> C_t&=F_t\odot C_{t-1}+I_t\odot\tilde{C}_t \\
> H_t&=O_t\odot\tanh(C_t)
> \end{aligned}\right.
> $$
> ![[LSTM.png|350]]
> - $F$门为**遗忘门(Forget Gate)**，用来清洗掉一些已经没用的信息；
> - $I$门为**输入门(Input Gate)**，用来控制将$C_{t-1}$更新成$\tilde{C}_t$的程度；
> - $\tilde{C}$门的输出为**候选记忆(Candidate Memory)**，学习了$h_{t-1}$与$X_t$的数据；
> - $O$门为**输出门(Output Gate)**，学习$h_{t-1}$与$X_t$后，从记忆细胞中选择出合适的部分输出成$h_t$。
## GRU
GRU可以看作一个简化的LSTM。
> [!definition] 门控循环单元 (Gated Recurrent Unit, GRU)
> - $X$是输入；
> - $h$是隐藏状态；
> - 符号“$\odot$”表示按位乘法。
> $$
> \left\{\begin{aligned}
> R_t&=\sigma(X_tW_{xr}+H_{t-1}W_{hr}+b_r) \\
> \tilde{H}_t&=\tanh(X_tW_{xh}+(R_t\odot H_{t-1})W_{hh}+b_h) \\
> Z_t&=\sigma(X_tW_{xz}+H_{t-1}W_{hz}+b_z) \\
> H_t&=Z_t\odot H_{t-1}+(1-Z_t)\odot\tilde{H}_t
> \end{aligned}\right.
> $$
> ![[GRU.png|350]]
> - $R$门为**重置门(Reset Gate)**，控制$\tilde{h}_t$遗忘$h_{t-1}$的程度；
> - $\tilde{H}$门的输出为**候选隐状态(Candidate Hidden State)**，其输入自$h_{t-1}$与$X_t$；
> - $Z$门为**更新门(Update Gate)**，控制输出$h_t$中$h_{t-1}$与$\tilde{h}_t$所占比例。
## 深度循环神经网络
> [!definition] 深度循环神经网络 (Deep RNN)
> 通过加深隐藏层的深度而非时序数据的长度来获得更多的非线性层，从而增加RNN的复杂度。
> ![[DeepRNN.png|350]]
## 双向循环神经网络
在一些时序数据中，时间轴靠后的数据也会影响靠前的数据，此时则需要引入一个逆向传播的隐藏层来实现之后状态对之前状态的影响。
> [!definition] 双向循环神经网络 (Bidirectional RNN, Bi-RNN)
> $$
> \left\{\begin{aligned}
> \overrightarrow{H}_t&=\phi(X_t\overrightarrow{W_{xh}}+\overrightarrow{H}_{t-1}\overrightarrow{W_{hh}}+\overrightarrow{b_h}) \\
> \overleftarrow{H}_t&=\phi(X_t\overleftarrow{W_{xh}}+\overleftarrow{H}_{t-1}\overleftarrow{W_{hh}}+\overleftarrow{b_h}) \\
> O_t&=\left[\overrightarrow{H}_t,\overleftarrow{H}_t\right]W_{hq}+b_q
> \end{aligned}\right.
> $$
> ![[BiRNN.png|350]]

Bi-RNN的输出与未来有关，因此其不适合去做单向的预测。
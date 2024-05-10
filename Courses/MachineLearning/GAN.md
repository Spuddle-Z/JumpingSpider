---
tags:
  - Knowledge
aliases:
  - 对抗生成网络
  - Generative Adversarial Network
---
## 转置卷积
> [!definition] 转置卷积 (Transpose Convolution)
> 操作与卷积相反，可以增大输入的高宽。
> 
> 对于步长为1的转置卷积，可以看作padding大于1的标准卷积，如图：
> ![[649f03a2004648fea724aca6cd2ee3e5.gif|244]]
> 对于步长大于1的转置卷积，可以看作在输入矩阵中增加了空洞，然后再进行标准卷积，如图：
> ![[48954dc5bef142379bbb85b7807e4861.gif|245]]

> [!note] 
> 实际操作中一般使用步长大于1，且其卷积核边长为偶数的转置卷积。若为奇数，则卷积核覆盖到的有效数字的数量会随着其位置的改变而改变。如图中两个状态时，卷积核覆盖的有效数字量就分别为2个和1个。
> ![[Pasted image 20240504215550.png|375]]
## Auto-Encoder
> [!definition] 自编码器 (Auto-Encoder, AE)
> 其分为两部分：
> - 编码器将图像$X$通过卷积压缩成一个向量$h$；
> - 解码器将向量$h$通过转置卷积还原成图像$X'$。
> 
> 我们的目标则是求
> $$\min_{\theta}||X-X'||^2$$
> 最终训练出一个能将向量还原成图像的解码器。

其实不一定要压缩成一个向量，用编码器某一层的特征图也可以训练解码器。下图即为使用不同层的输出训练解码器的效果：
![[Pasted image 20240504221611.png|600]]
## GAN
![[Pasted image 20240504222610.png|450]]
如图，我们希望建立一个向量$h\in\mathbb{R}^n$到图像$X$的一个双射，其中$h\sim N(0,\sigma^2I_n)$，$X$是真实图像而非噪音。

> [!definition] 对抗生成网络 (Generative Adversarial Network, GAN)
> ![[Pasted image 20240510145245.png|500]]
> 我们将训练一个生成器$G$，尽量使得$G(h)=X$；同时训练一个判别器$D$，能够将真实的图像$X\in P_{data}(X)$判别为正样本，将生成的图像$X'\in P_{\theta}(X)$判别为负样本。
> 
> 令
> $$
> \begin{aligned}
> V(D,G)&=E_{P_{data}}[\log p_D(X)]+E_{h\sim p(h)}[\log(1-p_{D}(G(h)))]\\
> &=E_{P_{data}}[\log D(X)]+E_{h\sim p(h)}[\log(1-D(G(h)))]
> \end{aligned}
> $$
> 其中$p_{D}(X)$表示判断$X$为真实图像的概率，则上式代表判别器判断正确的概率，则GAN的目标函数为
> $$\min_{G}\max_{D}V(D,G)$$
> 即生成器尽量生成让判别器不能分辨真假的图像，而判别器则尽量提升自己的判别性能。

我们可以证明如果固定$G$，求解$\max_{D}V(D,G)$的本质就是令模型生成图像的分布$P_{\theta}(X)$更接近于真实图像的分布$P_{data}(X)$。
> [!proof] 
> 求$D^*$即应使
> $$
> \begin{aligned}
> &\frac{\partial V}{\partial D}=\frac{P_{data}(X)}{D(X)}-\frac{P_{\theta}(X)}{1-D(X)}=0\\
> \implies&D(X)=\frac{P_{data}(X)}{P_{\theta}(X)+P_{data}(X)}
> \end{aligned}
> $$
> 由上式可得
> $$P_{mix}=\frac{P_{data}+P_{\theta}}{2}=\frac{P_{\theta}(X)}{2(1-D(X))}=\frac{P_{data}(X)}{2D(X)}$$
> 再使用[[信息论#^u7htjl|JS散度]]求得两分布的距离
> $$
> \begin{aligned}
> &2JSD(P_{data}|P_{\theta})\\
> =&KL(P_{\theta}|P_{mix})+KL(P_{data}|P_{mix})\\
> =&-H(P_{\theta})-H(P_{data})-\sum_{X}[P_{\theta}\log P_{mix}+P_{data}\log P_{mix}]\\
> =&-H(P_{\theta})-H(P_{data})-\sum_{X}[P_{\theta}\log \frac{P_{\theta}}{2(1-D(X))}+P_{data}\log\frac{P_{data}}{2D(X)}]\\
> =&\sum_{X}[P_{\theta}\log{2(1-D(X))}+P_{data}\log{2D(X)}]\\
> =&\sum_{X}\log2[P_{\theta}+P_{data}]+\sum_{X}[P_{\theta}\log{(1-D(X))}+P_{data}\log{D(X)}]\\
> =&2\log2+V(D,G)
> \end{aligned}
> $$
> 上面过程中的$H$代表[[信息论#^6us1wf|熵]]。

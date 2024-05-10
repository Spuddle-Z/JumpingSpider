---
tags:
  - Knowledge
aliases:
  - Variational Auto-Encoders
  - 变分自编码器
---
## AE到VAE
> [!definition] 自编码器 (Auto-Encoder, AE)
> ![[Pasted image 20240507101356.png|400]]
> 其基本原理如图所示，将原图$X$通过编码器$\phi$压缩为一个相对低维的向量$h$，再通过解码器$\theta$重建图像$\hat{X}$。其目标函数为
> $$\min_{\phi,\theta}||X-\hat{X}||^2$$

然而自编码器十分容易过拟合，我们需要提取的是图像的一些基本特征，比如图中的人面部朝向、是否微笑等，自编码器则更多是去模仿原来的图像。假设编码器输出的是一个$d$维的向量$h$，且其符合$h_i\sim N(\mu_i,\sigma_i^2)$，为解决过拟合的问题，我们令编码器直接输出一个$2d$维的向量$[\mu_1,\mu_2,...,\mu_{d},\sigma_1,\sigma_2,...,\sigma_{d}]^T$。
> [!definition] 变分自编码器 (Variational Auto-Encoder, VAE)
> 其损失函数为
> $$L(\phi,\theta,X)=KL(q_{\phi}(h|X)|p_{\theta}(h|X))-E_{q_{\phi}(h|X)}(\log p_{\theta}(X|h))$$
## 损失函数意义
现在解释一下损失函数的意义。先展开损失函数的前一项
$$KL(q_{\phi}(h|X)|p_{\theta}(h|X))=\sum_{X}P_{data}(X)\sum_{h}q_{\phi}(h|X)\log\frac{q_{\phi}(h|X)}{p_{\theta}(h|X)}$$
我们知道编码器的概率为$q_{\phi}(h|X)$，解码器概率为$p_{\theta}(X|h)$。而式中计算的是$p_{\theta}(h|X)=\frac{P_{\theta}(X|h)P(h)}{\sum_{h'}P_{\theta}(X|h')P(h')}$，所以本质上$P_{\theta}(h|X)$和$P_{\theta}(X|h)$是一回事。但即便是$P_{\theta}(h|X)$也不好算出来，因此我们将其不严谨地近似成标准正态分布$N(0,I)$。经过这些处理之后再看前一项，其本质即*令编码器的输出$q_{\phi}(h|X)$尽量和正态分布相似*。

![[Pasted image 20240504222610.png|450]]
与GAN一样，我们希望如图建立一个向量$h\in\mathbb{R}^n$到图像$X$的一个双射，其中$X$是真实图像，而$h\sim N(0,\sigma^2I_n)$，这与上面所说的前一项的本质刚好吻合。

再来展开后一项
$$E_{q_{\phi}(h|X)}(\log p_{\theta}(X|h))=\sum_{X}P_{data}(X)q_{\phi}(h|X)\log p_{\theta}(X|h)$$
其中$P_{data}(X)q_{\phi}(h|X)$代表输入数据生成$h$向量的概率；由于$p_{\theta}(X|h)\sim N(\hat{X},\sigma^2)$，因此有
$$p_{\theta}(X|h)=\exp\left(\frac{||X-\hat{X}||^2}{2\sigma^2}\right)\implies\log p_{\theta}(X|h)\propto||X-\hat{X}||^2$$
即正比于MSE。因此*可以将后一项看作一个MSE*。

最后我们可以证明
$$L(\phi,\theta,X)=KL(P_{data}(X)q_{\phi}(h|X)|p_{\theta}(h,X))$$
> [!proof] 
> 根据[[信息论#^ejkg5c|KL散度的运算性质]]可知
> $$
> \begin{aligned}
> &KL(P_{data}(X)q_{\phi}(h|X)|P_{\theta}(h,X))\\
> =&KL(P_{data}(X)|P_{\theta}(X))+KL(q_{\phi}(h|X)|p_{\theta}(h|X))
> \end{aligned}
> $$
> 因此我们只需证明
> $$-E_{q_{\phi}(h|X)}(\log p_{\theta}(X|h))=KL(P_{data}(X)|P_{\theta}(X))$$
> 其实两项并不严格相等，但我们可以证明二者的梯度相等：
> ![[Pasted image 20240510112843.png]] #Missing 
> $$
> \begin{aligned}
> \frac{\partial }{\partial \theta}KL(P_{data}(X)|P_{\theta}(X))&=
> \end{aligned}
> $$

则原损失函数可以表示为
$$
L(\phi,\theta,X)=KL(P_{data}(X)q_{\phi}(h|X)|P_{\theta}(h,X))
$$
可以看到$P_{data}(X)q_{\phi}(h|X)$是编码器部分，$P(h)P_{\theta}(X|h)=P_{\theta}(h,X)$是解码器部分，整个损失函数也还是表示原图$X$与生成图$\hat{X}$的误差。

最后，VAE的训练与GAN一样，轮流固定编码器与解码器，同时训练未被固定的一方。
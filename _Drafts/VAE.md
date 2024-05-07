---
tags:
  - Knowledge
aliases:
  - Variational Auto-Encoders
  - 变分自编码器
---
> [!definition] 变分自编码器 (Variational Auto-Encoder, VAE)
> ![[Pasted image 20240507101356.png|400]]
> 其基本原理如图所示，将原图$X$通过编码器$\phi$压缩为一个相对低维的向量$h$，再通过解码器$\theta$重建图像$\hat{X}$，其损失函数为
> $$L(\phi,\theta,X)=KL(q_{\phi}(h|X)|p_{\theta}(h|X))-E_{q_{\phi}(h|X)}(\log p_{\theta}(X|h))$$
> 其中$q_{\phi}(h|X)$为编码器，$p_{\theta}(X|h)$为解码器。但$p_{\theta}(h|X)$不好算出来，因此将近似成$N(0,I)$。

我们将其损失函数展开，其中
$$E_{q_{\phi}(h|X)}(\log p_{\theta}(X|h))=\sum_{X}P_{data}(X)q_{\phi}(h|X)\log P_{\theta}(X|h)$$
可以证明
$$-E_{q_{\phi}(h|X)}(\log p_{\theta}(X|h))=KL(P_{data}(X)|P_{\theta}(X))$$
> [!proof] 
> 这两项并不严格相等，我们来证明二者的梯度相等：
> $$
> \begin{aligned}
> \frac{\partial }{\partial \theta}KL(P_{data}(X)|P_{\theta}(X))&=
> \end{aligned}
> $$


则原损失函数可以表示为
$$
\begin{aligned}
L(\phi,\theta,X)&=KL(P_{data}(X)|P_{\theta}(X))+KL(q_{\phi}(h|X)|p_{\theta}(h|X))\\
&=KL(P_{data}(X)q_{\phi}(h|X)|P_{\theta}(h,X))
\end{aligned}
$$

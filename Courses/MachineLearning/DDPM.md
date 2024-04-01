---
tags:
  - Knowledge
aliases:
  - Denoising Diffusion Probabilistic Model
---
# 基本概念
**DDPM (Denoising Diffusion Probabilistic Model)**是一种扩散模型。对于一个有噪声的图像，DDPM的任务是通过多次迭代，如下图所示，还原出原始图像，此过程称为**逆向扩散**。
![[DDPM.png|575]]

每个去噪块的结构如下图所示：
![[denoise.png|575]]

其中噪声预测器通过*图像*、*文本*、*步骤*等信息预测出噪声，然后从当前图像中减去噪声，得到下一步的图像。步骤越小，图像越接近清晰图像，其去噪也需要更加谨慎，因此**步骤数**也会作为一个输入。

训练时先随机生成噪声，然后将其加在图像上，重复此过程，直到图像完全被噪声覆盖，这个过程被称为**前向扩散**。然后将每步加入噪声后的图像以及文本与步骤作为输入，加入的噪声作为标签，训练噪声预测器。

![[DDPM_train.png|625]]
# 数学推导
## 引入比喻
我们可以将随机噪声比作砖瓦，将样本数据比作高楼，生成模型即用砖瓦去建造大厦；前向扩散是一个拆除大厦的过程，而逆向扩散则就是建造大厦的过程。
## 拆分图像
有了比喻，我们就可以设$x_0$为大厦，$x_T$为经过$T$步拆除之后得到的砖瓦。那么拆除大厦的每一个步骤即可由下面这个式子来表示：
$$x_t=\alpha_tx_{t-1}+\beta_t\varepsilon_t \tag{1}$$
全式表示第$t$步的楼体是在第$t-1$步的楼体的基础上，加入一个随机噪声$\varepsilon_t$的破坏得到的。其中$\alpha_t$与$\beta_t$是一个权重，$\alpha_t^2+\beta_t^2=1$且$\alpha_t,\beta_t>0$（通常情况下，$\beta_t$接近于0）。

在此基础上，将公式(1)完全展开，得到
$$x_t=(\alpha_t\cdots\alpha_1)x_0+(\alpha_t\cdots\alpha_2\beta_1)\varepsilon_1+(\alpha_t\cdots\alpha_3\beta_2)\varepsilon_2+\cdots+(\alpha_t\beta_{t-1})\varepsilon_{t-1}+\beta_t\varepsilon_t$$
利用正态分布的叠加性，可以得出上式中所有$\varepsilon$项的加和，是一个期望为0，方差为$(\alpha_t\cdots\alpha_2\beta_1)^2+(\alpha_t\cdots\alpha_3\beta_2)^2+\cdots+(\alpha_t\beta_{t-1})^2+\beta_t^2$的正态分布；且由于$\alpha_t^2+\beta_t^2=1$，因此
$$(\alpha_t\cdots\alpha_1)^2+(\alpha_t\cdots\alpha_2\beta_1)^2+(\alpha_t\cdots\alpha_3\beta_2)^2+\cdots+(\alpha_t\beta_{t-1})^2+\beta_t^2=1$$
由此，可设
$$
\left\{\begin{aligned}
	\bar\alpha_t &= \alpha_t\cdots\alpha_1 \\
	\bar\beta_t &= \sqrt{1-(\alpha_t\cdots\alpha_1)^2}
\end{aligned}\right.
$$
则$x_t$可以表示为
$$x_t = \bar\alpha_tx_0 + \bar\beta_t\bar\varepsilon_t \tag{2}$$
当经过$T$步拆楼之后，有$\alpha_T\rightarrow0$，这意味着所剩的楼体几乎可以忽略了，大厦已经被拆成了砖瓦。
> [!warning] 注*：
> 上面过程中的$\alpha,\beta$与DDPM原论文中的定义并不相同。
## 重建图像
拆楼是一个$x_{t-1}\rightarrow x_t$的过程，盖楼自然就是拿这些数据学习一个$x_t\rightarrow x_{t-1}$的模型了。设该模型为$\mu(x_t)$，则模型的训练目标为最小化下式：
$$\|x_{t-1}-\mu(x_t)\|^2 \tag{3}$$
可以根据式(1)的变型$x_{t-1}=\frac{1}{\alpha_t}(x_t-\beta_t\varepsilon_t)$将$\mu(x_t)$设计成
$$\mu(x_t) = \frac{1}{\alpha_t}(x_t-\beta_t\epsilon_\theta(x_t,t)) \tag{4}$$
其中$\theta$是训练超参数。

结合式(1)(4)，可以将损失函数(3)改写为
$$\frac{\beta_t^2}{\alpha_t^2}\|\varepsilon_t-\epsilon_\theta(x_t,t)\|^2$$
最后将$x_t$用噪声替换，得到
$$\frac{\beta_t^2}{\alpha_t^2}\|\varepsilon_t-\epsilon_\theta(\bar\alpha_{t-1}x_0 + \bar\beta_{t-1}\bar\varepsilon_{t-1} + \beta_t\varepsilon_t, t)\|^2 \tag{5}$$
## 降低方差
理论上来说，以式(5)作为损失函数就能够完成DDPM的训练，但我们可以进一步减小式(5)的方差，来加速模型的收敛。可以看到式(5)中有四个需要采样的随机变量：
- 从训练样本中采样$x_0$
- 从正态分布中采样$\bar\varepsilon_{t-1}$与$\varepsilon_t$
- 从$(1, T)$中采样一个$t$

因为需要采样的随机变量越多，损失函数的方差越大，不过我们可以通过一个技巧将$\bar\varepsilon_{t-1}$与$\varepsilon_t$合并成单个正态分布的随机变量。可设：
$$
\left\{\begin{aligned}
	\bar\beta_t\varepsilon &= \alpha_t\bar\beta_t\bar\varepsilon_{t-1} + \beta_t\varepsilon_t \\
	\bar\beta_t\omega &= \beta_t\bar\varepsilon_{t-1} - \alpha_t\bar\beta_{t-1}\varepsilon_t
\end{aligned}\right.
$$
且易证$\varepsilon$与$\omega$为两个相互独立的正态随机变量。此时用$\varepsilon$与$\omega$表示$\bar\varepsilon_{t-1}$与$\varepsilon_t$，并代入式(5)中，省略去损失函数的权重，得到DDPM的最终损失函数：
$$\left\lVert\varepsilon - \frac{\bar\beta_t}{\beta_t}\epsilon_\theta(\bar\alpha_tx_0 + \bar\beta_t\varepsilon, t)\right\rVert^2$$
> [!warning] 注*：
> 此处的$\frac{\bar\beta_t}{\beta_t}\epsilon_\theta$即为原论文中的$\epsilon_\theta$。

  

\subsection{GPT (Generative Pre-Training)}

\subsubsection{模型结构}

\begin{formal}

    \textbf{GPT}是一种基于Transformer decoder的预训练模型，其结构如下图所示：

    \begin{center}

        \includegraphics[width=.9\textwidth]{figure/GPT.png}

    \end{center}

\end{formal}

\subsubsection{下游任务}

如上图右侧所示，GPT下游任务的实现并非通过微调，而是通过对输入内容格式的改变。其中，由于GPT是生成模型，GPT更适合于生成类的任务。
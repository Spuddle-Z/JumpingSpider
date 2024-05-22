---
tags:
  - Tutorial
  - Code
---
## 简介
虽然看似与LaTeX有关，但完全可以当作一个text snippet插件来使用。
## 用得到的设置
### Conceal
用来在文本上就直接将公式显示为数学符号，个人不喜欢，关了。
![[conceal.png|650]]

![[conceal.gif|600]]
### Tabout
打开后按`Tab`可以跳出括号之外，支持的括号类型有`)` `]` `}` `>` `|` `$` `$$`。
### Preview inline math
预览行内数学公式，如图：
![[inline_math_preview_2.png|600]]
### Auto-enlarge brackets
自适应括号大小，当括号内出现`\sum` `\int` `\frac`等大体积符号时，括号变大，如图：
![[auto-enlarge_brackets.gif|600]]
## Snippets
### Options
- `t` : Text mode，即只在数学模块外触发的snippets；
- `m` : Math mode，即只在数学模块内触发的snippets；
- `A` : Auto，自动触发，不需要按`Tab`即触发snippets；
- `r` : Regex，将对trigger进行正则表达式的分析；
- `c` : Code mode，即只在代码块中触发的snippets。

Insert **tabstops** for the cursor to jump to by writing "$0", "$1", etc. in the `replacement`.
### Environments

| Trigger | Replacement                                                                                                                                     | Options |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| ;wv     | \<span style="text-decoration-line: underline; text-decoration-style: wavy;">$0\</span>$1                                                       | tA      |
| ;m      | \$\$0$                                                                                                                                          | tA      |
| ;;m     | \$\$\$0$$                                                                                                                                       | tA      |
| ;c      | \`\$0\`\                                                                                                                                        | tA      |
| ;;c     | \`\`\`\$0\`\`\`\                                                                                                                                | tA      |
| ;ali    | \\begin{aligned}$0\\end{aligned}                                                                                                                | mA      |
| ;;ali   | \\left\\{\\begin{aligned}$0\\end{aligned}\\right.$1                                                                                             | mA      |
| ;mat    | \\left\\{\\begin{bmatrix}$0\\end{bmatrix}\\right.$1                                                                                             | mA      |
| ;;mat   | \\begin{bmatrix}<br>$0&$1&\\cdots&$2\\\\<br>$3&$4&\\cdots&$5\\\\<br>\\vdots&\\vdots&\\ddots&\\vdots\\<br>\\$6&$7&\\cdots&$8<br>\\end{bmatrix}$9 | mA      |



### Greek Letters
| Trigger | Replacement  | Preview       | Options |
| ------- | ------------ | ------------- | ------- |
| ;aa     | \\alpha      | $\alpha$      | mA      |
| ;AA     | A            | $A$           | mA      |
| ;bb     | \\beta       | $\beta$       | mA      |
| ;BB     | B            | $B$           | mA      |
| ;cc     | \\chi        | $\chi$        | mA      |
| ;CC     | X            | $X$           | mA      |
| ;dd     | \\delta      | $\delta$      | mA      |
| ;DD     | \\Delta      | $\Delta$      | mA      |
| ;ee     | \\varepsilon | $\varepsilon$ | mA      |
| ;;ee    | \\epsilon    | $\epsilon$    | mA      |
| ;EE     | E            | $E$           | mA      |
| ;ff     | \\varphi     | $\varphi$     | mA      |
| ;;ff    | \\phi        | $\phi$        | mA      |
| ;FF     | \\Phi        | $\Phi$        | mA      |
| ;gg     | \\gamma      | $\gamma$      | mA      |
| ;GG     | \\Gamma      | $\Gamma$      | mA      |
| ;hh     | \\eta        | $\eta$        | mA      |
| ;HH     | H            | $H$           | mA      |
| ;kk     | \\kappa      | $\kappa$      | mA      |
| ;KK     | K            | $K$           | mA      |
| ;ll     | \\lambda     | $\lambda$     | mA      |
| ;LL     | \\Lambda     | $\Lambda$     | mA      |
| ;mm     | \\mu         | $\mu$         | mA      |
| ;MM     | M            | $M$           | mA      |
| ;nn     | \\nu         | $\nu$         | mA      |
| ;NN     | N            | $N$           | mA      |
| ;oo     | \\omega      | $\omega$      | mA      |
| ;OO     | \\Omega      | $\Omega$      | mA      |
| ;pp     | \\pi         | $\pi$         | mA      |
| ;PP     | \\Pi         | $\Pi$         | mA      |
| ;qq     | \\theta      | $\theta$      | mA      |
| ;QQ     | \\Theta      | $\Theta$      | mA      |
| ;rr     | \\rho        | $\rho$        | mA      |
| ;RR     | P            | $P$           | mA      |
| ;ss     | \\sigma      | $\sigma$      | mA      |
| ;SS     | \\Sigma      | $\Sigma$      | mA      |
| ;tt     | \\tau        | $\tau$        | mA      |
| ;TT     | T            | $T$           | mA      |
| ;uu     | \\upsilon    | $\upsilon$    | mA      |
| ;UU     | \\Upsilon    | $\Upsilon$    | mA      |
| ;xx     | \\xi         | $\xi$         | mA      |
| ;XX     | \\Xi         | $\Xi$         | mA      |
| ;zz     | \\zeta       | $\zeta$       | mA      |
| ;ZZ     | \\Zeta       | $Z$           | mA      |
### Operations
| Trigger    | Replacement      | Options |
| ---------- | ---------------- | ------- |
| ;tx        | \\text{$0}       | mA      |
| ;up        | ^{$0}$1          | mA      |
| ;do        | _{$0}$1          | mA      |
| ;2         | \^2              | mA      |
| ;3         | \^3              | mA      |
| ;4         | \^4              | mA      |
| ;un        | \^n              | mA      |
| ;;ui       | ^{(i)}           | mA      |
| ;;uj       | ^{(j)}           | mA      |
| ;tr        | \^T              | mA      |
| ;iv        | ^{-1}            | mA      |
| ;d0        | _0               | mA      |
| ;d1        | _1               | mA      |
| ;d2        | _2               | mA      |
| ;d3        | _3               | mA      |
| ;dn        | _n               | mA      |
| ;di        | _i               | mA      |
| ;dj        | _j               | mA      |
| ;dk        | _k               | mA      |
| ;dl        | _l               | mA      |
| ;dt        | _t               | mA      |
| ;dx        | _x               | mA      |
| ;dy        | _y               | mA      |
| ;dz        | _z               | mA      |
| ;sq        | \\sqrt{$0}$1     | mA      |
| ;ad        | +                | mA      |
| ;;ad       | +1               | mA      |
| ;/         | \\frac{$0}{$1}$2 | mA      |
| ;;/        | \\frac{1}{$0}$1  | mA      |
| ;ba        | \\bar{$0}$1      | mA      |
| ;ha        | \\hat{$0}$1      | mA      |
| ;tl        | \\tilde{$0}$1    | mA      |
| ;\<space>  | \\quad           | mA      |
| ;;\<space> | \\qquad          | mA      |
| ;an        | &                | mA      |
| ;;an       | &=               | mA      |
### Symbols
| Trigger | Replacement                                         | Preview                               | Options |
| ------- | --------------------------------------------------- | ------------------------------------- | ------- |
| ;sm     | \\sum                                               | $\sum$                                | mA      |
| ;;sm    | \\sum_{${0:i=1}}^{\${1:n}}$2                        | $$\sum_{i=1}^{n}$$                    | mA      |
| ;prod   | \\prod_{${0:i=1}}^{\${1:n}}$2                       | $$\prod_{i=1}^{n}$$                   | mA      |
| ;int    | \\int_{${0:-\\infty}}^{\${1:+\\infty}}$2\\ d\${2:x} | $$\int_{-\infty}^{+\infty}\ dx$$      | mA      |
| ;pa     | \\partial                                           | $\partial$                            | mA      |
| ;pd     | \\frac{\\partial $0}{\\partial ${1:x}}$2            | $$\frac{\partial}{\partial x}$$       | mA      |
| ;lim    | \\lim_{\${0:x}\to${1:\\infty}}$2                    | $$\lim_{x\to\infty}$$                 | mA      |
| ;inf    | \\infty                                             | $\infty$                              | mA      |
| ;all    | \\forall                                            | $\forall$                             | mA      |
| ;exi    | \\exists                                            | $\exists$                             | mA      |
| ;to     | \to                                                 | $\to$                                 | mA      |
| ;nto    | \nrightarrow                                        | $\nrightarrow$                        | mA      |
| ;<->    | \\leftrightarrow                                    | $\leftrightarrow$                     | mA      |
| ;so     | \implies                                            | $\implies$                            | mA      |
| ;eq     | \\Longleftrightarrow                                | $\Longleftrightarrow$                 | mA      |
| ;sim    | \sim                                                | $\sim$                                | mA      |
| ;peq    | \approx                                             | $\approx$                             | mA      |
| ;<=     | \\leq                                               | $\leq$                                | mA      |
| ;>=     | \\geq                                               | $\geq$                                | mA      |
| ;v<=    | \\preceq                                            | $\preceq$                             | mA      |
| ;v>=    | \\succeq                                            | $\succeq$                             | mA      |
| ;nin    | \\notin                                             | $\notin$                              | mA      |
| ;inq    | \subseteq                                           | $\subseteq$                           | mA      |
| ;innq   | \subsetneqq                                         | $\subsetneqq$                         | mA      |
| ;emp    | \\varnothing                                        | $\varnothing$                         | mA      |
| ;mL     | \\mathcal{L}                                        | $\mathcal{L}$                         | mA      |
| ;mP     | \\mathcal{P}                                        | $\mathcal{P}$                         | mA      |
| ;mC     | \\mathbb{C}                                         | $\mathbb{C}$                          | mA      |
| ;mR     | \\mathbb{R}                                         | $\mathbb{R}$                          | mA      |
| ;mZ     | \\mathbb{Z}                                         | $\mathbb{Z}$                          | mA      |
| ;mN     | \\mathbb{N}                                         | $\mathbb{N}$                          | mA      |
| ;;mN    | \\mathbb{N}_+                                       | $\mathbb{N}_+$                        | mA      |
| ;m1     | \\mathbb{1}                                         | $\mathbb{1}$                          | mA      |
| ;tm     | \\times                                             | $\times$                              | mA      |
| ;cd     | \\cdot                                              | $\cdot$                               | mA      |
| ;lg     | \\log                                               | $\log$                                | mA      |
| ;ln     | \\ln                                                | $\ln$                                 | mA      |
| ;mx     | \\max                                               | $\max$                                | mA      |
| ;mn     | \\min                                               | $\min$                                | mA      |
| ;amx    | \\mathop{\\arg\\!\\max}\\limits_{${0:\\theta}}\\ $1 | $\mathop{\arg\!\max}\limits_{\theta}$ | mA      |
| ;amn    | \\mathop{\\arg\\!\\min}\\limits_{${0:\\theta}}\\ $1 | $\mathop{\arg\!\min}\limits_{\theta}$ | mA      |
| ;st     | \\text{s.t.}\\quad                                  | $\text{s.t.}\quad$                    | mA      |
### Brackets

| Trigger | Replacement                       | Options |
| ------- | --------------------------------- | ------- |
| (       | ($0)$1                            | mA      |
| ;;(     | \\left($0\\right)$1               | mA      |
| [       | [$0]$1                            | mA      |
| ;;[     | \\left[$0\\right]$1               | mA      |
| {       | {$0}$1                            | mA      |
| ;{      | \\{$0\\}$1                        | mA      |
| ;;{     | \\left\\{$0\\right\\}$1           | mA      |
| ;;<     | \\left\\langle$0\\right\\rangle$1 | mA      |
| ;\|     | \\left\\lvert$0\\right\\rvert$1   | mA      |
| ;;\|    | \\left\\lVert$0\\right\\rVert$1   | mA      |
| ;u{     | \\underbrace{$0}\_{$1}$2          | mA      |
### Sequence
| Trigger          | Replacement                                     | Options |
| ---------------- | ----------------------------------------------- | ------- |
| ;seq([A-Za-z]+); | \[\[0]]\_1,\[\[0]]\_2,\\cdots,\[\[0]]\_{${0:n}} | rmA     |
### Callout

| Trigger | Replacement        | Options |
| ------- | ------------------ | ------- |
| ;df     | > [!definition] $0 | tA      |
| ;ex     | > [!example] $0    | tA      |
| ;nt     | > [!note] $0       | tA      |
| ;pf     | > [!proof] $0      | tA      |
| ;th     | > [!theorem] $0    | tA      |
| ;wn     | > [!caution] $0    | tA      |
## Code
```javascript
[
	// Environments
	{trigger: ";wv", replacement: "<span style=\"text-decoration-line: underline; text-decoration-style: wavy;\">$0</span>$1", options: "tA"},
	{trigger: ";m", replacement: "$$0$", options: "tA"},
	{trigger: ";;m", replacement: "$$$0$$", options: "tA"},
	{trigger: ";c", replacement: "`$0`", options: "tA"},
	{trigger: ";;c", replacement: "```$0```", options: "tA"},
	{trigger: ";ali", replacement: "\\begin{aligned}$0\\end{aligned}$1", options: "mA"},
	{trigger: ";;ali", replacement: "\\left\\{\\begin{aligned}$0\\end{aligned}\\right.$1", options: "mA"},
	{trigger: ";mat", replacement: "\\begin{bmatrix}$0\\end{bmatrix}$1", options: "mA"},
	{trigger: ";;mat", replacement: "\\begin{bmatrix}$0&$1&\\cdots&$2\\\\$3&$4&\\cdots&$5\\\\\\vdots&\\vdots&\\ddots&\\vdots\\\\$6&$7&\\cdots&$8\\end{bmatrix}$9", options: "mA"},

	// Greek letters
	{trigger: ";aa", replacement: "\\alpha", options: "mA"},
	{trigger: ";AA", replacement: "A", options: "mA"},
	{trigger: ";bb", replacement: "\\beta", options: "mA"},
	{trigger: ";BB", replacement: "B", options: "mA"},
	{trigger: ";cc", replacement: "\\chi", options: "mA"},
	{trigger: ";CC", replacement: "X", options: "mA"},
	{trigger: ";dd", replacement: "\\delta", options: "mA"},
	{trigger: ";DD", replacement: "\\Delta", options: "mA"},
	{trigger: ";ee", replacement: "\\varepsilon", options: "mA"},
	{trigger: ";;ee", replacement: "\\epsilon", options: "mA"},
	{trigger: ";EE", replacement: "E", options: "mA"},
	{trigger: ";ff", replacement: "\\varphi", options: "mA"},
	{trigger: ";;ff", replacement: "\\phi", options: "mA"},
	{trigger: ";FF", replacement: "\\Phi", options: "mA"},
	{trigger: ";gg", replacement: "\\gamma", options: "mA"},
	{trigger: ";GG", replacement: "\\Gamma", options: "mA"},
	{trigger: ";hh", replacement: "\\eta", options: "mA"},
	{trigger: ";HH", replacement: "H", options: "mA"},
	{trigger: ";kk", replacement: "\\kappa", options: "mA"},
	{trigger: ";KK", replacement: "K", options: "mA"},
	{trigger: ";ll", replacement: "\\lambda", options: "mA"},
	{trigger: ";LL", replacement: "\\Lambda", options: "mA"},
	{trigger: ";mm", replacement: "\\mu", options: "mA"},
	{trigger: ";MM", replacement: "M", options: "mA"},
	{trigger: ";nn", replacement: "\\nu", options: "mA"},
	{trigger: ";NN", replacement: "N", options: "mA"},
	{trigger: ";oo", replacement: "\\omega", options: "mA"},
	{trigger: ";OO", replacement: "\\Omega", options: "mA"},
	{trigger: ";pp", replacement: "\\pi", options: "mA"},
	{trigger: ";PP", replacement: "\\Pi", options: "mA"},
	{trigger: ";qq", replacement: "\\theta", options: "mA"},
	{trigger: ";QQ", replacement: "\\Theta", options: "mA"},
	{trigger: ";rr", replacement: "\\rho", options: "mA"},
	{trigger: ";RR", replacement: "P", options: "mA"},
	{trigger: ";ss", replacement: "\\sigma", options: "mA"},
	{trigger: ";SS", replacement: "\\Sigma", options: "mA"},
	{trigger: ";tt", replacement: "\\tau", options: "mA"},
	{trigger: ";TT", replacement: "T", options: "mA"},
	{trigger: ";uu", replacement: "\\upsilon", options: "mA"},
	{trigger: ";UU", replacement: "\\Upsilon", options: "mA"},
	{trigger: ";xx", replacement: "\\xi", options: "mA"},
	{trigger: ";XX", replacement: "\\Xi", options: "mA"},
	{trigger: ";zz", replacement: "\\zeta", options: "mA"},
	{trigger: ";ZZ", replacement: "Z", options: "mA"},

	// Operations
	{trigger: ";tx", replacement: "\\text{$0}", options: "mA"},
	{trigger: ";up", replacement: "^{$0}$1", options: "mA"},
	{trigger: ";do", replacement: "_{$0}$1", options: "mA"},
	{trigger: ";2", replacement: "^2", options: "mA"},
	{trigger: ";3", replacement: "^3", options: "mA"},
	{trigger: ";4", replacement: "^4", options: "mA"},
	{trigger: ";un", replacement: "^n", options: "mA"},
	{trigger: ";;ui", replacement: "^{(i)}", options: "mA"},
	{trigger: ";;uj", replacement: "^{(j)}", options: "mA"},
	{trigger: ";tr", replacement: "^T", options: "mA"},
	{trigger: ";iv", replacement: "^{-1}", options: "mA"},
	{trigger: ";d0", replacement: "_0", options: "mA"},
	{trigger: ";d1", replacement: "_1", options: "mA"},
	{trigger: ";d2", replacement: "_2", options: "mA"},
	{trigger: ";d3", replacement: "_3", options: "mA"},
	{trigger: ";dn", replacement: "_n", options: "mA"},
	{trigger: ";di", replacement: "_i", options: "mA"},
	{trigger: ";dj", replacement: "_j", options: "mA"},
	{trigger: ";dk", replacement: "_k", options: "mA"},
	{trigger: ";dl", replacement: "_l", options: "mA"},
	{trigger: ";dt", replacement: "_t", options: "mA"},
	{trigger: ";dx", replacement: "_x", options: "mA"},
	{trigger: ";dy", replacement: "_y", options: "mA"},
	{trigger: ";dz", replacement: "_z", options: "mA"},
	{trigger: ";sq", replacement: "\\sqrt{$0}$1", options: "mA"},
	{trigger: ";/", replacement: "\\frac{$0}{$1}$2", options: "mA"},
	{trigger: ";;/", replacement: "\\frac{1}{$0}$1", options: "mA"},
	{trigger: ";ad", replacement: "+", options: "mA"},
	{trigger: ";;ad", replacement: "+1", options: "mA"},
	{trigger: ";ba", replacement: "\\bar{$0}$1", options: "mA"},
	{trigger: ";ha", replacement: "\\hat{$0}$1", options: "mA"},
	{trigger: ";tl", replacement: "\\tilde{$0}$1", options: "mA"},
	{trigger: "; ", replacement: "\\quad", options: "mA"},
	{trigger: ";; ", replacement: "\\qquad", options: "mA"},
	{trigger: ";an", replacement: "&", options: "mA"},
	{trigger: ";;an", replacement: "&=", options: "mA"},
	
	// Math symbols
	{trigger: ";sm", replacement: "\\sum", options: "mA"},
	{trigger: ";;sm", replacement: "\\sum_{${0:i=1}}^{${1:n}}$2", options: "mA"},
	{trigger: ";prod", replacement: "\\prod_{${0:i=1}}^{${1:n}}$2", options: "mA"},
	{trigger: ";int", replacement: "\\int_{${0:-\\infty}}^{\${1:+\\infty}}$2\\ d\${2:x}", options: "mA"},
	{trigger: ";pa", replacement: "\\partial", options: "mA"},
	{trigger: ";pd", replacement: "\\frac{\\partial $0}{\\partial ${1:x}}$2", options: "mA"},
	{trigger: ";lim", replacement: "\\lim_{${0:x}\\to${1:\\infty}}$2", options: "mA"},
	{trigger: ";inf", replacement: "\\infty", options: "mA"},
	{trigger: ";all", replacement: "\\forall", options: "mA"},
	{trigger: ";exi", replacement: "\\exists", options: "mA"},
	{trigger: ";to", replacement: "\\to", options: "mA"},
	{trigger: ";nto", replacement: "\\nrightarrow", options: "mA"},
	{trigger: ";<->", replacement: "\\leftrightarrow", options: "mA"},
	{trigger: ";so", replacement: "\\implies", options: "mA"},
	{trigger: ";eq", replacement: "\\Longleftrightarrow", options: "mA"},
	{trigger: ";sim", replacement: "\\sim", options: "mA"},
	{trigger: ";peq", replacement: "\\approx", options: "mA"},
	{trigger: ";lq", replacement: "\\leq", options: "mA"},
	{trigger: ";gq", replacement: "\\geq", options: "mA"},
	{trigger: ";vlq", replacement: "\\preceq", options: "mA"},
	{trigger: ";vgq", replacement: "\\succeq", options: "mA"},
	{trigger: ";nin", replacement: "\\notin", options: "mA"},
	{trigger: ";inq", replacement: "\\subseteq", options: "mA"},
	{trigger: ";innq", replacement: "\\subsetneqq", options: "mA"},
	{trigger: ";emp", replacement: "\\varnothing", options: "mA"},
	{trigger: ";mL", replacement: "\\mathcal{L}", options: "mA"},
	{trigger: ";mP", replacement: "\\mathcal{P}", options: "mA"},
	{trigger: ";mC", replacement: "\\mathbb{C}", options: "mA"},
	{trigger: ";mR", replacement: "\\mathbb{R}", options: "mA"},
	{trigger: ";mZ", replacement: "\\mathbb{Z}", options: "mA"},
	{trigger: ";mN", replacement: "\\mathbb{N}", options: "mA"},
	{trigger: ";;mN", replacement: "\\mathbb{N}_+", options: "mA"},
	{trigger: ";m1", replacement: "\\mathbb{1}", options: "mA"},
	{trigger: ";tm", replacement: "\\times", options: "mA"},
	{trigger: ";cd", replacement: "\\cdot", options: "mA"},
	{trigger: ";lg", replacement: "\\log", options: "mA"},
	{trigger: ";ln", replacement: "\\ln", options: "mA"},
	{trigger: ";mx", replacement: "\\max", options: "mA"},
	{trigger: ";mn", replacement: "\\min", options: "mA"},
	{trigger: ";amx", replacement: "\\mathop{\\arg\\!\\max}\\limits_{${0:\\theta}}\\ $1", options: "mA"},
	{trigger: ";amn", replacement: "\\mathop{\\arg\\!\\min}\\limits_{${0:\\theta}}\\ $1", options: "mA"},
	{trigger: ";st", replacement: "\\text{s.t.}\\quad", options: "mA"},

	// Brackets
	{trigger: "(", replacement: "($0)$1", options: "mA"},
	{trigger: ";;(", replacement: "\\left($0\\right)$1", options: "mA"},
	{trigger: "[", replacement: "[$0]$1", options: "mA"},
	{trigger: ";;[", replacement: "\\left[$0\\right]$1", options: "mA"},
	{trigger: "{", replacement: "{$0}$1", options: "mA"},
	{trigger: ";{", replacement: "\\{$0\\}$1", options: "mA"},
	{trigger: ";;{", replacement: "\\left\\{$0\\right\\}$1", options: "mA"},
	{trigger: ";;<", replacement: "\\left\\langle$0\\right\\rangle$1", options: "mA"},
	{trigger: ";|", replacement: "\\left\\lvert$0\\right\\rvert$1", options: "mA"},
	{trigger: ";;|", replacement: "\\left\\lVert$0\\right\\rVert$1", options: "mA"},
	{trigger: ";u{", replacement: "\\underbrace{$0}_{$1}$2", options: "mA"},

	// Sequence
    {trigger: ";seq([A-Za-z]+);", replacement: "[[0]]_1,[[0]]_2,\\cdots,[[0]]_{${0:n}} ", options: "rmA"},

    // Callout
    {trigger: ";df", replacement: "> [!definition] $0", options: "tA"},
    {trigger: ";ex", replacement: "> [!example] $0", options: "tA"},
    {trigger: ";nt", replacement: "> [!note] $0", options: "tA"},
    {trigger: ";pf", replacement: "> [!proof] $0", options: "tA"},
    {trigger: ";th", replacement: "> [!theorem] $0", options: "tA"},
    {trigger: ";wn", replacement: "> [!caution] $0", options: "tA"},
]
```

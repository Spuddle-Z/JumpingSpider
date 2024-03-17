---
tags:
  - Tutorial
  - Obsidian
  - LaTeX
---
## 简介
虽然看似与LaTeX有关，但完全可以当作一个text snippet插件来使用。
## 用得到的设置
### Conceal
用来在文本上就直接将公式显示为数学符号，个人不喜欢，关了。
![conceal demo](https://raw.githubusercontent.com/artisticat1/obsidian-latex-suite/main/gifs/conceal.png)
![conceal demo 2](https://raw.githubusercontent.com/artisticat1/obsidian-latex-suite/main/gifs/conceal.gif)
### Tabout
打开后按`Tab`可以跳出括号之外，支持的括号类型有`)` `]` `}` `>` `|` `$` `$$`。
### Preview inline math
预览行内数学公式，如图：
<img width=650 src="https://raw.githubusercontent.com/artisticat1/obsidian-latex-suite/main/gifs/inline_math_preview_2.png">
### Auto-enlarge brackets
自适应括号大小，当括号内出现`\sum` `\int` `\frac`等大体积符号时，括号变大，如图：
![auto-enlarge brackets](https://raw.githubusercontent.com/artisticat1/obsidian-latex-suite/main/gifs/auto-enlarge_brackets.gif)
## Snippets
### Options
- `t` : Text mode，即只在数学模块外触发的snippets；
- `m` : Math mode，即只在数学模块内触发的snippets；
- `A` : Auto，自动触发，不需要按`Tab`即触发snippets；
- `r` : Regex，将对trigger进行正则表达式的分析；
- `c` : Code mode，即只在代码块中触发的snippets。

Insert **tabstops** for the cursor to jump to by writing "$0", "$1", etc. in the `replacement`.
### Environments

| Trigger | Replacement                                           | Options |
| ------- | ----------------------------------------------------- | ------- |
| ;m      | \$\$0$                                                | tA      |
| ;M      | \$\$\$0$$                                             | tA      |
| ;ali    | \\begin{aligned}\n$0\n\\end{aligned}                  | mA      |
| :ali    | \\left\\{\\begin{aligned}\n$0\n\\end{aligned}\\right. | mA      |
### Greek Letters
| Trigger | Replacement  | Options |
| ------- | ------------ | ------- |
| ;aa     | \\alpha      | mA      |
| ;AA     | \\alpha      | mA      |
| ;bb     | \\beta       | mA      |
| ;BB     | \\beta       | mA      |
| ;cc     | \\chi        | mA      |
| ;CC     | \\chi        | mA      |
| ;gg     | \\gamma      | mA      |
| ;GG     | \\Gamma      | mA      |
| ;dd     | \\delta      | mA      |
| ;DD     | \\Delta      | mA      |
| :ee     | \\epsilon    | mA      |
| :EE     | \\epsilon    | mA      |
| ;ee     | \\varepsilon | mA      |
| ;EE     | \\varepsilon | mA      |
| ;qq     | \\theta      | mA      |
| ;QQ     | \\Theta      | mA      |
| ;kk     | \\kappa      | mA      |
| ;KK     | \\kappa      | mA      |
| ;ll     | \\lambda     | mA      |
| ;LL     | \\Lambda     | mA      |
| ;mm     | \\mu         | mA      |
| ;MM     | \\mu         | mA      |
| ;rr     | \\rho        | mA      |
| ;RR     | \\rho        | mA      |
| ;ss     | \\sigma      | mA      |
| ;SS     | \\Sigma      | mA      |
| ;tt     | \\tau        | mA      |
| ;TT     | T            | mA      |
| ;oo     | \\omega      | mA      |
| ;OO     | \\Omega      | mA      |
| ;uu     | \\upsilon    | mA      |
| ;UU     | \\Upsilon    | mA      |
| ;zz     | \\zeta       | mA      |
| ;ZZ     | \\Zeta       | mA      |
### Operations
| Trigger | Replacement      | Options |
| ------- | ---------------- | ------- |
| ;tx     | \\text{$0}       | mA      |
| ;2      | \^2              | mA      |
| ;3      | \^3              | mA      |
| ;up     | ^{$0}$1          | mA      |
| ;do     | _{$0}$1          | mA      |
| ;dn     | _n               | mA      |
| ;di     | _i               | mA      |
| ;dj     | _j               | mA      |
| ;sq     | \\sqrt{$0}$1     | mA      |
| ;/      | \\frac{$0}{$1}$2 | mA      |
| :/      | \\frac{1}{$0}$1  | mA      |
| \\bar   | \\bar{$0}$1      | mA      |
| \\hat   | \\hat{$0}$1      | mA      |
| \\tilde | \\tilde{$0}$1    | mA      |
### Symbols
| Trigger | Replacement                                   | Options | Effect                  |
| ------- | --------------------------------------------- | ------- | ----------------------- |
| ;inf    | \\infty                                       | mA      | $\infty$                |
| ;sum    | \\sum_{${0:i=1}}^{\${1:n}}$2                  | mA      | $$\sum_{\#0}^{\#1}\#2$$ |
| ;prod   | \\prod_{${0:i=1}}^{\${1:n}}$2                 | mA      | $$\prod_{\#0}^{\#1}$$   |
| ;int    | \\int_{$0}^{$1}$2\ d\${2:x}                   | mA      | ∫��� ��∫ab​c dx         |
| ;pa     | \\frac{\\partial}{\\partial ${0:x}}$1         | mA      | ∂∂��∂x∂​y               |
| ;->     | \to                                           | mA      | →                       |
| ;n->    | \nrightarrow                                  | mA      | $$\nrightarrow$$        |
| ;<->    | \\leftrightarrow                              | mA      | ↔                       |
| ;so     | \implies                                      | mA      | ⇒                       |
| ;>=     | \\geq                                         | mA      | ≥                       |
| ;<=     | \\leq                                         | mA      | ≤                       |
| ;inq    | \subseteq                                     | mA      | ⊆                       |
| ;innq   | \subsetneqq                                   | mA      | ⫋                       |
| ;mL     | \\mathcal{L}                                  | mA      | ℒ                       |
| ;mC     | \\mathbb{C}                                   | mA      | ℂ                       |
| ;mR     | \\mathbb{R}                                   | mA      | ℝ                       |
| ;mZ     | \\mathbb{Z}                                   | mA      | ℤ                       |
| ;mN     | \\mathbb{N}                                   | mA      | ℕ                       |
| ;amax   | \\mathop{\\arg\\max}\\limits_{${0:\\theta}}$1 | mA      |                         |
| ;amin   | \\mathop{\\arg\\min}\\limits_{${0:\\theta}}$1 | mA      |                         |
### Brackets

| Trigger | Replacement  | Options |
| ------- | ------------ | ------- |
| (       | ($0)$1       | mA      |
| {       | {$0}$1       | mA      |
| [       | [$0]$1       | mA      |
| ;{      | \\{$0\\}$1   | mA      |
### Sequence
| Trigger          | Replacement                                     | Options |
| ---------------- | ----------------------------------------------- | ------- |
| ;seq([A-Za-z]+); | \[\[0]]\_1,\[\[0]]\_2,\\cdots,\[\[0]]\_{${0:n}} | rmA     |
### Blocks

| Trigger | Replacement     | Options |
| ------- | --------------- | ------- |
| >ex     | > [!example] $0 | tA      |
| >wa     | > [!warning] $0 | tA      |
| >qu     | > [!quote] $0   | tA      |
| >no     | > [!note] $0    | tA      |
## 配置代码 #Code 
```javascript
[
	// Environments
	{trigger: ";m", replacement: "$$0$", options: "tA"},
	{trigger: ";M", replacement: "$$$0$$", options: "tA"},
	{trigger: ";ali", replacement: "\\begin{aligned}\n$0\n\\end{aligned}", options: "mA"},
	{trigger: ":ali", replacement: "\\left\\{\\begin{aligned}\n$0\n\\end{aligned}\\right.", options: "mA"},

	// Greek letters
	{trigger: ";aa", replacement: "\\alpha", options: "mA"},
	{trigger: ";AA", replacement: "\\alpha", options: "mA"},
	{trigger: ";bb", replacement: "\\beta", options: "mA"},
	{trigger: ";BB", replacement: "\\beta", options: "mA"},
	{trigger: ";cc", replacement: "\\chi", options: "mA"},
	{trigger: ";CC", replacement: "\\chi", options: "mA"},
	{trigger: ";gg", replacement: "\\gamma", options: "mA"},
	{trigger: ";GG", replacement: "\\Gamma", options: "mA"},
	{trigger: ";dd", replacement: "\\delta", options: "mA"},
	{trigger: ";DD", replacement: "\\Delta", options: "mA"},
	{trigger: ":ee", replacement: "\\epsilon", options: "mA"},
	{trigger: ":EE", replacement: "\\epsilon", options: "mA"},
	{trigger: ";ee", replacement: "\\varepsilon", options: "mA"},
	{trigger: ";EE", replacement: "\\varepsilon", options: "mA"},
	{trigger: ";zz", replacement: "\\zeta", options: "mA"},
	{trigger: ";ZZ", replacement: "\\zeta", options: "mA"},
	{trigger: ";qq", replacement: "\\theta", options: "mA"},
	{trigger: ";QQ", replacement: "\\Theta", options: "mA"},
	{trigger: ";kk", replacement: "\\kappa", options: "mA"},
	{trigger: ";KK", replacement: "\\kappa", options: "mA"},
	{trigger: ";ll", replacement: "\\lambda", options: "mA"},
	{trigger: ";LL", replacement: "\\Lambda", options: "mA"},
	{trigger: ";mm", replacement: "\\mu", options: "mA"},
	{trigger: ";MM", replacement: "\\mu", options: "mA"},
	{trigger: ";rr", replacement: "\\rho", options: "mA"},
	{trigger: ";RR", replacement: "\\rho", options: "mA"},
	{trigger: ";ss", replacement: "\\sigma", options: "mA"},
	{trigger: ";SS", replacement: "\\Sigma", options: "mA"},
	{trigger: ";oo", replacement: "\\omega", options: "mA"},
	{trigger: ";OO", replacement: "\\Omega", options: "mA"},
	{trigger: ";uu", replacement: "\\upsilon", options: "mA"},
	{trigger: ";UU", replacement: "\\Upsilon", options: "mA"},
	{trigger: ";tt", replacement: "\\tau", options: "mA"},
	{trigger: ";TT", replacement: "T", options: "mA"},

	// Operations
	{trigger: ";tx", replacement: "\\text{$0}", options: "mA"},
	{trigger: ";2", replacement: "^2", options: "mA"},
	{trigger: ";3", replacement: "^3", options: "mA"},
	{trigger: ";up", replacement: "^{$0}$1", options: "mA"},
	{trigger: ";do", replacement: "_{$0}$1", options: "mA"},
	{trigger: ";dn", replacement: "_n", options: "mA"},
	{trigger: ";di", replacement: "_i", options: "mA"},
	{trigger: ";dj", replacement: "_j", options: "mA"},
	{trigger: ";sq", replacement: "\\sqrt{$0}$1", options: "mA"},
	{trigger: ";/", replacement: "\\frac{$0}{$1}$2", options: "mA"},
	{trigger: ":/", replacement: "\\frac{1}{$0}$1", options: "mA"},
	{trigger: "\\bar", replacement: "\\bar{$0}$1", options: "mA"},
	{trigger: "\\hat", replacement: "\\hat{$0}$1", options: "mA"},
	{trigger: "\\tilde", replacement: "\\tilde{$0}$1", options: "mA"},
	
	// Math symbols
	{trigger: ";inf", replacement: "\\infty", options: "mA"},
	{trigger: ";sum", replacement: "\\sum_{${0:i=1}}^{${1:n}}$2", options: "mA"},
	{trigger: ";prod", replacement: "\\prod_{${0:i=1}}^{${1:n}}$2", options: "mA"},
	{trigger: ";int", replacement: "\\int_{$0}^{$1}$2\ d${2:x}", options: "mA"},
	{trigger: ";pa", replacement: "\\frac{\\partial}{\\partial ${0:x}}$1", options: "mA"},
	{trigger: ";->", replacement: "\\to", options: "mA"},
	{trigger: ";n->", replacement: "\\nrightarrow", options: "mA"},
	{trigger: ";<->", replacement: "\\leftrightarrow ", options: "mA"},
	{trigger: ";so", replacement: "\\implies ", options: "mA"},
	{trigger: ";>=", replacement: "\\geq", options: "mA"},
	{trigger: ";<=", replacement: "\\leq", options: "mA"},
	{trigger: ";inq", replacement: "\\subseteq ", options: "mA"},
	{trigger: ";innq", replacement: "\\subsetneqq ", options: "mA"},
	{trigger: ";mL", replacement: "\\mathcal{L}", options: "mA"},
	{trigger: ";mC", replacement: "\\mathbb{C}", options: "mA"},
	{trigger: ";mR", replacement: "\\mathbb{R}", options: "mA"},
	{trigger: ";mZ", replacement: "\\mathbb{Z}", options: "mA"},
	{trigger: ";mN", replacement: "\\mathbb{N}", options: "mA"},
	{trigger: ";amax", replacement: "\\mathop{\\arg\\max}\\limits_{${0:\\theta}}$1", options: "mA"},
	{trigger: ";amin", replacement: "\\mathop{\\arg\\min}\\limits_{${0:\\theta}}$1", options: "mA"},

	// Brackets
	{trigger: "(", replacement: "($0)$1", options: "mA"},
	{trigger: "{", replacement: "{$0}$1", options: "mA"},
	{trigger: "[", replacement: "[$0]$1", options: "mA"},
	{trigger: ";{", replacement: "\\{$0\\}$1", options: "mA"},

	// Sequence
    {trigger: ";seq([A-Za-z]+);", replacement: "[[0]]_1,[[0]]_2,\\cdots,[[0]]_{${0:n}} ", options: "rmA"},

    // Callout
    {trigger: ">ex", replacement: "> [!example] $0", options: "tA"},
    {trigger: ">wa", replacement: "> [!warning] $0", options: "tA"},
    {trigger: ">qu", replacement: "> [!quote] $0", options: "tA"},
    {trigger: ">no", replacement: "> [!note] $0", options: "tA"},
]
```

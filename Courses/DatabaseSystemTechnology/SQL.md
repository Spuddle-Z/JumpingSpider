---
tags:
  - Tutorial
  - Code
aliases:
  - 结构化查询语言
  - Structured Query Language
---
## 数据定义
### 模式的定义与删除
1. 定义数据库模式：
	```sql
	CREATE SCHEMA <模式名> AUTHORIZATION <用户名>
	```
	在此命令中亦可接受定义该模式包含的数据库对象的子句，如
	```sql
	CREATE SCHEMA <模式名> AUTHORIZATION <用户名>[<表定义子句>|<视图定义子句>|<授权定义子句>]
	```
1. 删除数据库模式：
	```sql
	DROP SCHEMA <模式名> <CASCADE|RESTRICT>
	```
	其中
	- `CASCADE`是级联模式，会将该模式中包含的数据库对象也一并删除；
	- `RESTRICT`是限制模式，只有在该模式中没有任何下属的对象时才能执行。
### 基本表的定义、删除与修改
1. 定义基本表：
	```sql
	CREATE TABLE <表名>
	(<列名> <数据类型> [<列级完整性约束条件>],
	 <列名> <数据类型> [<列级完整性约束条件>],
	 ...
	 [, <表级完整性约束条件>]);
	```
	其中常用的完整性约束条件有：
	- `PRIMARY KEY`：主码约束，表示本列属于主码，相当于`UNIQUE`+`NOT NULL`；
	- `FOREIGN KEY`：表示本列为外码；
	- `UNIQUE`：唯一性约束，表示本列不能出现重复的值；
	- `NOT NULL`：本列不能有空值。
		> [!example] 
		> 建立一个学生选课表SC：
		> ```sql
		> CREATE TABLE SC
		> (Sno CHAR(9),
		>  Cno CHAR(4),
		>  Grade SMALLINT CHECK (Grade>=0 and Grade<=100),
		>  PRIMARY KEY  (Sno, Cno),
		>  /* 主码由两个属性构成，必须作为表级完整性进行定义 */
		>  FOREIGN KEY (Sno) REFERENCES Student(Sno),
		>  /* Sno是外码，被参照表是Student */
		>  FOREIGN KEY (Cno) REFERENCES Course(Cno)
		>  /* Cno是外码，被参照表是Course */
		> );
		> ```
1. 修改基本表：
	```sql
	ALTER TABLE <表名> <子句>
	```
	其中的子句可以有以下选择：
	- `ADD [COLUMN] <新列名> <数据类型> [完整性约束]`：增加新列；
	- `DROP CONSTRAINT <完整性约束> [CASCADE|RESTRICT]`：删除指定的完整性约束条件。
3. 删除基本表：
	```sql
	DROP TABLE <表名> [RESTRICT|CASCADE]
	```
### 索引的建立与删除
- 意义：建立索引是加快查询速度的有效手段。
- 建立索引：
	```sql
	CREATE [UNIQUE] [CLUSTER] INDEX <索引名> ON <表名>(<列名>[<次序>], <列名>[<次序>], ...)
	```
	其中
	- `UNIQUE`表示此索引的每个索引值只对就唯一的数据记录；
	- `CLUSTER`指建立**聚簇索引**，此时基本表中的数据顺序也会按索引项顺序存储，一个基本表上只能建立一个聚簇索引，因此一般会在最经常查询的列上建立聚簇索引，以提高查询效率；
	- `<次序>`指索引值的排列顺序，可以为*升序(ASC)*或*降序(DESC)*。
- 修改索引：`ALTER INDEX <旧索引名> RENAME TO <新索引名>`
- 删除索引：`DROP INDEX <索引名>`
## 数据查询
### 基本语句格式
```sql
SELECT [ALL|DISTINCT] <目标列表达式>, <目标列表达式>, ...
FROM <表名或视图名>, <表名或视图名>, ... | (<SELECT语句>) [AS] <别名>
[WHERE <条件表达式>]
[GROUP BY <列名> [HAVING <条件表达式>]]
[ORDER BY <列名> [ASC|DESC]]
```
### 选择指定列
最基础的语法是`SELECT <列名>`，若欲选择全部列则可以使用`SELECT *`，消除取值重复的行可以使用`SELECT DISTINCT <列名>`。此外还可以查询经过计算的值，并重命名查询结果的列标题。
> [!example] 
> 查询全体学生的姓名、出生年份和所在系，并用小写字母表示所有系名。
> ```sql
SELECT Sname NAME, 'Year of Birth: ' BIRTH, 2014-Sage BIRTHDAY, ISLOWER(Sdept) DEPARTMENT
FROM Student;
> ```
> 其输出结果则为
> ![[Pasted image 20240323143804.png|450]] #Missing 
### 选择指定元组
- 使用`WHERE`子句来限定具体的查询条件。此子句后常用的查询条件如下表：  

| 查询条件       | 比较操作符                           |
| ---------- | ------------------------------- |
| 比较         | =, >, <, >=, <=, !=, <>, !<, !> |
| 范围定界       | BETWEEN AND, NOT BETWEEN AND    |
| 确定集合       | IN, NOT IN                      |
| 字符匹配       | LIKE, NOT LIKE                  |
| 空值         | IS NULL, IS NOT NULL            |
| 复合条件（逻辑运算） | AND, OR, NOT                    |
> [!caution] 
> - `SELECT`：选择表中指定的列，对应*投影操作*；
> - `WHERE`：查询满足条件的元组，对应*选择操作*。

> [!caution] 
> SQL中没有自然连接的概念了，因此都需要用`WHERE`子句来写出条件。
### 排序查询结果
使用`ORDER BY`子句对查询结果进行排序，`ASC`为升序，`DESC`为降序。
> [!example] 
> ![[Pasted image 20240323153225.png]] #Missing 

使用`LIMIT`子句来限制查询的行数，通常与`ORDER BY`子句一起使用。
> [!example] 
> ![[Pasted image 20240616163620.png]] #Missing 
### 聚集函数
> [!definition] 聚集函数
> 以值的集合为输入，以单个值为输出的函数。SQL提供了五类聚集函数，`COUNT`计数、`SUM`求和、`AVG`求平均数、`MAX` `MIN`求最大最小值。

> [!caution] 
> 除了`COUNT (*)`外，聚集函数都只处理非空值。

> [!example] 
> ![[Pasted image 20240323154511.png]] #Missing 

> [!caution] 
> `WHERE`子句中不能用聚集函数作为条件表达式，聚集函数只能用于`SELECT`子句和`HAVING`子句中。
### 分组查询结果
使用`GROUP BY`子句进行分组，某一列或多列的值分组，值相等的为一组，其目的是*细化聚集函数的作用对象*，若分组和聚集函数同时存在，将先对查询结果进行分组，而后聚集函数将分别作用于每一个组。
> [!example] 
> ![[Pasted image 20240323155446.png]]

使用`HAVING`子句从分好的组中选择出满足条件的组。
> [!example] 
> ![[Pasted image 20240323160007.png]]
### 连接查询
#Missing 
### 嵌套查询
#### 基本概念
一个`SELECT-FROM-WHERE`语句称为一个查询块，将一个查询块嵌套在另一个查询块的`WHERE`子句或`HAVING`短语的条件中的查询称为**嵌套查询**。
#### ANY与ALL
- `ANY`：某个值
- `ALL`：所有值

> [!example] 
> ![[Pasted image 20240616185838.png]] #Missing 
#### EXISTS
带有`EXISTS`谓词的子查询不返回任何数据，只返回`true`或`false`。
> [!example] 
> ![[Pasted image 20240324104939.png]]
1. 一些事EXISTS或NOT EXISTS的子查询不能被其他形式的子查询等价替换，但所有带`IN`、比较运算符、`ANY`或`ALL`的子查询都能用带`EXISTS`的子查询等价替换。
2. SQL中没有全称量词$\forall$，可以用存在量词替代，$(\forall x)P\equiv\lnot(\exists x(\lnot P))$。
3. 逻辑蕴含也可以使用存在谓词表达，$p\to q\equiv\lnot p\vee q$。
### 集合查询
- **并操作**：`UNION`
	> [!example] 
	> 查询计算机科学系的学生或年龄不大于19岁的学生。
	> ```sql
	> SELECT *
	> FROM Student
	> WHERE Sdept = 'CS'
	> UNION
	> SELECT *
	> FROM Student
	> WHERE Sage <= 19;
	> ```
- **交操作**：`INTERSECT`
	> [!example] 
	> 查询同时选修了课程1和课程2的学生
	> ```sql
	> SELECT Sno
	> FROM SC
	> WHERE Cno='1'
	> INTERSECT
	> SELECT Sno
	> FROM SC
	> WHERE Cno='2';
	> ```

- **差操作**：`EXCEPT`
	> [!example] 
	> 查询计算机科学系中年龄不大于19岁的学生
	> ```sql
	> SELECT *
	> FROM Student
	> WHERE Sdept='CS'
	> EXCEPT
	> SELECT *
	> FROM Student
	> WHERE Sage <=19;
	> ```

### 派生查询
除了出现在`WHERE`子句中，子查询还可以出现在`FROM`子句中，此时子查询生成的**临时派生表(Derived Table)**会成为主查询的查询对象。
> [!example] 
> 查询所有选修了1号课程的学生姓名。
> ```sql
> SELECT Sname
> FROM Student, (SELECT Sno
> 			   FROM SC
> 			   WHERE Cno = '1') AS SC1
> WHERE Student.Sno = SC1.Sno
> ```
## 数据更新
### 插入数据
> [!example] 
> 将一个新学生记录插入到Student表中
> ```sql
> INSERT
> INTO Student (Sno, Sname, Ssex)
> VALUE ('201215128', '陈冬', '男');
> ```
> 也可以将子查询的结果插入指定表里
### 修改数据
> [!example] 
> 将计算机科学系学生的成绩置零
> ```sql
> UPDATE SC
> SET Grade=0
> WHERE Sno IN
> 	(SELECT Sno
> 	 FROM Student
> 	 WHERE Sdept='CS');
> ```
### 删除数据
使用`DELETE`子句来删除指定的*元组*。
> [!example] 
> 删除计算机科学系所有学生的选课记录。
> ```sql
> DELETE
> FROM SC
> WHERE Sno IN
> 	(SELECT Sno
> 	 FROM Student
> 	 WHERE Sdept = 'CS');
> ```
## 空值
- 空值的产生：*插入*、*外连接*、*空值的关系运算*都会产生空值。
- 空值的判断：判断某个值是否为空值要使用`IS NULL`或`IS NOT NULL`，不能使用`=NULL`。
- 空值的约束条件：
	- 有`NOT NULL`或`UNIQUE`约束的属性不能取空值
	- 码属性不能取空值
- 空值的运算：空值参与的*算术运算*结果为空值，空值参与的*比较运算*结果为`UNKNOWN`（`UNKNOWN`可以和`TRUE`与`FALSE`进行三值的逻辑运算）。
## 视图
### 建立视图
```sql
CREATE VIEW <视图名> [(<列名>, <列名>,...)]
AS <子查询>
[WITH CHECK OPTION];
```

> [!caution] 
> 不要丢掉`AS`。

由于视图的本质是一段查询规则，并不包含数据，因此当原数据发生改变时，视图也会随之调整。视图就像是编程语言中的函数一样，可以将经常要使用的数据打包起来，然后调用这个视图再去进行其它的操作。
> [!example] 
> 建立信息系选修了1号课程的学生视图。
> ```sql
> CREATE VIEW IS_S1(Sno, Sname, Grade) AS
> 	SELECT Student.Sno, Sname, Grade
> 	FROM Student, SC
> 	WHERE Sdept = 'IS' AND
> 		  Student.Sno = SC.Sno AND
> 		  SC.Cno = '1';
> ```
### 删除视图
```sql
DROP VIEW <视图名>[CASCADE];
```
### 查询视图
从用户的角度，查询视图与查询基本表并无区别。但从DBMS的角度来说，查询视图可能会有以下两种不同的方法：
- **实体化视图(View Materialization)**：
	1. 检查所查询的视图是否存在；
	2. 将视图实体化为临时表；
	3. 在临时表中查询；
	4. 查询完毕后删除临时表。
- **视图消解法(View Resolution)**：
	1. 检查视图是否存在；
	2. 把视图的定义与用户对视图的查询指令结合，形成一个新的视图查询；
	3. 执行结合后的查询。
### 更新视图
从用户的角度来看，更新视图与更新基本表没有区别。但系统会将对视图的更新转化为对基本表的更新。
## 数据库编程
### 概述
SQL语言的表达能力是有限的，其无法表达递归等复杂操作。此时我们可以通过引入新的SQL子句、新的内置函数等方式扩展SQL语言的功能。
`WITH RECURSIVE`子句可以完成递归操作，其一般格式如下：
```sql
WITH RECURSIVE RS AS
	(
		SEED QUERY       /* 初始化查询的临时结果集，记为L[1] */
		UNION [ALL]      /* 是否需要保留重复记录，加ALL为保留 */
		RECURSIVE QUERY  /* 得到递归查询结果的并集 */
	)
	/* 执行与RS相关的查询 */
```

> [!example] 
> 查询“数据库系统概论”课的所有先修课信息。
> ```sql
> WITH RECURSIVE RS AS (
> 	SELECT Cpno FROM Course WHERE Cname = '数据库系统概论'
> 	UNION
> 	SELECT Course.Cpno FROM Course, RS WHERE RS.Cpno = Course.Cno
> )
> SELECT Cno, Cname FROM COURSE WHERE Cno IN (SELECT Cpno FROM RS);
> ```
### 过程化SQL
#### 基本概念
> [!definition] 过程化SQL块
> 是过程化SQL的基本结构。每个志完成一个逻辑操作，块之间可以互相嵌套。

 过程化SQL块的基本结构包括*定义部分*与*执行部分*。定义部分用来定义块中所需的变量、常量等，这些定义只在该块中使用；执行部分则用来执行一些SQL语句。
#### 游标
> [!definition] 游标
> 游标类似于一个数组，其本质是一条SELECT语句。

游标有如下几个操作：
1. 声明游标：定义游标要执行的语句，但并不会执行；
2. 打开游标：执行游标对应的SELECT语句，将结果存入缓冲区；
3. 使用游标：返回当前指向的量，同时将游标指针向前推进一条记录；
4. 关闭游标：释放缓冲区。

> [!definition] 存储过程
> 类似于高级语言的程序，即将过程化SQL编译并保存在数据库中，供其它过程化SQL调用。

存储过程的优点：
- **运行效率高**：创建存储过程时就已经进行了编译与优化；
- **降低了客户与服务机的通信量**：客户机只需要发送存储过程的名称与参数。
### JDBC
#### 基本概念
许多应用需要访问不同的数据库管理系统，需要一个统一的工具来进行管理。
> [!definition] Java Database Connection (JDBC)
> 是面向Java语言的软件开发工具包中有关数据库的一个组成部分，其提供了一组访问数据库的应用程序的编程接口。
#### 工作流程
1. 加载数据库驱动程序 #Missing 
	> [!example] 加载Oracle的数据库驱动
	> ```java
	> Class.forName("oracle.jdbc.OracleDriver");
	> ```
1. 建立与数据库的连接
	> [!example] 
	> ![[Pasted image 20240513143047.png]]
	> ![[Pasted image 20240513143107.png]]
1. 执行SQL语句
2. 处理结果集，并基于该结果集处理用户逻辑
3. 释放资源
	> [!example] 
	> ![[Pasted image 20240513143442.png]]

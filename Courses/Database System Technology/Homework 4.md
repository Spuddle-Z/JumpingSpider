1. ```sql
	SELECT Sno
	FROM (SELECT Sno, MAX(Arg_grade)
	      FROM (SELECT Sno, AVG(Grade) Arg_grade
		       FROM SC
		       GROUP BY Sno
		       ) AS t1
	      ) AS t2;
	```
1. ```sql
	DELETE
	FROM Student
	WHERE NOT EXISTS
		(SELECT *
		 FROM SC
		 WHERE Sno = Student.Sno);
	```
1. ```sql
	SELECT Sno
	FROM SC
	GROUP BY Sno
	HAVING COUNT(*) >= 2;
	```
1. ```sql
	SELECT DISTINCT Sno
	FROM Student x
	WHERE NOT EXISTS
		(SELECT *
		 FROM Course y
		 WHERE Teacher = '刘老师' AND NOT EXISTS
			 (SELECT *
			  FROM SC z
			  WHERE z.Cno = y.Cno AND z.Sno = x.Sno));
	```
1. ```sql
	CREATE VIEW V
		AS
		SELECT Sno
		FROM Student x
		WHERE NOT EXISTS
			(SELECT *
			 FROM SC y
			 WHERE y.Sno = x.Sno AND y.Grade < 60);
	
	SELECT Sno, AVG(Grade) Avg
	FROM SC, V
	GROUP BY Sno
	ORDER BY Avg DESC;
	```
1. ```sql
	CREATE VIEW V
		AS
		SELECT Sno, AVG(Grade) Avg
		FROM SC
		GROUP BY Sno
		WHERE Avg > 85;
	```
1. ```sql
	SELECT Sage, COUNT(*) Num
	FROM Student
	GROUP BY Sage
	WHERE Ssex = '男'
	ORDER BY Num ASC, Ssex DESC
	```
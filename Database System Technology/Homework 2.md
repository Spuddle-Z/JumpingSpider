1. $$\sigma_{Sage<22\ \wedge\ Ssex=Girl}(Student)$$
2. $$\pi_{Sno}(\sigma_{Grade\geq90}(SC))\Join\pi_{Sno,Sname}(Student)$$
3. $$\pi_{Sname,Grade}((SC\div\sigma_{Cname=\text{数据库}}(Course))\Join Student)$$数据库课程可能有多个，对应多个课程号，不建议用除法来做
1. $$\pi_{Sname,Sage}(Student)-(\pi_{Sname,Sage}(Student\Join\sigma_{Cno=005}(SC)))$$姓名可能有重复，必须找唯一标识码
2. $$\pi_{Sno,Sname}((SC\div Course)\Join Student)$$